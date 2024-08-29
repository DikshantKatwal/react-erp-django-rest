/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/notification/Notification";
import { UploaderService } from "../../../../services/uploader/Uploader";
import { employeeService } from "../../../../services/employee/Employee";

interface UserNotificationFormProps {
    closeModal: () => void;
    refetchData: () => void;
    notification?: any;
}

const UserNotificationForm: React.FC<UserNotificationFormProps> = ({ notification, closeModal, refetchData }) => {
    const [store_notification] = useStoreMutation()
    const [update_notification] = useUpdateMutation();
    let notificationId = notification ? notification.id : null;
    const [title, setTitle] = useState('');
    const[ uploader] = UploaderService.useNotification_storeMutation();
    const [employee, setEmployee] = useState<any[]>([]);
    const [fetchEmployeeAPI] = employeeService.useFetchEmployeeMutation();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('false');
    const [to_user, setToUser] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [date, setDate] = useState('');
    useEffect(() => {
        if (notification) {
            setTitle(notification.title || '');
            if (notification.image && typeof notification.image === 'object' && notification.image instanceof File) {
                setImage(null);
                setImagePreviewUrl(URL.createObjectURL(notification.image));
            } else if (typeof notification.image === 'string') {
                setImagePreviewUrl(notification.image);
            } else {
                setImagePreviewUrl(null);
            }
            setDescription(notification.description || '');
            setStatus(notification.status || 'false');
            setToUser(notification.to_user || '');
            setSelectedEmployeeId(notification.employee|| '');
            setDate(notification.date || '');
        } else {
            setTitle('');
            setImage(null);
            setImagePreviewUrl(null);
            setDescription('');
            setStatus('');
            setToUser(null);
            setSelectedEmployeeId(null);
            setDate('');
        }
    }, [notification]);

    const fetchData = () => {
        fetchEmployeeAPI({})
          .then((response: any) => {
            const employees = response.data.results; 
            const nonInternEmployees = employees.filter((employee: any) => !employee.isintern);
            setEmployee(nonInternEmployees);
          })
          .catch((error: any) => {
            console.error("Failed to fetch employees", error);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (notification) {
            update_notification({ id: notification.id, title,description,status,date, to_user:selectedEmployeeId}).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            try {
                const response = await store_notification({
                    title,
                    description,
                    status,
                    date,
                    to_user:selectedEmployeeId,
                }).unwrap();
                notificationId = response.id; // Assuming the response contains the new notification's ID
                closeModal();
                refetchData();
            } catch (error) {
                // Handle store failure if necessary
                console.error('UserNotification creation failed:', error);
                return;
            }
        }
        if (image && notificationId) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('id', notificationId);
                const response = await uploader(formData).unwrap();
                const imageUrl = response.image;
                setImagePreviewUrl(imageUrl);
            } catch (error) {
                console.error('Image upload failed:', error);
                return;
            }
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreviewUrl(null);
    };

    const handleEmployeeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        setSelectedEmployeeId(event.target.value);
      };
   

    return (
        <form id="UserNotificationForm" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}  id="title" type="text"  />
                            </div>
                            <div className="form-group half-width">
                                <div className="common-file-container" style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                                    <div className="file-item">
                                        <div className="file-inner">
                                            <div className="image-container" style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
                                                <div  className="image-inner" id="image-holder" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    {imagePreviewUrl ? (
                                                        <img src={imagePreviewUrl} alt="Image preview" id="imagePreview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <img src="/assets/img/placeholder/placeholder-rectangle.jpg" alt="Default" id="default-image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                                                    )}
                                                </div>
                                                {imagePreviewUrl && (
                                                    <a className="remove-image" onClick={removeImage} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <img src="../public/assets/img/icons/cross.png" alt="Remove" style={{ width: '20px', height: '20px' }} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} value = {description} />
                            </div>
                            <div className="form-group half-width">
                                <label>Date</label>
                                <input type="date" name="from_date_en" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                          
                            <div className="form-group half-width">
                            <label>Employee: </label>
                            <select value={selectedEmployeeId} onChange={handleEmployeeChange}>
                                <option value="">Select Employee</option>
                                {employee.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                    </option>
                                ))}
                            </select>
                            </div>

                            <div className="form-group half-width">
                                <label>status </label>
                                <select name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="">Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">In-Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-action">
                    <input type="submit" className="co-btn type-full" value="Submit" />
                </div>
            </div>
        </form>
    )
}

export default UserNotificationForm


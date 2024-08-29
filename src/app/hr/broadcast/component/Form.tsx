/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/broadcast/Broadcast";
import { UploaderService } from "../../../../services/uploader/Uploader";

interface BroadcastFormProps {
    closeModal: () => void;
    refetchData: () => void;
    broadcast?: any;
}

const BroadcastForm: React.FC<BroadcastFormProps> = ({ broadcast, closeModal, refetchData }) => {
    const [store_broadcast] = useStoreMutation()
    const [update_broadcast] = useUpdateMutation();
    let broadcastId = broadcast ? broadcast.id : null;
    const [title, setTitle] = useState('');
    const[ uploader] = UploaderService.useStoreMutation();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('false');
    const [from_date, setFromDate] = useState('');
    const [to_date, setToDate] = useState('');
    const [type, setType] = useState('');
    useEffect(() => {
        if (broadcast) {
            setTitle(broadcast.title || '');
            if (broadcast.image && typeof broadcast.image === 'object' && broadcast.image instanceof File) {
                setImage(null);
                setImagePreviewUrl(URL.createObjectURL(broadcast.image));
            } else if (typeof broadcast.image === 'string') {
                setImagePreviewUrl(broadcast.image);
            } else {
                setImagePreviewUrl(null);
            }
            setDescription(broadcast.description || '');
            setStatus(broadcast.status || 'false');
            setFromDate(broadcast.from_date || '');
            setToDate(broadcast.to_date || '');
            setType(broadcast.type || '');
        } else {
            setTitle('');
            setImage(null);
            setImagePreviewUrl(null);
            setDescription('');
            setStatus('');
            setFromDate('');
            setToDate('');
            setType('');
        }
    }, [broadcast]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       

        if (broadcast) {
            const updateData = {
                id: broadcast.id,
                title,
                description,
                status,
                from_date,
                to_date,
                type
            };
            if (!imagePreviewUrl) {
                updateData.image = imagePreviewUrl;
            }
            update_broadcast(updateData).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
            });
        }else{
            try {
                const response = await store_broadcast({
                    title,
                    description,
                    status,
                    from_date,
                    to_date,
                    type
                }).unwrap();
                broadcastId = response.id; 
                closeModal();
                refetchData();
            } catch (error) {
                console.error('Broadcast creation failed:', error);
                return;
            }
        }
        if (image && broadcastId) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('id', broadcastId);
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
    return (
        <form id="BroadcastForm" onSubmit={handleSubmit} encType="multipart/form-data">
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
                                <label>From Date(AD)</label>
                                <input type="date" name="from_date_en" value={from_date} onChange={(e) => setFromDate(e.target.value)} />
                            </div>
                            <div className="form-group half-width">
                                <label>To Date(AD)</label>
                                <input type="date" name="to_date_en" value={to_date} onChange={(e) => setToDate(e.target.value)} />
                            </div>
                            <div className="form-group half-width">
                                <label>status </label>
                                <select name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="">Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">In-Active</option>
                                </select>
                            </div>
                            <div className="form-group half-width">
                                <label>Type</label>
                                <select name="status" value={type} onChange={(e) => setType(e.target.value)} >
                                    <option value="">Select Type</option>
                                    <option value="Broadcast">Broadcast</option>
                                    <option value="Notification">Notification</option>
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

export default BroadcastForm


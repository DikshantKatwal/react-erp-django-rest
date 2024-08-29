import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { useStoreMutation, useUpdateMutation } from "../../../../services/attendanceConfig/AttendanceConfig";

interface AttendanceConfigFormProps {
    closeModal: () => void;
    refetchData: () => void;
    attendance_config?: any;
}

const AttendanceConfigForm: React.FC<AttendanceConfigFormProps> = ({ attendance_config, closeModal, refetchData }) => {
    const [store_attendance_config] = useStoreMutation()
    const [update_attendance_config] = useUpdateMutation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hash_code, setHashcode] = useState('');

    useEffect(() => {
        if (attendance_config) {
            setUsername(attendance_config.username || '');
            setPassword(attendance_config.password || '');
            setHashcode(attendance_config.hash_code || '');
        } else {
            setUsername('');
            setPassword('');
            setHashcode('');
        }
    }, [attendance_config]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (attendance_config) {
            update_attendance_config({ id: attendance_config.id, username, password, hash_code }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            store_attendance_config({ username, password, hash_code }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    return (
        <form id="Service_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>User name</label>
                                <input name="username" value={username} onChange={(e) => setUsername(e.target.value)}  id="username" type="text"  />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="password" type="text"  />
                            </div>
                            <div className="form-group">
                                <label>Hash Code</label>
                                <input name="hashcode" value={hash_code} onChange={(e) => setHashcode(e.target.value)}  id="hashcode" type="text"  />
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

export default AttendanceConfigForm


import React, { useCallback, useEffect, useState } from "react";
import AttendanceConfigForm from "./component/Form";
import Modal from "../../general/Modal";
import { Attendance_configService, useStoreMutation } from "../../../services/attendanceConfig/AttendanceConfig";

const AttendanceConfig: React.FC = () => {
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const [attendanceConfig, setAttendanceConfig] = useState<any>(null);
    const [store_attendance_config] = useStoreMutation()

    const refetchData = useCallback(() => {
        setShouldRefetch(true);
        setTimeout(() => setShouldRefetch(false), 100); // Reset refetch flag
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        // This will log the key-value pairs of the form data
        store_attendance_config(formData).unwrap().then(() => {
            refetchData();
        }).catch(() => {
            // Handle login failure if necessary
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        hashcode: ''
    });

    

    const [fetchAttendanceConfigAPI] = Attendance_configService.useFetch_attendance_configMutation();

    const fetchData = () => {
        fetchAttendanceConfigAPI({ })
            .unwrap()
            .then((response: any) => {
                setAttendanceConfig(response)
            })
            .catch((error: any) => {
                console.error("Failed to fetch attendanceConfig", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, [ shouldRefetch]);

    useEffect(() => {
        if (attendanceConfig && Object.keys(attendanceConfig).length > 0) {
            setFormData(attendanceConfig);
        }
    },[attendanceConfig])


    return (
        <>
        <div id="common-list-page">
            <section className="content-section">
                <div className="custom-container">
                    <div className="section-content">
                        <div className="common-content-box">
                            <div className="common-table">
                                <form id="Service_Form" onSubmit={handleSubmit}>
                                    <div className="common-form">
                                        <div className="fields">
                                            <div className="form-group-wrapper">
                                                <div className="form-group-item">
                                                    <div className="form-group half-width">
                                                        <label>User name</label>
                                                        <input
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            id="username"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="form-group half-width">
                                                        <label>Password</label>
                                                        <input
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            id="password"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="form-group half-width">
                                                        <label>Hash Code</label>
                                                        <input
                                                            name="hashcode"
                                                            value={formData.hashcode}
                                                            onChange={handleChange}
                                                            id="hashcode"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-action">
                                            <input type="submit" className="co-btn type-full" value="Submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default AttendanceConfig;
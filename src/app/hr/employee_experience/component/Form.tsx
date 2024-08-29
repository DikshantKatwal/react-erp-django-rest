/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeExperience/EmployeeExperience.ts";
import { useLocation } from "react-router-dom";
interface EmployeeExperienceFormProps {
    closeModal: () => void;
    refetchData: () => void;
    experience?: any;
}

const EmployeeExperienceForm: React.FC<EmployeeExperienceFormProps> = ({ experience, closeModal, refetchData }) => {
    const [store_experience] = useStoreMutation()
    const [update_experience] = useUpdateMutation();
    const location = useLocation();
    const employee = location.state?.employee;
    const [organization, setOrganization] = useState('');
    const [designation, setDesignation] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState('');
    const [majorRole, setMajorRole] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (experience) {
            setOrganization(experience.organization || '');
            setDesignation(experience.designation || '');
            setAddress(experience.address || '');
            setSalary(experience.salary || '');
            setMajorRole(experience.major_role || '');
            setStartDate(experience.start_date || '');
            setEndDate(experience.end_date || '');
        } else {
            setOrganization('');
            setDesignation('');
            setAddress('');
            setSalary('');
            setMajorRole('');
            setStartDate('');
            setEndDate('');
        }
    }, [experience]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            organization,
            designation,
            address,
            salary,
            major_role: majorRole,
            start_date: startDate,
            end_date: endDate,
        };
        if (experience) {
            data.id = experience.id

            update_experience(data).unwrap().then(() => {
                console.log('stored')
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            data.employee = employee.id
            store_experience(data).unwrap().then(() => {
                console.log('stored')
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    return (
        <form id="Experience_Form" onSubmit={handleSubmit}>
        <div className="common-form">
            <div className="fields">
                <div className="form-group-wrapper">
                    <div className="form-group-item">
                        <div className="form-group half-width">
                            <label>Organization:</label>
                            <input
                                name="organization"
                                id="organization"
                                type="text"
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>Designation:</label>
                            <input
                                name="designation"
                                id="designation"
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>Address:</label>
                            <input
                                name="address"
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>Salary:</label>
                            <input
                                name="salary"
                                id="salary"
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>Major Role:</label>
                            <textarea
                                name="major_role"
                                id="major_role"
                                value={majorRole}
                                onChange={(e) => setMajorRole(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>Start Date:</label>
                            <input
                                name="start_date"
                                id="start_date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label>End Date:</label>
                            <input
                                name="end_date"
                                id="end_date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
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
);
};

export default EmployeeExperienceForm


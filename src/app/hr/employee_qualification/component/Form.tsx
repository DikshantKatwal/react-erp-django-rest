/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeQualification/EmployeeQualification.ts";
import { useLocation } from "react-router-dom";
interface EmployeeQualificationFormProps {
    closeModal: () => void;
    refetchData: () => void;
    qualification?: any;
}

const EmployeeQualificationForm: React.FC<EmployeeQualificationFormProps> = ({ qualification, closeModal, refetchData }) => {
    const [store_qualification] = useStoreMutation()
    const [update_qualification] = useUpdateMutation();
    const location = useLocation();
    const employee = location.state?.employee;
    const [course, setCourse] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [institution, setInstitution] = useState('');
    const [startDate, setStartDate] = useState('');
    const [passDate, setPassDate] = useState('');

    useEffect(() => {
        if (qualification) {
            setCourse(qualification.course || '');
            setSpecialization(qualification.specialization || '');
            setInstitution(qualification.institution || '');
            setStartDate(qualification.start_date || '');
            setPassDate(qualification.pass_date || '');
        } else {
            setCourse('');
            setSpecialization('');
            setInstitution('');
            setStartDate('');
            setPassDate('');
        }
    }, [qualification]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            course,
            specialization,
            institution,
            start_date: startDate,
            pass_date: passDate,
        };
        if (qualification) {
            data.id = qualification.id

            update_qualification(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            data.employee = employee.id
            store_qualification(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    return (
        <form id="Renewal_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                        <div className="form-group">
                <label>Course:</label>
                <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Specialization:</label>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Institution:</label>
                <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Pass Date:</label>
                <input type="date" value={passDate} onChange={(e) => setPassDate(e.target.value)} />
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

export default EmployeeQualificationForm


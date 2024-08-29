/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeEducation/EmployeeEducation.ts";
import { useLocation } from "react-router-dom";
interface EmployeeEducationFormProps {
    closeModal: () => void;
    refetchData: () => void;
    education?: any;
}

const EmployeeEducationForm: React.FC<EmployeeEducationFormProps> = ({ education, closeModal, refetchData }) => {
    const [store_education] = useStoreMutation()
    const [update_education] = useUpdateMutation();
    const location = useLocation();
    const employee = location.state?.employee;
    const [degree, setDegree] = useState('');
    const [program, setProgram] = useState('');
    const [board, setBoard] = useState('');
    const [institution, setInstitution] = useState('');
    const [start_date, setStartDate] = useState('');
    const [passing_year, setPassingYear] = useState('');
    const [marks_type, setMarksType] = useState('');
    const [marks, setMarks] = useState('');
    const [status, setStatus] = useState('false');
    const marksOptions = [
        { value: 'percentage', label: 'Percentage' },
        { value: 'division', label: 'Division' },
        { value: 'cgpa', label: 'CGPA' }
    ];

    useEffect(() => {
        if (education) {
            setDegree(education.degree || '');
            setProgram(education.program || '');
            setBoard(education.board || '');
            setInstitution(education.institution || '');
            setStartDate(education.start_date || '');
            setPassingYear(education.passing_year || '');
            setMarksType(education.marks_type || '');
            setMarks(education.marks || '');
            setStatus(education.status || 'false');
        } else {
            setDegree('');
            setProgram('');
            setBoard('');
            setInstitution('');
            setStartDate('');
            setPassingYear('');
            setMarksType('');
            setMarks('');
            setStatus('');
        }
    }, [education]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            degree,
            program,
            board,
            institution,
            start_date,
            passing_year,
            marks_type,
            marks,
            status
        };
        if (education) {
            data.id = education.id

            update_education(data).unwrap().then(() => {
                console.log('stored')
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            data.employee = employee.id
            store_education(data).unwrap().then(() => {
                console.log('stored')
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
                            <div className="form-group half-width">
                                <label>Degree:</label>
                                <input
                                    name="degree"
                                    id="degree"
                                    type="text"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label>Program:</label>
                                <input
                                    name="program"
                                    id="program"
                                    type="text"
                                    value={program}
                                    onChange={(e) => setProgram(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label>Board:</label>
                                <input
                                    name="board"
                                    id="board"
                                    type="text"
                                    value={board}
                                    onChange={(e) => setBoard(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label>Institution:</label>
                                <input
                                    name="institution"
                                    id="institution"
                                    type="text"
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label>Start Date:</label>
                                <input
                                    name="start_date"
                                    id="start_date"
                                    type="date"
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label>Passing Year:</label>
                                <input
                                    name="passing_year"
                                    id="passing_year"
                                    type="date"
                                    value={passing_year}
                                    onChange={(e) => setPassingYear(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                                <label htmlFor="marks_type">Marks Type:</label>
                                <select
                                    name="marks_type"
                                    id="marks_type"
                                    value={marks_type}
                                    onChange={(e) => setMarksType(e.target.value)}
                                >
                                    {marksOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group half-width">
                                <label>Marks:</label>
                                <input
                                    name="marks"
                                    id="marks"
                                    type="text"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                />
                            </div>

                            <div className="form-group half-width">
                            <label>Status:</label>
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="true">Passed</option>
                                <option value="false">Running</option>
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

export default EmployeeEducationForm


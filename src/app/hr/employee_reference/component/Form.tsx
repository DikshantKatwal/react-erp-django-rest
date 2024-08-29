/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeReference/EmployeeReference.ts";
import { useLocation } from "react-router-dom";
interface EmployeeReferenceFormProps {
    closeModal: () => void;
    refetchData: () => void;
    reference?: any;
}

const EmployeeReferenceForm: React.FC<EmployeeReferenceFormProps> = ({ reference, closeModal, refetchData }) => {
    const [store_reference] = useStoreMutation()
    const [update_reference] = useUpdateMutation();
    const location = useLocation();
    const employee = location.state?.employee;
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const occupationOptions = [
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'job', label: 'Job' },
        { value: 'other', label: 'Other' }
    ];

    useEffect(() => {
        if (reference) {
            setId(reference.id || '');
            setFirstName(reference.first_name || '');
            setMiddleName(reference.middle_name || '');
            setLastName(reference.last_name || '');
            setAddress(reference.address || '');
            setOccupation(reference.occupation || '');
            setContact(reference.contact || '');
            setEmail(reference.email || '');
        } else {
            setId('')
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setAddress('');
            setOccupation('');
            setContact('');
            setEmail('');
        }
    }, [reference]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
             first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            address,
            occupation,
            contact,
            email
        };
        if (reference) {
            data.id = reference.id;

            update_reference(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle update failure if necessary
            });
        } else {
            data.employee = employee.id;
            store_reference(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle store failure if necessary
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
                                <label>First Name:</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Middle Name:</label>
                                <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Occupation:</label>
                                <select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
                                    {occupationOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Contact:</label>
                                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default EmployeeReferenceForm


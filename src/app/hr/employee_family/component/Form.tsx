/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeFamily/EmployeeFamily.ts";
import { useLocation } from "react-router-dom";
interface EmployeeFamilyFormProps {
    closeModal: () => void;
    refetchData: () => void;
    family?: any;
}

const EmployeeFamilyForm: React.FC<EmployeeFamilyFormProps> = ({ family, closeModal, refetchData }) => {
    const [store_family] = useStoreMutation()
    const [update_family] = useUpdateMutation();
    const location = useLocation();
    const employee = location.state?.employee;
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [relation, setRelation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [contact, setContact] = useState('');
    const relationOptions = [
        { value: 'parent', label: 'Parent' },
        { value: 'sibling', label: 'Sibling' },
        { value: 'cousin', label: 'Cousin' },
        { value: 'friend', label: 'Friend' },
        { value: 'colleague', label: 'Colleague' },
        { value: 'other', label: 'Other' },
    ];
    const occupationOptions = [
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'job', label: 'Job' },
        { value: 'other', label: 'Other' }
    ];

    useEffect(() => {
        if (family) {
            setId(family.id || '');
            setFirstName(family.first_name || '');
            setMiddleName(family.middle_name || '');
            setLastName(family.last_name || '');
            setRelation(family.relation || '');
            setOccupation(family.occupation || '');
            setContact(family.contact || '');
        } else {
            setId('');
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setRelation('');
            setOccupation('');
            setContact('');
        }
    }, [family]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            relation,
            occupation,
            contact
        };
        if (family) {
            data.id = family.id;

            update_family(data).unwrap().then(() => {
                console.log('stored');
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle update failure if necessary
            });
        } else {
            data.employee = employee.id;
            store_family(data).unwrap().then(() => {
                console.log('stored');
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
                <label>Relation:</label>
                <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                    {relationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
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

export default EmployeeFamilyForm


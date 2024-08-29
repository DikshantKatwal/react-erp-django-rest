import React, { useState, useEffect } from 'react';

interface Row {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    contact: string;
    status: string;
    token?: string;
    matching_record?: string;
}

interface Step3Props {
    existingRows: Row[];
    handleUpdateRow: any;
}

const Step3: React.FC<Step3Props> = ({ existingRows, handleUpdateRow }) => {
    const [rows, setRows] = useState<Row[]>(existingRows);

    useEffect(() => {
        setRows(existingRows);
        handleUpdateRow(rows);
    }, [existingRows]);

    const handleChange = (index: number, field: string, value: string) => {
        if (field === 'delete') {
            const updatedRows = rows.filter((_, i) => i !== index);
            setRows(updatedRows);
            handleUpdateRow(updatedRows);
        } else {
            const updatedRows = [...rows];
            updatedRows[index] = { ...updatedRows[index], [field]: value };
            setRows(updatedRows);
            handleUpdateRow(updatedRows);
        }
    };

    return (
        <div className="common-table">
            <h3><b>Edit Existing Records</b></h3>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id}>
                             <td>
                                <input
                                    type="text"
                                    value={row.first_name || ''}
                                    onChange={(e) => handleChange(index, 'first_name', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.last_name || ''}
                                    onChange={(e) => handleChange(index, 'last_name', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    value={row.email || ''}
                                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                                    style={{
                                        color: row.matching_record?.includes('email') ? 'red' : 'inherit',
                                    }}
                                />
                            </td>
                            <td>
                                <select
                                    className="select2Init"
                                    value={row.user_type || ''}
                                    name="user_type"
                                    id="user_type"
                                    onChange={(e) => handleChange(index, 'user_type', e.target.value)}
                                >
                                    <option value="">Select Position</option>
                                    <option value="Client">Client</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.contact || ''}
                                    onChange={(e) => handleChange(index, 'contact', e.target.value)}
                                    style={{
                                        color: row.matching_record?.includes('contact') ? 'red' : 'inherit',
                                    }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleChange(index, 'delete', '')}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Step3;

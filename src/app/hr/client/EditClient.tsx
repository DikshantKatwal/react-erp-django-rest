/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { clientService} from "../../../services/client/Client.ts";

import { useLocation, useNavigate} from "react-router-dom";

interface EditClientFormProps {
    employee?: any;
    id?: number;
}

const EditClientForm: React.FC<EditClientFormProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const client = location.state?.client;
    const [store_client] = clientService.useStoreMutation();
    const [formState, setFormState] = useState({
        id:'',
        name: '',
        contactperson: '',
        designation: '',
        vatno: '',
        email: '',
        address: '',
        contact: '',

    });
    
    useEffect(() => {
        if (client) {
            setFormState({
                id: client.id || '',
                name: client.name || '',
                contactperson: client.contactperson || '',
                designation: client.designation || '',
                vatno: client.vatno || '',
                email: client.email || '',
                address: client.address || '',
                contact: client.contact || '',
            });
        }else {
            setFormState({
                id: '',
                name: '',
                contactperson: '',
                designation: '',
                vatno: '',
                email: '',
                address: '',
                contact: '',
            });
        }
    }, [client]);

   


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'status' ? (value === 'true') : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            name,
            contactperson,
            designation,
            vatno,
            email,
            address,
            contact,
         
        } = formState;
        
        const payload = {
            name,
            contactperson,
            designation,
            vatno,
            email,
            address,
            contact,
        };

        if (client) {
            store_client({ id: client.id, ...payload })
                .unwrap()
                .then(() => {
                    navigate('/admin/clients')
                })
                .catch((error) => {
                    if (error && error.data && typeof error.data === 'object') {
                        // Loop through the error data and alert each key-value pair
                        for (const [key, value] of Object.entries(error.data)) {
                            alert(`${key}: ${value}`);
                        }
                    } else {
                        // If no specific error data, alert the error message
                        alert("An error occurred");
                    }
                    console.log(error);
                });
        }
    };
    return (
        <div id="common-list-page">
        <section className="content-section">
            <div className="custom-container">
                <div className="section-content">
                    <div className="common-content-box">
                        <div className="common-table">
                            <div className="title-container">
                                <div className="title-item">
                                    <div className="common-form type-table">
                                        <div className="fields">
                                            <div className="form-group-wrapper">
                                                Client Form
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="title-item">
                                    <div className="inner-item">
                                    </div>
                                </div>
                            </div>
                            <form id="Renewal_Form" onSubmit={handleSubmit}>
                            <div className="common-form">
                                <div className="fields">
                                    <div className="form-group-wrapper">
                                        <div className="form-group-item">
                                        <div className="form-group half-width">
                                            <label>Company Name</label>
                                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact Person</label>
                                            <input type="text" name="contactperson" value={formState.contactperson} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>contact</label>
                                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>VAT NO:</label>
                                            <input type="text" name="vatno" value={formState.vatno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Address</label>
                                            <input type="text" name="address" value={formState.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>email</label>
                                            <input type="text" name="email" value={formState.email} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Designation</label>
                                            <input type="text" name="designation" value={formState.designation} onChange={handleInputChange} />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-action ">
                                    <input type="submit" className="co-btn half-width" value="Submit" />
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
     
    );
}

export default EditClientForm;

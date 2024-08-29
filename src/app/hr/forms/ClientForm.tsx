/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { clientService} from "../../../services/client/Client.ts";

import { useNavigate, useParams} from "react-router-dom";

interface NewClientFormProps {
    employee?: any;
    id?: number;
}

const NewClientForm: React.FC<NewClientFormProps> = () => {
    const navigate = useNavigate();
    const [store_client] = clientService.useStoreMutation();
    const [clientData, setClientData] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const [fetchClientForm] = clientService.useFetchClientFormMutation();
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
    const fetchData = async () => {
        try {
            const response = await fetchClientForm({ uidb64: id });
            setClientData(response.data.data);
        } catch (error) {
            navigate('/api/admin/error')
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        
        if (clientData) {
            setFormState(prevState => ({
                ...prevState,
                ...clientData, // Spread the data into the form state
                email: clientData.email, // Set email specifically if needed
                id: clientData.id 
            }));
        }
    }, [clientData]);


   


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

        if (clientData) {
            store_client({ id: clientData.id, ...payload })
                .unwrap()
                .then(() => {
                    navigate('/api/admin/saved')
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
                                            <label>Company Name:</label>
                                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact Person:</label>
                                            <input type="text" name="contactperson" value={formState.contactperson} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact No:</label>
                                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>VAT NO:</label>
                                            <input type="text" name="vatno" value={formState.vatno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Address:</label>
                                            <input type="text" name="address" value={formState.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Email:</label>
                                            <input type="text" name="email" value={formState.email} onChange={handleInputChange} readOnly />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Designation:</label>
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

export default NewClientForm;

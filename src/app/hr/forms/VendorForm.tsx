/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { vendorService} from "../../../services/vendor/Vendor.ts";

import { useNavigate, useParams} from "react-router-dom";

interface NewVendorFormProps {
    employee?: any;
    id?: number;
}

const NewVendorForm: React.FC<NewVendorFormProps> = () => {
    const navigate = useNavigate();
    const [store_vendor] = vendorService.useStoreMutation();
    const [vendorData, setVendorData] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const [fetchVendorForm] = vendorService.useFetchVendorFormMutation();
    const [formState, setFormState] = useState({
        id:'',
        name: '',
        Nameofbank: '',
        BankBranch: '',
        AccountNo: '',
        CompanyName: '',
        email: '',
        ContactPerson: '',
        PAN: '',
        contact: '',
        Address: '',

    });
    const fetchData = async () => {
        try {
            const response = await fetchVendorForm({ uidb64: id });
            setVendorData(response.data.data);
        } catch (error) {
            navigate('/api/admin/error')
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        
        if (vendorData) {
            setFormState(prevState => ({
                ...prevState,
                ...vendorData, // Spread the data into the form state
                email: vendorData.email, // Set email specifically if needed
                contact: vendorData.contact,
                id: vendorData.id 
            }));
        }
    }, [vendorData]);


   


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
            Nameofbank,
            BankBranch,
            AccountNo,
            CompanyName,
            email,
            ContactPerson,
            PAN,
            contact,
            Address,
         
        } = formState;
        
        const payload = {
            name,
            Nameofbank,
            BankBranch,
            AccountNo,
            CompanyName,
            email,
            ContactPerson,
            PAN,
            contact,
            Address,
        };

        if (vendorData) {
            store_vendor({ id: vendorData.id, ...payload })
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
                                                Vendor Form
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
                                            <label>Name</label>
                                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact Person</label>
                                            <input type="text" name="ContactPerson" value={formState.ContactPerson} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>contact</label>
                                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>PAN</label>
                                            <input type="text" name="PAN" value={formState.PAN} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Address</label>
                                            <input type="text" name="Address" value={formState.Address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>email</label>
                                            <input type="text" name="email" value={formState.email} onChange={handleInputChange} readOnly />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Company Name</label>
                                            <input type="text" name="CompanyName" value={formState.CompanyName} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Name of bank</label>
                                            <input type="text" name="Nameofbank" value={formState.Nameofbank} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Bank Branch</label>
                                            <input type="text" name="BankBranch" value={formState.BankBranch} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Accoun No</label>
                                            <input type="text" name="AccountNo" value={formState.AccountNo} onChange={handleInputChange} />
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

export default NewVendorForm;

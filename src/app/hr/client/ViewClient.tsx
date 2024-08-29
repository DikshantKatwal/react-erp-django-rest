/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ClientFormProps {
    client?: any;
    id?: number;
}



const ViewClient: React.FC<ClientFormProps> = () => {
    const location = useLocation();
    const client = location.state?.client;
    const navigate = useNavigate();
   
    const handleEdit = (client: any) => {
        navigate(`/admin/client/edit/${client.id}`, { state: { client } });
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
                                        <h2>Client Details</h2>
                                    </div>
                                </div>
                                <div className="title-item">
                                    <div className="inner-item">
                                        <button className="co-btn"  onClick={() => handleEdit(client)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="common-form">
                                <div className="fields">
                                    <div className="form-group-wrapper">
                                        <div className="form-group-item">
                                            <div className="form-group ">
                                                <label><h2><u>{client.name}</u></h2></label>
                                            </div>
                                        <div className="form-group half-width">
                                            <label><h4>Contact Person: <b>{client.contactperson}</b></h4> </label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Contact Number: <b>{client.contact}</b></h4> </label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>VAT NO: <b>{client.vatno}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Address: <b>{client.address}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Email: <b>{client.email}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Designation: <b>{client.designation}</b></h4></label>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
     
    );
}

export default ViewClient;

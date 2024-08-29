import React, { useEffect, useState, useCallback } from "react";
import { useStoreMutation, useUpdateMutation, useFetchClientMutation, useFetchCurrencyMutation } from "../../../../services/service/Service";
import { serviceTypeService } from "../../../../services/service_type/ServiceType";
import { renewalService } from "../../../../services/renewal/Renewal";
import { useNavigate, useLocation, useParams } from "react-router-dom";

interface ServiceFormProps {
    service?: any;
}
interface GeneralInterface{
    id?: number;
    name?: string;
    alpha_3?: string;
}
const ServiceForm: React.FC<ServiceFormProps> = () => {
    const location = useLocation();
    const service = location.state?.service;

    const navigate = useNavigate();
    const [store_service] = useStoreMutation();
    const [update_service] = useUpdateMutation();
    const [clients, setClients] = useState<GeneralInterface[]>([]);
    const [servicetypes, setServiceTypes] = useState<GeneralInterface[]>([]);
    const [renewals, setRenewal] = useState<GeneralInterface[]>([]);
    const [currencies, setCurrency] = useState<GeneralInterface[]>([]);
    
    const [formState, setFormState] = useState({
        name: '',
        start_date: '',
        expire_date: '',
        service_description: '',
        price: '',
        client_id: '',
        currency_id: '',
        service_type: '',
        renewal: '',
        status: false,
    });

    const [fetchClientAPI] = useFetchClientMutation();
    const [fetchCurrencyAPI] = useFetchCurrencyMutation();
    const [fetchServiceTypeAPI] = serviceTypeService.useFetch_service_typesMutation();
    const [fetchRenewalAPI] = renewalService.useFetch_renewalMutation();

    const fetchData = useCallback(() => {
        fetchClientAPI({})
            .unwrap()
            .then((response) => setClients(response.data)
            
        )
            .catch((error) => console.error("Failed to fetch clients", error));

        fetchServiceTypeAPI({})
            .unwrap()
            .then((response) => setServiceTypes(response.results))
            .catch((error) => console.error("Failed to fetch service types", error));

        fetchRenewalAPI({})
            .unwrap()
            .then((response) => setRenewal(response.results))
            .catch((error) => console.error("Failed to fetch renewals", error));

        fetchCurrencyAPI({})
            .unwrap()
            .then((response) => setCurrency(response))
            .catch((error) => console.error("Failed to fetch currencies", error));

    }, [fetchClientAPI, fetchServiceTypeAPI, fetchRenewalAPI, fetchCurrencyAPI]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (service) {
            setFormState({
                name: service.name || '',
                start_date: service.start_date || '',
                expire_date: service.expire_date || '',
                service_description: service.service_description || '',
                price: service.price || '',
                client_id: service.client_id || '',
                service_type: service.service_type_id || '',
                renewal: service.renewal_id || '',
                currency_id: service.currency_id || '',
                status: service.status !== undefined ? service.status : true,
            });
        } else {
            setFormState({
                name: '',
                start_date: '',
                expire_date: '',
                service_description: '',
                price: '',
                client_id: '',
                service_type: '',
                renewal: '',
                currency_id: '',
                status: true,
            });
        }
    }, [service]);

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
            start_date,
            expire_date,
            service_description,
            price,
            client_id,
            service_type,
            renewal,
            currency_id,
            status,
        } = formState;

        const payload = {
            name,
            start_date,
            expire_date,
            service_description,
            price: parseInt(price),
            client_id: parseInt(client_id),
            service_type_id: parseInt(service_type),
            renewal_id: parseInt(renewal),
            currency_id,
            status,
        };

        if (service) {
            update_service({ id: service.id, ...payload })
                .unwrap()
                .then(() => {
                    navigate('/admin/services')
                })
                .catch(() => {
                    // Handle update failure if necessary
                });
        } else {
            store_service(payload)
                .unwrap()
                .then(() => {
                    navigate('/admin/services')
                })
                .catch(() => {
                    // Handle store failure if necessary
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
                                                <div className="form-group type-icon type-left">
                                                    <span className="icon-container">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    <input type="text" placeholder="Search Course" data-ic-filter="search"/>
                                                </div>
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
                                                <label>Start Date</label>
                                                <input type="date" name="start_date" value={formState.start_date} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Expire Date</label>
                                                <input type="date" name="expire_date" value={formState.expire_date} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Description</label>
                                                <textarea 
                                                        name='service_description' 
                                                        value={formState.service_description} 
                                                        onChange={(e) => setFormState({ ...formState, service_description: e.target.value })}
                                                        />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Price</label>
                                                <input type="number" name="price" value={formState.price} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Client</label>
                                                <select name="client_id" value={formState.client_id} onChange={handleInputChange}>
                                                    <option value="">Select Client</option>
                                                    {clients.map(client => (
                                                        <option key={client.id} value={client.id}>{client.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Service Types</label>
                                                <select name="service_type" value={formState.service_type} onChange={handleInputChange}>
                                                    <option value="">Select Service Type</option>
                                                    {servicetypes.map(service_type => (
                                                        <option key={service_type.id} value={service_type.id}>{service_type.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Renewal</label>
                                                <select name="renewal" value={formState.renewal} onChange={handleInputChange}>
                                                    <option value="">Select Renewal</option>
                                                    {renewals.map(renewal => (
                                                        <option key={renewal.id} value={renewal.id}>{renewal.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Status  </label>
                                                <select name="status" value={formState.status.toString()} onChange={handleInputChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="true">Active</option>
                                                    <option value="false">In-Active</option>
                                                </select>
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Currency</label>
                                                <select name="currency_id" value={formState.currency_id} onChange={handleInputChange}>
                                                    <option value="">Select Currency</option>
                                                    {currencies.map(currency => (
                                                        <option key={currency.alpha_3} value={currency.alpha_3}>{currency.name}</option>
                                                    ))}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
     
    );
}

export default ServiceForm;

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { useStoreMutation, useUpdateMutation } from "../../../../services/service_type/ServiceType";

interface ServiceTypeFormProps {
    closeModal: () => void;
    refetchData: () => void;
    service_type?: any;
}

const ServiceTypeForm: React.FC<ServiceTypeFormProps> = ({ service_type, closeModal, refetchData }) => {
    const [store_service_type] = useStoreMutation()
    const [update_service_type] = useUpdateMutation();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const [sequence, setSequence] = useState('');

    useEffect(() => {
        if (service_type) {
            setName(service_type.name || '');
            setStatus(service_type.status || 'Active');
            setSequence(service_type.sequence || '');
        } else {
            setName('');
            setSequence('');
            setStatus('Active');
        }
    }, [service_type]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (service_type) {
            update_service_type({ id: service_type.id, name, status, sequence }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            store_service_type({ name, status, sequence }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    return (
        <form id="Service_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={name} onChange={(e) => setName(e.target.value)}  id="name" type="text"  />
                            </div>
                            <div className="form-group half-width">
                                <label>Status</label>
                                <select name="status" onChange={(e) => setStatus(e.target.value)} id="status">
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>
                            </div>
                            <div className="form-group half-width">
                                <label>Sequence</label>
                                <input name="sequence" value={sequence} onChange={(e) => setSequence(e.target.value)}  id="sequence" type="text"  />
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

export default ServiceTypeForm


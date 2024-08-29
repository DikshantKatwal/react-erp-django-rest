import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { useStoreMutation, useUpdateMutation } from "../../../../services/renewal/Renewal";

interface RenewalFormProps {
    closeModal: () => void;
    refetchData: () => void;
    renewal?: any;
}

const RenewalForm: React.FC<RenewalFormProps> = ({ renewal, closeModal, refetchData }) => {
    const [store_renewal] = useStoreMutation()
    const [update_renewal] = useUpdateMutation();
    const [name, setName] = useState('');
    const [no_days, setDays] = useState('');
    const [sequence, setSequence] = useState('');

    useEffect(() => {
        if (renewal) {
            setName(renewal.name || '');
            setDays(renewal.no_days || '');
            setSequence(renewal.sequence || '');
        } else {
            setName('');
            setSequence('');
            setDays('');
        }
    }, [renewal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (renewal) {
            update_renewal({ id: renewal.id, name, no_days, sequence }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            store_renewal({ name, no_days, sequence }).unwrap().then(() => {
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
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={name} onChange={(e) => setName(e.target.value)}  id="name" type="text"  />
                            </div>
                            <div className="form-group half-width">
                                <label>No of Days</label>
                                <input name="days" value={no_days} onChange={(e) => setDays(e.target.value)}  id="days" type="number"  />
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

export default RenewalForm


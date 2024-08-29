import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../../../hooks";
import { useStoreMutation, useUpdateMutation } from "../../../../services/onboarding/Onboarding.ts";
import toast from 'react-hot-toast';

interface OnboardingFormProps {
    closeModal: () => void;
    refetchData: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onboarding?: any;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onboarding, closeModal, refetchData }) => {
    const [store_onboarding] = useStoreMutation()
    const [update_onboarding] = useUpdateMutation();
    const [email, setEmail] = useState('');
    const [user_type, setUser_type] = useState('');
    const success = () => toast.success('Sent');
    const error = (e: string) => toast.error(e);
    
    useEffect(() => {
        if (onboarding) {
            setEmail(onboarding.email || '');
            setUser_type(onboarding.user_type || '');
        } else {
            setEmail('');
            setUser_type('');
        }
    }, [onboarding]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const handleError = (errors: any) => {
            for (const key in errors) {
                if (Array.isArray(errors[key]) && errors[key].length > 0) {
                    error(`${key}: ${errors[key][0]}`);
                }
                else{
                    error(errors[key]);
                }
            }
        };

        if (onboarding) {
            update_onboarding({ id: onboarding.id, email, user_type }).unwrap().then(() => {
                closeModal();
                refetchData();
                success();
            }).catch((e) => {
                handleError(e.data);
            });
        }else{
            store_onboarding({ email, user_type}).unwrap().then(() => {
                closeModal();
                refetchData();
                success();
            }).catch((e) => {
                handleError(e.data);
            });
        }
    };

    return (
        <form id="Renewal_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group half-width">
                                <label>Email</label>
                                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)}  id="email" type="email"  />
                            </div>
                            <div className="form-group half-width">
                                <label>Position</label>
                                <select className="select2Init" value={user_type} name="user_type" id="user_type" onChange={(e) => setUser_type(e.target.value)}>
                                        <option value="">Select Position</option>
                                        <option value="Client">Client</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Vendor">Vendor</option>
                                        <option value="Internship">Internship</option>
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
    )
}

export default OnboardingForm


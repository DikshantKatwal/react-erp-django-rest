/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/employeeLeave/EmployeeLeave.ts";
import toast from 'react-hot-toast';

interface LeaveFormProps {
    closeModal: () => void;
    refetchData: () => void;
    leave?: any;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ leave, closeModal, refetchData }) => {
    const [store_leave] = useStoreMutation()
    const [update_leave] = useUpdateMutation();
    const [name, setName] = useState('');
    const [time_interval, setTimeInterval] = useState('');
    const [paid_leave_days, setPaidDaysLeave] = useState('');

    const success = () => toast.success('Leave Type Saved');
    const error = (e: string) => toast.error(e);

    useEffect(() => {
        if (leave) {
            setName(leave.name || '');
            setTimeInterval(leave.time_interval || '');
            setPaidDaysLeave(leave.paid_leave_days || '');
        } else {
            setName('');
            setTimeInterval('');
            setPaidDaysLeave('');
        }
    }, [leave]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const handleError = (errors: any) => {
            for (const key in errors) {
                if (errors[key].length > 0) {
                    console.log(errors[key])
                    error(`${key}: ${errors[key][0]}`);
                }
            }
        };

        if (leave) {
            update_leave({ id: leave.id, name, time_interval, paid_leave_days }).unwrap().then(() => {
                closeModal();
                refetchData();
                success();
                
            }).catch((e) => {
                handleError(e.data);
                // const errorMessage = e.data?.non_field_errors?.[0] || 'An error occurred';
                // error(errorMessage);
            });
        }else{
            store_leave({ name, time_interval, paid_leave_days }).unwrap().then(() => {
                closeModal();
                refetchData();
                success();
            }).catch((e) => {
                handleError(e.data);
            });
        }
    };

    return (
        <>
        
        <form id="Leave_Form" onSubmit={handleSubmit}>
          
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={name} onChange={(e) => setName(e.target.value)}  id="name" type="text"  />
                            </div>
                            <div className="form-group half-width">
                                <label>Time Interval</label>
                                <select name="time_interval"  value={time_interval} onChange={(e) => setTimeInterval(e.target.value)} id="time_interval">
                                <option value='' disabled>Select Time Interval</option>
                                    <option value='yearly'>Yearly</option>
                                    <option value='monthly'>Monthly</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Total Days</label>
                                <input name="paid_leave_days" value={paid_leave_days} onChange={(e) => setPaidDaysLeave(e.target.value)}  id="paid_leave_days" type="text"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-action">
                    <input type="submit" className="co-btn type-full" value="Submit" />
                </div>
            </div>
        </form>
        </>
    )
}

export default LeaveForm


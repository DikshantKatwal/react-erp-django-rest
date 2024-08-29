import { useEffect, useState } from "react";
import {useApprove_leaveMutation } from "../../../../services/Leave/Leave.ts";

interface ApproveLeaveFormProps {
    closeModal: () => void;
    refetchData: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    employee_leave?: any;
}

const ApproveLeaveForm: React.FC<ApproveLeaveFormProps> = ({ employee_leave, closeModal, refetchData }) => {
    const [store_employee_leave] = useApprove_leaveMutation()
    const [leave_id, setLeaveId] = useState('');
    const [no_days, setDays] = useState('');
    const [date_from, setDateFrom] = useState('');
    const [date_to, setDateTo] = useState('');
    const [reason, setReason] = useState('');
    const [approvalstatus, setApprovalStatus] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (employee_leave) {
            setLeaveId(employee_leave.leave.name || '');
            setDays(employee_leave.no_days || '');
            setDateFrom(employee_leave.date_from ? employee_leave.date_from.split('T')[0] : '');
            setDateTo(employee_leave.date_to ? employee_leave.date_to.split('T')[0] : '');
            setReason(employee_leave.reason || '');
            setApprovalStatus(employee_leave.approved_status || '');
            setRemarks(employee_leave.remarks || '');
        } else {
            setLeaveId('');
            setDays('');
            setDateFrom('');
            setDateTo('');
            setReason('');
            setRemarks('');
        }
    }, [employee_leave]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const leaveData = {approved_status:approvalstatus,
            remarks: approvalstatus === 'Rejected' ? remarks : ''
         };
        store_employee_leave({ id: employee_leave.id, ...leaveData }).unwrap().then(() => {
            closeModal();
            refetchData();
        }).catch(() => {
            // Handle update failure if necessary
        });
        }
   

    

    return (
        <form id="ApproveLeave_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>No of Days: {no_days}</label>
                            </div>
                            <div className="form-group ">
                                <label>Leave Type: {leave_id}</label>
                            </div>
                            <div className="form-group">
                                <label>From: {date_from}</label>
                            </div>
                            <div className="form-group">
                                <label>To: {date_to}</label>
                            </div>
                            <div className="form-group">
                                <label>Reason: {reason}</label>
                            </div>
                            <div className="form-group half-width">
                                <label>Approval Status</label>
                                <select name="renewal" value={approvalstatus} onChange={(e) => setApprovalStatus(e.target.value)}>
                                    <option value="">Select Leave Type</option>
                                    <option key="Pending" value="Pending">Pending</option>
                                    <option key="Approved" value="Approved">Approve</option>
                                    <option key="Rejected" value="Rejected">Rejected</option>
                                </select>
                            </div>
                            {approvalstatus === 'Rejected' && (
                                <div className="form-group">
                                    <label>Remarks</label>
                                    <textarea onChange={(e) => setRemarks(e.target.value)}>
                                        {remarks}
                                    </textarea>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-action half-width">
                    <input type="submit" className="co-btn type-full" value="Submit" />
                </div>
            </div>
        </form>
    )
}

export default ApproveLeaveForm


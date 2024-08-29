/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import {
  useStoreMutation,
  useUpdateMutation,
} from "../../../../services/Leave/Leave.ts";
import { leaveService } from "../../../../services/employeeLeave/EmployeeLeave.ts";

interface EmployeeLeaveFormProps {
  closeModal: () => void;
  refetchData: () => void;
  employee_leave?: any;
}
interface GeneralInterface {
  name?: string;
  id?: number;
}
const EmployeeLeaveForm: React.FC<EmployeeLeaveFormProps> = ({
  employee_leave,
  closeModal,
  refetchData,
}) => {
  const [store_employee_leave] = useStoreMutation();
  const [update_employee_leave] = useUpdateMutation();
  const [leave_id, setLeaveId] = useState("");
  const [no_days, setDays] = useState("");
  const [date_from, setDateFrom] = useState("");
  const [date_to, setDateTo] = useState("");
  const [reason, setReason] = useState("");
  const [leave_types, setLeaveTypes] = useState<GeneralInterface[]>([]);

  useEffect(() => {
    if (employee_leave) {
      setLeaveId(employee_leave.leave_id || "");
      setDays(employee_leave.no_days || "");
      setDateFrom(
        employee_leave.date_from ? employee_leave.date_from.split("T")[0] : ""
      );
      setDateTo(
        employee_leave.date_to ? employee_leave.date_to.split("T")[0] : ""
      );
      setReason(employee_leave.reason || "");
    } else {
      setLeaveId("");
      setDays("");
      setDateFrom("");
      setDateTo("");
      setReason("");
    }
  }, [employee_leave]);

  const [fetchLeaveTypeAPI] = leaveService.useFetch_leaveMutation();

  const fetchData = useCallback(() => {
    fetchLeaveTypeAPI({})
      .unwrap()
      .then((response) => setLeaveTypes(response.results))
      .catch((error) => console.error("Failed to fetch renewals", error));
  }, [fetchLeaveTypeAPI]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (date_from && date_to) {
      const fromDate = new Date(date_from);
      const toDate = new Date(date_to);
      const timeDiff = toDate.getTime() - fromDate.getTime();
      let daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
      daysDiff = daysDiff + 1;
      setDays(daysDiff.toString());
    }
  }, [date_from, date_to]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const leaveData = { no_days, date_from, date_to, reason, leave_id };

    if (employee_leave) {
      update_employee_leave({ id: employee_leave.id, ...leaveData })
        .unwrap()
        .then(() => {
          closeModal();
          refetchData();
        })
        .catch(() => {
          // Handle update failure if necessary
        });
    } else {
      store_employee_leave(leaveData)
        .unwrap()
        .then(() => {
          closeModal();
          refetchData();
        })
        .catch(() => {
          // Handle store failure if necessary
        });
    }
  };
  if (!employee_leave) {
    return (
      <form id="EmployeeLeave_Form" onSubmit={handleSubmit}>
        <div className="common-form">
          <div className="fields">
            <div className="form-group-wrapper">
              <div className="form-group-item">
                <div className="form-group half-width">
                  <label>Leave Type</label>
                  <select
                    name="renewal"
                    value={leave_id}
                    onChange={(e) => setLeaveId(e.target.value)}
                  >
                    <option value="">Select Leave Type</option>
                    {leave_types.map((leave_type) => (
                      <option key={leave_type.id} value={leave_type.id}>
                        {leave_type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date From</label>
                  <input
                    name="date_from"
                    value={date_from}
                    onChange={(e) => setDateFrom(e.target.value)}
                    id="date_from"
                    type="date"
                  />
                </div>
                <div className="form-group">
                  <label>Date To</label>
                  <input
                    name="date_to"
                    value={date_to}
                    onChange={(e) => setDateTo(e.target.value)}
                    id="date_to"
                    type="date"
                    min={date_from}
                  />
                </div>
                <div className="form-group half-width">
                  <label>No of Days</label>
                  <input
                    name="days"
                    value={no_days}
                    onChange={(e) => setDays(e.target.value)}
                    id="days"
                    type="number"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Reason</label>
                  <input
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    id="reason"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="form-action ">
              <input type="submit" className="co-btn " value="Submit" />
            </div>
          </div>
        </div>
      </form>
    ); // or handle the null state appropriately
  }

  if (employee_leave.approved_status === "Pending") {
    return (
      <form id="EmployeeLeave_Form" onSubmit={handleSubmit}>
        <div className="common-form">
          <div className="fields">
            <div className="form-group-wrapper">
              <div className="form-group-item">
                <div className="form-group half-width">
                  <label>Leave Type</label>
                  <select
                    name="renewal"
                    value={leave_id}
                    onChange={(e) => setLeaveId(e.target.value)}
                  >
                    <option value="">Select Leave Type</option>
                    {leave_types.map((leave_type) => (
                      <option key={leave_type.id} value={leave_type.id}>
                        {leave_type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date From</label>
                  <input
                    name="date_from"
                    value={date_from}
                    onChange={(e) => setDateFrom(e.target.value)}
                    id="date_from"
                    type="date"
                  />
                </div>
                <div className="form-group">
                  <label>Date To</label>
                  <input
                    name="date_to"
                    value={date_to}
                    onChange={(e) => setDateTo(e.target.value)}
                    id="date_to"
                    type="date"
                  />
                </div>
                <div className="form-group half-width">
                  <label>No of Days</label>
                  <input
                    name="days"
                    value={no_days}
                    onChange={(e) => setDays(e.target.value)}
                    id="days"
                    type="number"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Reason</label>
                  <input
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    id="reason"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="form-action ">
              <input type="submit" className="co-btn " value="Submit" />
            </div>
          </div>
        </div>
      </form>
    ); // or handle the null state appropriately
  }
  if (employee_leave.approved_status === "Rejected") {
    return (
      <div className="common-form">
        <div className="fields">
          <div className="form-group-wrapper">
            <div className="form-group-item">
              <div className="form-group half-width">
                <label>Leave Type: {employee_leave.leave.name}</label>
              </div>
              <div className="form-group">
                <label>Date From: {employee_leave.date_from}</label>
              </div>
              <div className="form-group">
                <label>Date To: {employee_leave.date_to}</label>
              </div>
              <div className="form-group half-width">
                <label>No of Days: {employee_leave.no_days}</label>
              </div>
              <div className="form-group">
                <label>Reason: {employee_leave.reason}</label>
              </div>
              <div className="form-group">
                <label>Remarks: {employee_leave.remarks}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (employee_leave.approved_status === "Approved") {
    return (
      <div className="common-form">
        <div className="fields">
          <div className="form-group-wrapper">
            <div className="form-group-item">
              <div className="form-group half-width">
                <label>Leave Type: {employee_leave.leave.name}</label>
              </div>
              <div className="form-group">
                <label>Date From: {employee_leave.date_from}</label>
              </div>
              <div className="form-group">
                <label>Date To: {employee_leave.date_to}</label>
              </div>
              <div className="form-group half-width">
                <label>No of Days: {employee_leave.no_days}</label>
              </div>
              <div className="form-group">
                <label>Reason: {employee_leave.reason}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EmployeeLeaveForm;

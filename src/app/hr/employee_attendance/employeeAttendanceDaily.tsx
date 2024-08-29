/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState } from "react";
import { employeeAttendanceService } from "../../../services/employeeAttendance/EmployeeAttendance";
import "./component/attendance.min.css";

const EmployeeAttendanceDaily = () => {
  const [date, setDate] = useState<Date>();
  const [daily, setDaily] = useState<any[]>([]);
  const [fetchAttendanceAPI] =
    employeeAttendanceService.useFetchEmployeeAttendanceDailyMutation();


  const handleGenerateReport = () => {
    fetchAttendanceAPI({
      date: date,
    })
      .then((response: any) => {
        setDaily(response.data.employee);
      })
      .catch((error: any) => {
        console.error("Failed to fetch employee attendance", error);
      });
  };

  return (
    <div className="custom-div-block">
      <div>
        <input
          type="date"
          placeholder="Search Date"
          onChange={(e) => setDate(e.target.value)} 
        />
        <button className="co-btn" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
     
        <div className="table-responsive">
          <table
            className="common-custom-table"
            id="grid-daily-attendance-summary"
            border={1}
          >
            <thead>
              <tr>
                <th>SN</th>
                <th>Day</th>
                <th>Employee Name</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Total Work Hours</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {daily.map((value, index) => (
                  <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.day_of_week}</td>
                  <td>{value.employee_name}</td>
                  <td>{value.check_in || "Absent"}</td>
                  <td>{value.check_out || "Absent"}</td>
                  <td>{value.working_hour|| "Not Recorded"}</td>
                  <td>{value.remarks || 'Present'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default EmployeeAttendanceDaily;

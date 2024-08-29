/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { employeeAttendanceService } from "../../../services/employeeAttendance/EmployeeAttendance";
import { employeeService } from "../../../services/employee/Employee";
import "./component/attendance.min.css";

const EmployeeAttendanceSummary = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [selectedYearId, setSelectedYearId] = useState<string>("");

  const [employee, setEmployee] = useState<any[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [fetchEmployeeAPI] = employeeService.useFetchEmployeeMutation();

  const [fetchAttendanceAPI] =
    employeeAttendanceService.useFetchEmployeeAttendanceSummaryMutation();

  const fetchData = () => {
    fetchEmployeeAPI({})
      .then((response: any) => {
        const employees = response.data.results; 
        const nonInternEmployees = employees.filter((employee: any) => !employee.isintern);
        setEmployee(nonInternEmployees);
      })
      .catch((error: any) => {
        console.error("Failed to fetch employees", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEmployeeId(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYearId(event.target.value);
  };

  const handleGenerateReport = () => {
    fetchAttendanceAPI({
      year_id: selectedYearId,
      employee_id: selectedEmployeeId,
    })
      .then((response: any) => {
        setSummary(response.data.month_summary_list);
      })
      .catch((error: any) => {
        console.error("Failed to fetch employee attendance", error);
      });
  };

  return (
    <div className="custom-div-block">
      <div>
        <input
          type="text"
          placeholder="Search Year"
          onChange={handleYearChange}
          value={selectedYearId}
        />
        <select onChange={handleEmployeeChange}>
          <option value="">Select Employee</option>
          {employee.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <button className="co-btn" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
      {summary && summary.length > 0 && (
        <div className="table-responsive">
          <table
            className="common-custom-table"
            id="grid-daily-attendance-summary"
            border={1}
          >
            <thead>
              <tr>
                <th>SN</th>
                <th>Employee Name</th>
                <th>Month Name</th>
                <th>Total Days</th>
                <th>Working Days</th>
                <th>Saturdays</th>
                <th>Present Days</th>
                <th>Absent Days</th>
                <th>Half Days Used</th>
                <th>Half Days Leave Count</th>
                <th>Present Days With Half Leave</th>
                <th>Working Hours</th>
                <th>Holidays</th>
                <th>Paid Leave Left</th>
                <th>Unpaid Leave</th>
                <th>Sick Leave Used</th>
                <th>Sick Leave Left</th>
                <th>Total Late Days</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.employee_name}</td>
                  <td>
                    ({value.month_index}){value.month_name}
                  </td>
                  <td>{value.total_days || "0"}</td>
                  <td>{value.working_days || "0"}</td>
                  <td>{value.saturdays || "0"} </td>
                  <td>{value.present_days || "0"} </td>
                  <td>{value.absent_days || "0"} </td>
                  <td>{value.half_day_used || "0"} </td>
                  <td>{value.half_day_leave || "0"} </td>
                  <td>{value.present_days_with_half_day || "0"} </td>
                  <td>{value.working_hour || "0"} </td>
                  <td>{value.holiday || "0"} </td>
                  <td>{value.paid_leave || "0"} </td>
                  <td>{value.unpaid_paid_leave || "0"} </td>
                  <td>{value.sick_leave_days || "0"} </td>
                  <td>{!value.allow_sick_leave_days? 12:value.allow_sick_leave_days}</td>
                  <td>{value.late_days || "0"} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendanceSummary;

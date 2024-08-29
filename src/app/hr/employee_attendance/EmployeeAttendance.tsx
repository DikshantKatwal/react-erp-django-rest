/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { employeeAttendanceService } from "../../../services/employeeAttendance/EmployeeAttendance";
import { employeeService } from "../../../services/employee/Employee";
import "./component/attendance.min.css";

interface WeekDaysProps {
  absent_days?: number;
  present_days?: number;
  total_days?: number;
  total_saturdays?: number;
  working_days?: number;
  working_time?: string;
}

const EmployeeAttendance = () => {
  const [months, setMonths] = useState<any>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");
  const [selectedYearId, setSelectedYearId] = useState<string>("");
  const [employee, setEmployee] = useState<any[]>([]);
  const [employeeAttendance, setEmployeeAttendance] = useState<any[]>([]);
  const [weekdays, setWeekDays] = useState<WeekDaysProps>({
    absent_days: 0,
    present_days: 0,
    total_days: 0,
    total_saturdays: 0,
    working_days: 0,
    working_time:''
});
  const [fetchMontheAPI] = employeeAttendanceService.useFetchMonthsMutation();
  const [fetchEmployeeAPI] = employeeService.useFetchEmployeeMutation();

  const [fetchAttendanceAPI] =
    employeeAttendanceService.useFetchEmployeeAttendanceMutation();

  const fetchData = () => {
    fetchMontheAPI({ })
      .then((response: any) => {
        setMonths(response.data); // Adjust according to API response structure
      })
      .catch((error: any) => {
        console.error("Failed to fetch months", error);
      });

    fetchEmployeeAPI({})
      .then((response: any) => {
        const employees = response.data.results; 
        const nonInternEmployees = employees.filter((employee: any) => !employee.isintern);
        setEmployee(nonInternEmployees); // Adjust according to API response structure
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

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonthId(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYearId(event.target.value);
  };

  const handleGenerateReport = () => {
    fetchAttendanceAPI({
      selectedYearId,
      selectedMonthId,
      selectedEmployeeId,
    })
      .then((response: any) => {
        setEmployeeAttendance(response.data.attendance);
        setWeekDays(response.data.working_days);
        console.log(response.data.working_days)
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
        
        <select
          className="select2Init"
          data-control="select2"
          data-hide-search="true"
          onChange={handleMonthChange}
          value={selectedMonthId}
        >
          <option value="">Choose Month</option>
          {months &&
            Object.keys(months).map((key) => (
              <option key={key} value={key}>
                {months[key]}
              </option>
            ))}
        </select>

        <button className="co-btn" onClick={handleGenerateReport}>Generate Report</button>
      </div>
      {employeeAttendance && employeeAttendance.length > 0 && (
      <div className="table-responsive">
        <table
          className="common-custom-table"
          id="grid-daily-attendance-summary"
          border={1}
        >
          <thead>
            <tr>
              <th>SN</th>
              <th>Date</th>
              <th>Day</th>
              <th>Device Name</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>T. Duration</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {employeeAttendance.map((value, index) => (
              <tr key={index} className={
                (value.remarks ==='Present'? "green-row " : "") +
                (value.remarks === "Holiday" ? "light-red-row" : "")+
                (value.remarks === "Saturday" ? "red-row" : "")+
                (value.remarks === "Late" ? "yellow-row" : "")+
                (value.remarks === "Half Day" ? "dark-yellow-row" : "")+
                
                (value.check_in_time === "absent" ? "gray-row" : "")+
                (value.check_in_time === "Leave" ? "dark-gray-row" : "")
                
              }>
                <td>{index + 1}</td>

                <td>{`${value.date_en} (${value.date_np})`}</td>

                <td>{value.day}</td>

                <td>{value.device_name || ""}</td>
                <td>{value.check_in_time || ""}</td>

                <td>{value.check_out_time || ""} </td>
                <td>{value.time_diff || ""} </td>
                <td>{value.remarks || ""} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
   {weekdays && (
      <div className="table-responsive second">
        <table className="common-custom-table" id="grid-summary">
          <caption>Summary</caption>
          <thead>
            <tr>
              <td>Total Days</td>
              <td>{weekdays.total_days} days</td>
            </tr>
            <tr>
              <td>Total Weekends</td>
              <td>{weekdays.total_saturdays} days</td>
            </tr>
            <tr>
              <td>Total Working Days</td>
              <td>{weekdays.working_days} days</td>
            </tr>
            <tr>
              <td>Present Days</td>
              <td>{weekdays.present_days} days</td>
            </tr>
            <tr>
              <td>Absent Days</td>
              <td>{weekdays.absent_days} days</td>
            </tr>
            <tr>
              <td>Total Working Hours</td>
              <td>{weekdays.working_time} hours</td>
            </tr>
          </thead>
        </table>
      </div>
  )}
    </div>
   
  );
};

export default EmployeeAttendance;

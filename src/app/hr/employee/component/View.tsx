/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useFetchApprovedLeaveMutation } from "../../../../services/employeeAttendance/EmployeeAttendance.ts";
import { useNavigate, useLocation } from "react-router-dom";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface EmployeeFormProps {
    employee?: any;
    id?: number;
}

interface LeaveProps {
    sick_leave_num_days: number;
    sick_leave_left: number;
    other_leave: number;
    leave_interval: string;
    paid_leave_days: number;
}

const ViewEmployee: React.FC<EmployeeFormProps> = () => {
    const location = useLocation();
    const employee = location.state?.employee;
    const navigate = useNavigate();
    const [fetchApprovedLeave] = useFetchApprovedLeaveMutation();
    const [leave, setLeave] = useState<LeaveProps>({
        sick_leave_num_days: 0,
        sick_leave_left: 0,
        other_leave: 0,
        leave_interval: "",
        paid_leave_days: 0
    });
    const fetchData = () => {
        fetchApprovedLeave({
            employee_id: employee.id,
          })
            .then((response: any) => {
                setLeave(response.data);
            })
            .catch((error: any) => {
              navigate('/admin/employees')
            });
      };
    
      useEffect(() => {
        if (employee?.id) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employee]);

    const handleEdit = (employee: any) => {
        navigate(`/admin/employee/edit/${employee.id}`, { state: { employee } });
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
                                        <h2>Employee Details</h2>
                                    </div>
                                </div>
                                <div className="title-item">
                                    <div className="inner-item">
                                        <button className="co-btn"  onClick={() => handleEdit(employee)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="common-form">
                                <div className="fields">
                                    <div className="form-group-wrapper">
                                        <div className="form-group-item">
                                            <div className="form-group ">
                                                <label><h2><u>{employee.name} {employee.last_name}</u></h2></label>
                                            </div>
                                        <div className="form-group ">
                                            <label>
                                                <h4> 
                                                    Total Sick Leave: {leave?.paid_leave_days} days in a {leave?.leave_interval}&emsp;&emsp; 
                                                    Sick Leave Taken: {leave?.sick_leave_num_days}&emsp; &emsp; 
                                                    Total Leave Left: {leave?.sick_leave_left}&emsp; &emsp; 
                                                    Total Other Leave Used: {leave?.other_leave}&emsp; &emsp; 
                                                </h4>
                                            </label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Date of Birth: <b>{employee.dob}</b></h4> </label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Gender: <b>{employee.gender}</b></h4> </label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>PAN: <b>{employee.pan}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Father's Name: <b>{employee.fathername}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Mother's Name: <b>{employee.mothername}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Grandfather's Name: <b>{employee.grandfathername}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Start Date: <b>{employee.startdate}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Contact: <b>{employee.contact}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Email: <b>{employee.email}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Province: <b>{employee.province}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>District: <b>{employee.district}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Municipality: <b>{employee.municipality}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Address: <b>{employee.address}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Ward No: <b>{employee.wardno}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Village: <b>{employee.village}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>House No: <b>{employee.houseno}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Account Number: <b>{employee.accountnumber}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label> <h4>Account Holder Name: <b>{employee.accountholdername}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Name of Bank: <b>{employee.nameofbank}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Bank Branch: <b>{employee.bankbranch}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>College Name: <b>{employee.collegename}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Course: <b>{employee.course}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Emergency Person Email: <b>{employee.emergencypersonemail}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Emergency Person Contact: <b>{employee.emergencypersoncontact}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Emergency Person Name: <b>{employee.emergencypersonname}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Emergency Person Relation: <b>{employee.emergencypersonrelation}</b></h4></label>
                                        </div>
                                        <div className="form-group half-width">
                                            <label><h4>Blood Group: <b>{employee.bloodgroup}</b></h4></label>
                                        </div>
                                        <PermissionWrapper
                                            redirect={false}
                                            permission="employee_leave.delete_employeeleave"
                                        >
                                        <div className="form-group half-width">
                                            <label><h4>Employee Attendance ID: <b>{employee.device_employee_no}</b></h4></label>
                                        </div>
                                        </PermissionWrapper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
     
    );
}

export default ViewEmployee;


import React, { Component, useEffect, useState } from 'react';
import PermissionWrapper from '../../../app/layout/PermissionWrapperLayout';
import { Link, useLocation } from 'react-router-dom';

const HrNavigation = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith("/admin/templates/email")) {
            setActiveMenu("email");
        } else if (path.startsWith("/admin/templates/sms")) {
            setActiveMenu("sms");
        } else if (path.startsWith("/admin/broadcast")) {
            setActiveMenu("broadcast");
        } else if (path.startsWith("/admin/user-notification")) {
            setActiveMenu("user-notification");
        } else if (path.startsWith("/admin/onboarding")) {
            setActiveMenu("onboarding");
        } else if (path.startsWith("/admin/leave-type")) {
            setActiveMenu("leave-type");
        } else if (path.startsWith("/admin/clients")) {
            setActiveMenu("clients");
        } else if (path.startsWith("/admin/employees")) {
            setActiveMenu("employees");
        } else if (path.startsWith("/admin/apply-leave")) {
            setActiveMenu("apply-leave");
        } else if (path.startsWith("/admin/approve-leave")) {
            setActiveMenu("approve-leave");
        }
        else if (path.startsWith("/admin/attendance/summary/")) {
            setActiveMenu("summary");
        } else if (path.startsWith("/admin/attendance/daily_attendance")) {
            setActiveMenu("daily_attendance");
        }
        else if (path.startsWith("/admin/attendance_config")) {
            setActiveMenu("attendance_config");
        } else if (path.startsWith("/admin/attendance")) {
            setActiveMenu("attendance");
        } else if (path.startsWith("/admin/holiday")) {
            setActiveMenu("holiday");
        } else {
            setActiveMenu('admin');
        }
    }, [location.pathname]);

    return (
        <>
            <div className="sidebar-item type-cntent"  >
                <div className="nav-container">
                    <PermissionWrapper redirect={false} permission="employee_leave.view_employeeleave">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "admin" ? "menu-active" : ""}>
                                    <Link to="/admin">
                                        <span className="type-icon"><i className="flaticon-home"></i></span>
                                        <span className="type-text">Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="broadcast.change_broadcast">
                        <div className="nav-item">
                            <ul>
                                <li className={`has-sub-menu ${activeMenu === "broadcast" || activeMenu === "user-notification" ? "menu-active" : ""}`}>
                                    <Link to="/admin/broadcast/">
                                        <span className="type-icon"><i className="flaticon-bell"></i></span>
                                        <span className="type-text">Notification/Broadcast </span>
                                    </Link>

                                    <ul>
                                        <li className={activeMenu === "broadcast" ? "menu-active" : ""}>
                                            <Link to="/admin/broadcast">
                                                <span className="type-text">Broadcast</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "user-notification" ? "menu-active" : ""}>
                                            <Link to="/admin/user-notification/">
                                                <span className="type-text">User Notification</span>
                                            </Link>
                                        </li>
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>

                    <PermissionWrapper redirect={false} permission="onboarding.change_onboarding">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "onboarding" ? "menu-active" : ""}>
                                    <Link to="/admin/onboarding">
                                        <span className="type-icon"><i className="flaticon-upload-1"></i></span>
                                        <span className="type-text">Onboarding</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>


                    <PermissionWrapper redirect={false} permission="employee.view_employee">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "employees" ? "menu-active" : ""}>
                                    <Link to="/admin/employees">
                                        <span className="type-icon"><i className="flaticon-support"></i></span>
                                        <span className="type-text">Employee</span>
                                    </Link>
                                </li>
                                <li className={activeMenu === "leave-type" ? "menu-active" : ""}>
                                    <Link to="/admin/leave-type">
                                        <span className="type-icon"><i className="flaticon-home"></i></span>
                                        <span className="type-text">Leave Type</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="employee_leave.add_employeeleave">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "apply-leave" ? "menu-active" : ""}>
                                    <Link to="/admin/apply-leave">
                                        <span className="type-icon"><i className="flaticon-writing"></i></span>
                                        <span className="type-text">Apply Leave</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "approve-leave" ? "menu-active" : ""}>
                                    <Link to="/admin/approve-leave">
                                        <span className="type-icon"><i className="flaticon-file"></i></span>
                                        <span className="type-text">Approve Leave</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>

                    <PermissionWrapper redirect={false} permission="employeeattendance.change_employeeattendance">
                        <div className="nav-item">
                            <ul>
                                <li className={`has-sub-menu ${activeMenu === "attendance" || activeMenu === "attendance_config" || activeMenu === "summary" || activeMenu === "daily_attendance" ? "menu-active" : ""}`}>
                                    <a>
                                        <span className="type-icon"><i className="flaticon-search"></i></span>
                                        <span className="type-text">Attendance </span>
                                    </a>

                                    <ul>
                                        <li className={activeMenu === "attendance" ? "menu-active" : ""}>
                                            <Link to="/admin/attendance">
                                                <span className="type-text">Monthly Attendance</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "summary" ? "menu-active" : ""}>
                                            <Link to="/admin/attendance/summary/">
                                                <span className="type-text">Summary</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "daily_attendance" ? "menu-active" : ""}>
                                            <Link to="/admin/attendance/daily_attendance/">

                                                <span className="type-text">Daily Attendance</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "attendance_config" ? "menu-active" : ""}>
                                            <Link to="/admin/attendance_config">
                                                <span className="type-icon"><i className="flaticon-home"></i></span>
                                                <span className="type-text">Attendance Config</span>
                                            </Link>
                                        </li>

                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>

                    <PermissionWrapper redirect={false} permission="holiday.change_holiday">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "holiday" ? "menu-active" : ""}>
                                    <Link to="/admin/holiday">
                                        <span className="type-icon"><i className="flaticon-heart"></i></span>
                                        <span className="type-text">Holiday</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>



                    <PermissionWrapper redirect={false} permission="templates.change_templates">
                        <div className="nav-item">
                            <ul>
                                <li className={`has-sub-menu ${activeMenu === "email" || activeMenu === "sms" ? "menu-active" : ""}`}>
                                    <a>
                                        <span className="type-icon"><i className="flaticon-warehouse"></i></span>
                                        <span className="type-text">Templates </span>
                                    </a>

                                    <ul>
                                        <li className={activeMenu === "email" ? "menu-active" : ""}>
                                            <Link to="/admin/templates/email">
                                                <span className="type-text">Email Templates</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "sms" ? "menu-active" : ""}>
                                            <Link to="/admin/templates/sms">
                                                <span className="type-text">SMS Templates</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>

                </div>
            </div>
        </>
    );
}

export default HrNavigation;
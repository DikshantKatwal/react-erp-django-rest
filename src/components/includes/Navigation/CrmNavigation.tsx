
import React, { Component, useEffect, useState } from 'react';
import PermissionWrapper from '../../../app/layout/PermissionWrapperLayout';
import { Link, useLocation } from 'react-router-dom';

const CrmNavigation = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith("/admin/crm/services")) {
            setActiveMenu("services");
        } else if (path.startsWith("/admin/crm/service-histories")) {
            setActiveMenu("service-histories");
        } else if (path.startsWith("/admin/crm/clients")) {
            setActiveMenu("clients");
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
                    <PermissionWrapper redirect={false} permission="client.change_client">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "clients" ? "menu-active" : ""}>
                                    <Link to="/admin/crm/clients">
                                        <span className="type-icon"><i className="flaticon-delivery"></i></span>
                                        <span className="type-text">Clients</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="renewal.add_renewal">
                        <div className="nav-item">
                            <ul>
                                <li className={`has-sub-menu ${activeMenu === "service-types" || activeMenu === "renewal" || activeMenu === "leave-type" ? "menu-active" : ""}`}>
                                    <Link to="/admin/crm/service-types/">
                                        <span className="type-icon"><i className="flaticon-menu"></i></span>
                                        <span className="type-text">Service/Renewal/Leave Type </span>
                                    </Link>

                                    <ul>
                                        <li className={activeMenu === "service-types" ? "menu-active" : ""}>
                                            <Link to="/admin/crm/service-types/">
                                                <span className="type-text">Service Type</span>
                                            </Link>
                                        </li>
                                        <li className={activeMenu === "renewal" ? "menu-active" : ""}>
                                            <Link to="/admin/crm/renewal/">
                                                <span className="type-text">Renewal</span>
                                            </Link>
                                        </li>
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="service.change_service">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "services" ? "menu-active" : ""}>
                                    <Link to="/admin/crm/services">
                                        <span className="type-icon"><i className="flaticon-transaction"></i></span>
                                        <span className="type-text">Services</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>
                    <PermissionWrapper redirect={false} permission="service_histories.view_servicehistories">
                        <div className="nav-item">
                            <ul>
                                <li className={activeMenu === "service-histories" ? "menu-active" : ""}>
                                    <Link to="/admin/crm/service-histories">
                                        <span className="type-icon"><i className="flaticon-file-3"></i></span>
                                        <span className="type-text">Service Histories</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </PermissionWrapper>


                </div>
            </div>
        </>
    );
}

export default CrmNavigation;
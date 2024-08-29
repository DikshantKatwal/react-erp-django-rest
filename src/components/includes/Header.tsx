import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../services/authentication/authService';
import PermissionWrapper from '../../app/layout/PermissionWrapperLayout';
import { useEffect, useState } from 'react';
import Navigation from './Navigation';

function Header() {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const onLogoutClick = (e: React.FormEvent) => {
        e.preventDefault();
        logout({}).unwrap().then(() => {
            navigate('/'); // Redirect after login success
        }).catch(() => {
            // Handle login failure if necessary
        });
    };

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
        } else if (path.startsWith("/admin/crm/service-types")) {
            setActiveMenu("service-types");
        } else if (path.startsWith("/admin/crm/renewal")) {
            setActiveMenu("renewal");
        } else if (path.startsWith("/admin/leave-type")) {
            setActiveMenu("leave-type");
        } else if (path.startsWith("/admin/services")) {
            setActiveMenu("services");
        } else if (path.startsWith("/admin/service-histories")) {
            setActiveMenu("service-histories");
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

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open', 'overlay-visible');
        } else {
            document.body.classList.remove('menu-open', 'overlay-visible');
        }
    }, [isMenuOpen]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header id="header-wrapper" onClick={handleMenuItemClick}>
                <div className="sidebar-container">
                    <div className="sidebar-item type-header">
                        <div className="common-logo-container type-lg">
                            <Link to="/admin">
                                <img src='/assets/img/logo/logo.png' />
                            </Link>
                        </div>
                    </div>

                    <Navigation></Navigation>

                    <div className="sidebar-item type-footer">
                        <div className="nav-container">
                            <div className="nav-item type-reverse-hover">
                                <ul>
                                    <li>
                                        <a onClick={onLogoutClick}>
                                            <span className="type-icon"><i className="flaticon-logout-1"></i></span>
                                            <span className="type-text">Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div id="mobile-nav-wrapper">
                <ul>
                    <li>
                        <Link to="/admin">
                            <div className="inner">
                                <img src="/assets/img/icons/icon_home.png" />
                                <p>Home</p>
                            </div>
                        </Link>
                    </li>
                    <li className="menu-toggle" onClick={handleMenuToggle}>
                        <div className="inner">
                            <div className="common-toggle">
                                <img src="/assets/img/icons/icon_menu.png" />
                            </div>
                            <p>Menu</p>
                        </div>
                    </li>
                    <li>
                        <div className="inner bottom-drawer-toggle">
                            <img src="/assets/img/icons/icon_settings.png" />
                            <p>Settings</p>
                        </div>
                    </li>
                    <li>
                        <a onClick={onLogoutClick}>
                            <div className="inner">
                                <img src="/assets/img/icons/icon_logout.png" />
                                <p>Logout</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="common-mobile-drawer">
                <div className="card-inner">
                    <div className="card-item">
                        <div className="title">
                            <h4>My Account</h4>
                        </div>
                        <div className="content">
                            <ul>
                                <li>
                                    <a href="" className="login-open">
                                        <img src="/assets/img/icons/icon_profile.svg" />
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <span onClick={onLogoutClick}>
                                        <img src="/assets/img/icons/icon_logout.png" />
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-item">
                        <div className="title">
                            <h4>User Management</h4>
                        </div>
                        <div className="content">
                            <ul>
                                <li><a href="">All User</a></li>
                                <li><a href="">User Roles</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header
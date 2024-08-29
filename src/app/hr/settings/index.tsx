
import React, { Component, useEffect } from 'react';
import { useBreadcrumb } from '../../layout/BreadcrumbContext';

const Settings = () => {
    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        const breadcrumbs = (
            <>
                <div className="block-item">
                    <h4>Settings</h4>
                </div>
                <div className="block-item type-nav">
                    <ul>
                        <li><a href="settings_masterdata_page.php" className="active">Master Data</a></li>
                        <li className="has-drop-down">
                            <a href="#" >Users</a>
                            <div className="dropdown-container">
                                <ul>
                                    <li><a href="settings_user_page.php">All User</a></li>
                                    <li><a href="single_masterdata_page.php">User Group</a></li>
                                    <li><a href="settings_permission_page.php">User Permissions</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </>

        );
        setBreadcrumbs(breadcrumbs);
    }, [setBreadcrumbs]);

    return (

        <div id="about-page">
            <section className="content-section">
                <div className="custom-container">
                    <div className="section-content">
                        <div className="common-layout-container type-center type-large">
                            <div className="layout-item">
                                <div className="common-content-box">

                                    <div className="list-container">
                                        <div className="list-item">
                                            <div className="common-title">
                                                <h5>Service</h5>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li><a href="single_masterdata_page.php">Test</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="list-item">
                                            <div className="common-title">
                                                <h5>Admin</h5>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li><a href="single_masterdata_page.php">Expense Category</a></li>
                                                </ul>
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

export default Settings;
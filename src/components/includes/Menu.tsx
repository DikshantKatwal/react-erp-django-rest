import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BroadcastService } from '../../services/broadcast/Broadcast';
import { NotificationService } from '../../services/notification/Notification';
import PermissionWrapper from '../../app/layout/PermissionWrapperLayout';
import { useNavigation } from './NavigationContext';

import iconHR from '../../assets/img/service_icons/service_icon_hr.png';
import iconCRM from '../../assets/img/service_icons/service_icon_crm.png';

function Menu() {
    const navigate = useNavigate();
    const [fetchBroadcastAPI] = BroadcastService.useFetchMutation();
    const [fetchNotificationAPI] = NotificationService.useViewMutation();
    const [notifications, setNotifications] = useState<{ type: 'Broadcast' | 'Notification', content: any }[]>([]);
    const [notificationsCount, setNotificationsCount] = useState<number>(null);
    const [usernotificationsCount, setUserNotificationsCount] = useState<number>(null);
    const [user_notifications, setUserNotifications] = useState<any[]>([]);
    const fetchData = () => {
        fetchBroadcastAPI({})
            .unwrap()
            .then((response: any) => {
                const data = response.results;
                if (data.length > 0) {
                    const today = new Date().toISOString().split('T')[0];
                    const todayNotification = data.filter((item: any) =>
                        item.type === 'Notification' &&
                        item.from_date <= today &&
                        item.to_date >= today &&
                        item.status === true
                    );

                    const newModals = todayNotification
                        .filter(notification => !localStorage.getItem(`notification_shown_${notification.id}`))
                        .map(notification => ({
                            type: 'Notification',
                            content: notification
                        }));

                    if (newModals.length > 0) {
                        setNotificationsCount(newModals.length);
                    }

                    setNotifications(newModals);
                }
            })
            .catch((error: any) => {
                console.error("Failed to fetch broadcast", error);
            });


        fetchNotificationAPI({})
            .unwrap()
            .then((response: any) => {
                const data = response;
                if (data.length > 0) {

                    const newModals = data
                        .filter(notification => !localStorage.getItem(`user_notification_${notification.id}`))
                        .map(notification => ({
                            type: 'Notification',
                            content: notification
                        }));

                    if (newModals.length > 0) {
                        setUserNotificationsCount(newModals.length);
                    }

                    setUserNotifications(newModals);
                }
            })
            .catch((error: any) => {
                console.error("Failed to fetch notification", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const goto_notification = () => {
        if (notifications.length > 0) {
            notifications.forEach(notification => {
                localStorage.setItem(`notification_shown_${notification.content.id}`, 'true');
            });
        }
        if (user_notifications.length > 0) {
            user_notifications.forEach(notification => {
                localStorage.setItem(`user_notification_${notification.content.id}`, 'true');
            });
        }
        setUserNotificationsCount('');
        setNotificationsCount('');
        navigate('/admin/notifications');
    };

    const { setNavigationType } = useNavigation();

    const handleMenuClick = (type: 'hrm' | 'crm') => {
        setNavigationType(type);
    };

    return (
        <div className="block-item type-controls">
            <div className="navigation-container">
                <div className="navigation-item">
                    <ul>
                        <li>
                            <a onClick={goto_notification}>
                                <i className="flaticon-bell"></i>
                                <span>{notificationsCount + usernotificationsCount}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navigation-item type-service">
                    <ul>
                        <li>
                            <a>
                                <i className="flaticon-menu"></i>
                            </a>
                            <div className='services-container'>
                                <div className='service-item'>
                                    <div className='service-inner' onClick={() => handleMenuClick('hrm')}>
                                        <div className='icon'>
                                            <img src={iconHR}></img>
                                        </div>
                                        <div className='title'>
                                            <p>HR</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='service-item'>
                                    <div className='service-inner' onClick={() => handleMenuClick('crm')}>
                                        <div className='icon'>
                                            <img src={iconCRM}></img>
                                        </div>
                                        <div className='title'>
                                            <p>CRM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="navigation-item">
                    <div className="profile-container">
                        <div className="avatar-container">
                            <img src="/assets/img/placeholder/placeholder-person.jpg" />
                        </div>

                        <div className="profile-dropdown">
                            <div className="drop-item">
                                <div className="name-container">
                                    <div className="name-item">
                                        <div className="avatar-container">
                                            <img src="/assets/img/placeholder/placeholder-person.jpg" />
                                        </div>
                                    </div>
                                    <div className="name-item">
                                        <div className="name">
                                            <h4>Name Panel</h4>
                                        </div>
                                        <div className="email">
                                            <p>email panel</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">

                                <div className="drop-item">
                                    <ul>
                                        <li>
                                            <Link to="/admin/auth/settings">
                                                Settings
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </PermissionWrapper>

                            <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                                <Link to="/admin/auth/users/">
                                    <div className="drop-item">
                                        <ul>
                                            <li><a>Users</a></li>
                                        </ul>
                                    </div>
                                </Link>
                            </PermissionWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;
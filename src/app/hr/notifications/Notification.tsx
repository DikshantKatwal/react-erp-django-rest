import React, { useEffect, useState } from 'react';
import NotificationItem from './components/NotificationItem';
import { BroadcastService } from '../../../services/broadcast/Broadcast';
import { NotificationService } from '../../../services/notification/Notification';

interface Notification {
    message: string;
    date: string;
}

const NotificationPage: React.FC = () =>{ 
    const [fetchBroadcastAPI] = BroadcastService.useFetchMutation();
    const [fetchNotificationAPI] = NotificationService.useViewMutation();
    const [notifications, setNotifications] = useState<{ type: 'Broadcast' | 'Notification', content: any }[]>([]);
    const [user_notifications, setUserNotifications] = useState<number | string>('');
  
    const fetchData = () => {
        fetchBroadcastAPI({ })
            .unwrap()
            .then((response: any) => {
                const data = response.results
                // if (data.length > 0 && isFirstLoginOfDay()) {
                    if (data.length > 0) {
                    const today = new Date().toISOString().split('T')[0]; 
                    const todayNotification  = data.filter((item: any) => 
                        item.type === 'Notification' && 
                        item.from_date <= today &&
                        item.to_date >= today
                    );

                    setNotifications(todayNotification);
                    
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
               
                setUserNotifications(data);
            }
        })
        .catch((error: any) => {
            console.error("Failed to fetch notification", error);
        });

    };
    useEffect(() => {
        fetchData();
    }, []);
    return(
    <div id="notification-page">
        <section className="notification-section">
            <div className="custom-container">
                <div className="section-content">

                {user_notifications && user_notifications.length > 0  &&(
                <div className="common-content-box">
                    <p className='heading'>User Notifications</p>
                        <div className="notification-container">
                            {user_notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    title={notification.title}
                                    message={notification.description}
                                    image={notification.image_url}
                                />
                            ))}
                            <NotificationItem
                                message="No More Results to display"
                                typeLast
                            />
                        </div>
                    </div>
                    )}
                    <div className="common-content-box">
                    <p className='heading'>Notifications</p>
                        <div className="notification-container">
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    title={notification.title}
                                    message={notification.description}
                                    image={notification.image_url}
                                />
                            ))}
                            <NotificationItem
                                message="No More Results to display"
                                typeLast
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </div>
);}

export default NotificationPage;

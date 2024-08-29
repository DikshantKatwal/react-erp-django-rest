import { requestPermission, onMessageListener } from '../../../firebase.js';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNotificationTokenMutation } from '../../services/notification/Notification.js';



const Notifications = () => {
  const [storeNotificationToken] = useNotificationTokenMutation();
  const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => toast(<ToastDisplay />);

  useEffect(() => {
    requestPermission(storeNotificationToken);
  }, [storeNotificationToken]);

  const ToastDisplay = () => {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
      }).catch(err => console.log("Failed to receive message: ", err));
  }, []);

  return <Toaster position="bottom-right"
  reverseOrder={false}
  toastOptions={{
    success: {
      style: {
        background: '#5eff83',
      
      },
    },
    error: {
      style: {
        background: '#ff6500',
        color: 'white'
      },
    },
    
  }}
/>;
};

export default Notifications;

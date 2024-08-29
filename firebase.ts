import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

interface FirebasePayload {
  notification: {
    title: string;
    body: string;
  };
}


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1::web:",
  measurementId: "G-"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);

interface StoreNotificationToken {
  token: string;
}

export const requestPermission = (
  storeNotificationToken: (data: StoreNotificationToken) => { unwrap: () => Promise<void> }
): void => {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: "BC0k8Hh8__vhJwi21aTSafwqV8WcsAFhsEr9aG2MlAogJIezeOpossMyvPGc6cs-reim08t5Mdl2lRhppPJdeoA" })
        .then((currentToken) => {
          if (currentToken) {
            storeNotificationToken({ token: currentToken }).unwrap().then(() => {
              // Handle successful token storage if necessary
            }).catch(() => {
              // Handle token storage failure if necessary
            });
          } else {
            console.log('Failed to generate Token');
          }
        })
        .catch(err => {
          console.log("An Error occurred while requesting token", err);
        });
    } else {
      console.log('Permission Denied');
    }
  });
};

export const onMessageListener = (): Promise<FirebasePayload> =>
  new Promise(resolve => {
    onMessage(messaging, (payload) => {
      resolve(payload as FirebasePayload);
    });
  });

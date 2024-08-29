import React from 'react';
import '../css/NotificationItem.css';

interface NotificationItemProps {
    title:string;
    message: string;
    date?: string;

    typeLast?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({title,  message, date, image,  typeLast }) => (
    <div className={`notification-item ${typeLast ? 'type-last' : ''}`}>
        <div className="block-container">
            
            
            <div className="block-item">
            
            {title && (
                <div className="message">
                    <p className="title"><b>{title} </b><br/> 
                    <b>Message: </b>{message} </p>
                    <br/>
                </div>  )}
                <div className="image-col">
                    {image && (<img src={image} alt="Image preview" id="imagePreview"/>)}
                        
                    
                  </div>
                
                {date && (
                    <div className="date">
                        <p>{date}</p>
                    </div>
                )}
            </div>
            {/* {!typeLast && (
                <div className="block-item">
                    <div className="action">
                        <a href="#">
                            <i className="flaticon-trash"></i>
                        </a>
                    </div>
                </div>
            )} */}
        </div>
    </div>
);

export default NotificationItem;

import React from 'react';
import { useDownloadCSVMutation } from '../../../../services/onboarding/Onboarding';
import toast from 'react-hot-toast';


const Step4 = () => {
    const [DownloadCSVAPI] = useDownloadCSVMutation();
    

    
   

    return (
    <div className="common-table">
        <div className="title-container">
            <div className="title-item">
                <div className="common-form type-table">
                     <h3><b>Successfully Uploaded </b></h3>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Step4;

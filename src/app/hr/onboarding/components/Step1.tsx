import React from 'react';
import { useDownloadCSVMutation } from '../../../../services/onboarding/Onboarding';
import toast from 'react-hot-toast';


const Step1 = () => {
    const [DownloadCSVAPI] = useDownloadCSVMutation();
    
    const handleGenerateReport = () => {
        toast.promise(
            DownloadCSVAPI({}) // Ensure this returns a promise
                .unwrap() // Unwrap the RTK Query response
                .then((response) => {
                    // Convert the response to a Blob and download it
                    if (response) {
                        const blob = new Blob([response], { type: 'text/csv' });
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = 'template.csv';
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } else {
                        throw new Error('Unexpected response format');
                    }
                })
                .catch((error) => {
                    // Log and rethrow the error to trigger the toast error state
                    console.error("Failed to fetch template", error);
                    throw error; // Ensure the error is thrown to be caught by toast
                }),
            {
                loading: 'Downloading template...',
                success: 'Template downloaded successfully!',
                error: 'Error occurred during download.',
            }
        );
    };

    return (
    <div className="common-table">
        <div className="title-container">
            <div className="title-item">
                <div className="common-form type-table">
                             <h3><b>Download Excel Template </b></h3>
                </div>
            </div>

            <div className="title-item">
                <div className="inner-item">
                        <button className="co-btn" onClick={handleGenerateReport}>Download Template</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Step1;

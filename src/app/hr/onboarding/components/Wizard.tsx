import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUploadCSVMutation } from '../../../../services/uploader/Uploader';
import { useStoreMutation } from "../../../../services/onboarding/Onboarding.ts";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

interface Step {
    component: React.FC<any>;
}

interface UploadResponse {
    status: string;
    existing_row: Array<any>;
    un_added_row: Array<any>;
    NonExistingRow: Array<any>;
}

const steps: Step[] = [
    { component: Step1 },
    { component: Step2 },
    { component: Step3 },
    { component: Step4 },
];

const Wizard: React.FC = ({onClose, refetchData}) => {
    const [store_onboarding] = useStoreMutation()
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [uploadCSV] = useUploadCSVMutation();
    const [responseData, setResponseData] = useState<UploadResponse | null>(null);
    const [updatedData, setUpdatedData] = useState<UploadResponse | null>(null);
    const StepComponent = steps[currentStep].component;

    const next = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

   const handleUpload = async () => {
    if (!file) {
        toast.error('Please select a file first.');
        return;
    }
    try {
        // const response = await uploadCSV(file).unwrap();
        const data  = await toast.promise(
            uploadCSV(file).unwrap(),
            {
                loading: 'Uploading CSV...',
                success: 'CSV uploaded successfully!',
                error: 'Failed to upload CSV.',
            }
        );
        setResponseData(data?.un_added_row);
        if (data && data.un_added_row.length > 0) {
            next(); // Move to the next step after successful upload
        }else {
            // Skip the current step if `un_added_row` length is 0
            setCurrentStep(prev => Math.min(prev + 2, steps.length - 1)); 
            refetchData();
        }
    } catch (error) {
        console.error('Upload failed:', error);
    }
};

// const handleUpdateRow = async () => {
//     if (Array.isArray(updatedData)) {
//         updatedData.forEach(item => {
//             store_onboarding({name:item.name,  email: item.email, user_type: item.user_type, contact: item.contact}).unwrap().then(() => {
//                 toast.success('Uploaded '+item.name);
//             }).catch((e) => {
//                 toast.error('Error uploading '+item.name+' data');
//             });
//         }
//     );
//     }
//     next(); 
// };

const handleUpdateRow = async () => {
    if (Array.isArray(updatedData)) {
        // Create an array to store promises for each item
        const uploadPromises = updatedData.map(async (item) => {
            try {
                await toast.promise(
                    store_onboarding({
                        first_name: item.first_name,
                        last_name: item.last_name,
                        email: item.email,
                        user_type: item.user_type,
                        contact: item.contact,
                    }).unwrap(),
                    {
                        loading: 'Uploading data ... of'+ item.name,
                        success: 'data uploaded successfully!'+ item.name,
                        error: 'Failed to upload data of ' + item.name,
                    }
                );
                return { item, success: true };
            } catch (error) {
                return { item, success: false };
            }
        });

            // Wait for all promises to settle
            const results = await Promise.all(uploadPromises);

            // Separate successful and failed items
            const failedItems = results.filter(result => !result.success).map(result => result.item);
            console.log('failedItem', failedItems)
            setResponseData(failedItems);
            setUpdatedData(failedItems)
            if (failedItems.length === 0) {
                next();
                refetchData();
            }
        }
    };
    return (
        <div>
            <h2><b>Import CSV</b></h2>
            <StepComponent handleFile={setFile} existingRows={responseData} handleUpdateRow={setUpdatedData}/>
            <div className="common-table">
                <div className="title-container">
                    <div className="title-item">
                        {/* {currentStep > 0 && (
                            <button className="co-btn" onClick={prev}>
                                Previous
                            </button>
                            ) : currentStep === steps.length - 1 ? (
                           <></>
                        )
                        } */}
                        {currentStep > 0 && currentStep < steps.length - 1 && (
                                <button className="co-btn" onClick={prev}>
                                    Previous
                                </button>
                            )}
                        
                    </div>
                    <div className="title-item">
                        {currentStep === steps.length - 3 ? (
                            <button className="co-btn" onClick={handleUpload}>Upload CSV</button>
                        ) : currentStep === steps.length - 2 ? (
                            <button className="co-btn" onClick={handleUpdateRow}>Update</button>
                        ): currentStep === steps.length - 1 ? (
                            <button className="co-btn" onClick={onClose}>Done</button>
                            
                        ):
                        (
                            <button className="co-btn" onClick={next}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wizard;

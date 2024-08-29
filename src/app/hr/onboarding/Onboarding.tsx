/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useState } from "react";
import PermissionWrapper from "../../layout/PermissionWrapperLayout";
import OnboardingForm from "./components/Form";
import OnboardingCSVForm from "./components/CSVForm";
import OnboardingTable from "./components/Table";
import Modal from "../../general/Modal";
import CSVModal from "./components/CSVModel";

const Onboarding: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isCSVModalOpen, setCSVModalOpen] = useState<boolean>(false);
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const [editingOnboarding, setEditingOnboarding] = useState<any>(null);
    const [importingOnboarding, setImportingOnboarding] = useState<any>(null);


    const openCSVModal = () => {
        setIsModalVisible(true);
    };


    const openModal = (brand: any = null) => {
        setEditingOnboarding(brand);
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalVisible(false);
        setModalOpen(false);
        setCSVModalOpen(false);
        setEditingOnboarding(null);
        setImportingOnboarding(null);
    };

    const refetchData = useCallback(() => {
        setShouldRefetch(true);
        setTimeout(() => setShouldRefetch(false), 100); // Reset refetch flag
    }, []);

    return (
        <>
            <div id="common-list-page">
                <section className="content-section">
                    <div className="custom-container">
                        <div className="section-content">
                            <div className="common-content-box">
                                <div className="common-table">
                                    <div className="title-container">
                                        <div className="title-item">
                                            <div className="common-form type-table">
                                                <div className="fields">
                                                    <div className="form-group-wrapper">
                                                        <div className="form-group type-icon type-left">
                                                            <span className="icon-container">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" placeholder="Search Course" data-ic-filter="search"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="title-item">
                                            <div className="inner-item">
                                                <PermissionWrapper redirect={false} permission="onboarding.view_onboarding">
                                                    <button onClick={() => openCSVModal()} className="co-btn">Import CSV</button>
                                                </PermissionWrapper>
                                                
                                                <PermissionWrapper redirect={false} permission="onboarding.view_onboarding">
                                                    <button onClick={() => openModal(null)} className="co-btn">Send Form</button>
                                                   
                                                </PermissionWrapper>
                                            </div>
                                        </div>
                                    </div>
                                    <OnboardingTable shouldRefetch={shouldRefetch} openModal={openModal}  />
                                    {/* table here  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <Modal isOpen={isCSVModalOpen} onClose={closeModal} title="Onboarding CSV">
                <OnboardingCSVForm  closeModal={closeModal}   refetchData={refetchData} onboarding={importingOnboarding}/>
            </Modal> */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Onboarding">
                <OnboardingForm onboarding={editingOnboarding} closeModal={closeModal} refetchData={refetchData}  />
            </Modal>
            <CSVModal isVisible={isModalVisible} onClose={closeModal}>
                <OnboardingCSVForm  onClose={closeModal}   refetchData={refetchData} onboarding={importingOnboarding}/>
            </CSVModal>

        </>
    )
}

export default Onboarding;
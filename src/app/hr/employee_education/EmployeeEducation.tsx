/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import EmployeeEducationTable from "./component/Table";
import PermissionWrapper from "../../layout/PermissionWrapperLayout";
import EmployeeEducationForm from "./component/Form";
import Modal from "../../general/Modal";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeEducation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state?.employee;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const [editingRenewal, setEditingRenewal] = useState<any>(null);
   
    const openModal = (brand: any = null) => {
        setEditingRenewal(brand);
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setEditingRenewal(null);
    };

    const refetchData = useCallback(() => {
        setShouldRefetch(true);
        setTimeout(() => setShouldRefetch(false), 100); // Reset refetch flag
    }, []);
    const handleEducation = (employee: any) => {
        navigate('/admin/employee-education',  { state: { employee } });
    };

    const handleFamily = (employee: any) => {
        navigate('/admin/employee-family',  { state: { employee } });
    };

    const handleQualification = (employee: any) => {
        navigate('/admin/employee-qualification',  { state: { employee } });
    };
    const handleReference = (employee: any) => {
        navigate('/admin/employee-reference',  { state: { employee } });
    };
    const handleLanguage = (employee: any) => {
        navigate('/admin/employee-language',  { state: { employee } });
    };
    const handleExperience = (employee: any) => {
        navigate('/admin/employee-experience',  { state: { employee } });
    };
    return (
        <>
        <div id="common-list-page">
            <section className="content-section">
            <div className="block-item">
            <button onClick={() => handleEducation(employee)}>Education</button>
            <button onClick={() => handleFamily(employee)}>Family</button>
            <button onClick={() => handleQualification(employee)}>Qualification</button>
            <button onClick={() => handleReference(employee)}>Reference</button>
            <button onClick={() => handleLanguage(employee)}>Language</button>
            <button onClick={() => handleExperience(employee)}>Experience</button>
            </div>
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
                                            <PermissionWrapper redirect={false} permission="employee.change_employeefamily">
                                            <button onClick={() => openModal(null)} className="co-btn">Add Education</button>
                                            </PermissionWrapper>
                                        </div>
                                    </div>
                                </div>
                                <EmployeeEducationTable  shouldRefetch={shouldRefetch} openModal={openModal}  />
                                {/* table here  */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Service Type">
            <EmployeeEducationForm education={editingRenewal} closeModal={closeModal} refetchData={refetchData}  />
        </Modal>
        </>
    )
}

export default EmployeeEducation;
import React, { Component, useCallback, useState } from "react";
import PermissionWrapper from "../../layout/PermissionWrapperLayout";
import RenewalTable from "./components/Table";
import RenewalForm from "./components/Form";
import Modal from "../../general/Modal";

const Renewal: React.FC = () => {

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
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="title-item">
                                        <div className="inner-item">
                                            <PermissionWrapper redirect={false} permission="brands.add_brand">
                                            <button onClick={() => openModal(null)} className="co-btn">Add Renewal</button>
                                            </PermissionWrapper>
                                        </div>
                                    </div>
                                </div>
                                <RenewalTable shouldRefetch={shouldRefetch} openModal={openModal}  />
                                {/* table here  */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Renewal Type">
            <RenewalForm renewal={editingRenewal} closeModal={closeModal} refetchData={refetchData}  />
        </Modal>
        </>
    )
}

export default Renewal;
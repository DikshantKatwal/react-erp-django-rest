import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        const modalElement = document.getElementById("theModal");
        const body = document.body;

        if (modalElement) {
            if (isOpen) {
                modalElement.classList.add("show");
                modalElement.style.display = "block";
                body.classList.add("modal-open");
                const backdrop = document.createElement("div");
                backdrop.className = "modal-backdrop fade show";
                document.body.appendChild(backdrop);
            } else {
                modalElement.classList.remove("show");
                modalElement.style.display = "none";
                body.classList.remove("modal-open");
                const backdrop = document.querySelector(".modal-backdrop");
                if (backdrop) {
                    document.body.removeChild(backdrop);
                }
            }
        }

        return () => {
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                document.body.removeChild(backdrop);
            }
            body.classList.remove("modal-open");
        };
    }, [isOpen]);

    return (
        <div id="theModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} ></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-loading-area">
                            <div className="common-title type-line">
                                <h5>{ title }</h5>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
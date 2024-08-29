// Step2.js

import React, { useState, useCallback } from 'react';

const Step2 = ({ handleFile }) => {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            handleFile(selectedFile); // Notify parent component about the selected file
        }
    }, [handleFile]);

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            handleFile(selectedFile); // Notify parent component about the selected file
        }
    };

    return (
        <div className="common-table">
            <div className="title-container">
                <div className="title-item">
                    <div className="common-form type-table">
                        <h3><b>Drop Your CSV here</b></h3>
                    </div>
                </div>

                <div className="common-form type-table">
                    <div
                        className={`inner-item ${dragging ? 'dragging' : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="fields">
                            <div className="form-group-wrapper">
                                <div className="form-group type-icon type-left">
                                    <div
                                        className={`inner-item ${dragging ? 'dragging' : ''}`}
                                        onDragEnter={handleDragEnter}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <p>{file ? file.name : 'Drop your CSV here'}</p>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={handleFileInputChange}
                                            style={{ display: 'none' }}
                                            id="csv-file-input"
                                        />
                                        <label htmlFor="csv-file-input" className="file-label">
                                            <a>Choose file</a> 
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="title-item">
                    {/* Optional: Additional content */}
                </div>
            </div>
        </div>
    );
};

export default Step2;

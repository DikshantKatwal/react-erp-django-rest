/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    employeeService,
    useStoreMutation,
} from "../../../services/employee/Employee.ts";

import { useNavigate, useParams } from "react-router-dom";

interface EmployeeCreatePasswordProps {
    employee?: any;
    id?: number;
}

const EmployeeCreatePassword: React.FC<EmployeeCreatePasswordProps> = () => {
    const navigate = useNavigate();
    const [update_employee] = useStoreMutation();
    const [employeeData, setEmployeeData] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const [fetchEmployeeForm] = employeeService.useFetchEmployeeFormMutation();
    const [formState, setFormState] = useState({
        id: "",
        onboarding: "",
        email: "",
        name: "",
        last_name: "",
        password: "",
        re_password: "",
    });
    const fetchData = async () => {
        try {
            const response = await fetchEmployeeForm({ uidb64: id });
            setEmployeeData(response.data.data);
        } catch (error) {
            navigate("/api/admin/error");
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (employeeData) {
            setFormState((prevState) => ({
                ...prevState,
                ...employeeData, // Spread the data into the form state
                email: employeeData.email, // Set email specifically if needed
                onboarding: employeeData.onboarding,
                name: employeeData.name,
                last_name: employeeData.last_name,
                id: employeeData.id,
            }));
        }
    }, [employeeData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === "status" ? value === "true" : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            name,
            last_name,
            email,
            onboarding,
            password,
        } = formState;

        const payload = {
            name,
            last_name,
            email,
            onboarding,
            password,
        };
        if (!formState.password) {
            alert("Password cannot be empty");
        } else if (formState.password !== formState.re_password) {
            alert("Passwords do not match");
        } else {
            if (employeeData) {
                update_employee({ id: employeeData.id, ...payload })
                    .unwrap()
                    .then(() => {
                        navigate('/login', { state: { email:  employeeData.email } });
                    })
                    .catch((error) => {
                        if (error && error.data && typeof error.data === "object") {
                            // Loop through the error data and alert each key-value pair
                            for (const [key, value] of Object.entries(error.data)) {
                                alert(`${key}: ${value}`);
                            }
                        } else {
                            // If no specific error data, alert the error message
                            alert("An error occurred");
                        }
                        console.log(error);
                    });
            }
        }

        
    };
    return (
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
                                                <div className="form-group-wrapper">Create a new password,</div>
                                                {formState.name} {formState.last_name}
                                                
                                            </div>
                                            username: {formState.email}
                                        </div>
                                    </div>

                                    <div className="title-item">
                                        <div className="inner-item"></div>
                                    </div>
                                </div>
                                <form id="Renewal_Form" onSubmit={handleSubmit}>
                                    <div className="common-form">
                                        <div className="fields">
                                            <div className="form-group-wrapper">
                                                <div className="form-group-item">
                                                    <div className="form-group half-width">
                                                        <label>Password</label>
                                                        <input
                                                            type="text"
                                                            name="password"
                                                            value={formState.password}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group half-width">
                                                        <label>Re-password</label>
                                                        <input
                                                            type="text"
                                                            name="re_password"
                                                            value={formState.re_password}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-action ">
                                            <input
                                                type="submit"
                                                className="co-btn half-width"
                                                value="Change Password"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmployeeCreatePassword;

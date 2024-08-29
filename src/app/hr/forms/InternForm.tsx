/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { employeeService,  useUpdateMutation} from "../../../services/employee/Employee.ts";

import { useNavigate, useParams} from "react-router-dom";

interface NewEmployeeFormProps {
    employee?: any;
    id?: number;
}

const NewInternForm: React.FC<NewEmployeeFormProps> = () => {
    const navigate = useNavigate();
    const [update_employee] = useUpdateMutation();
    const [employeeData, setEmployeeData] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const [fetchEmployeeForm] = employeeService.useFetchInternFormMutation();
    const [formState, setFormState] = useState({
        id:'',
        name: '',
        last_name: '',
        dob: '',
        pan: '',
        fathername: '',
        mothername: '',
        grandfathername: '',
        startdate: '',
        contact: '',
        email: '',
        province: '',
        district: '',
        municipality: '',
        address: '',
        wardno: '',
        village: '',
        houseno: '',
        accountnumber: '',
        accountholdername: '',
        nameofbank: '',
        bankbranch: '',
        collegename: '',
        course: '',
        onboarding_id: '',
        emergencypersonemail: '',
        emergencypersoncontact: '',
        emergencypersonname: '',
        emergencypersonrelation: '',
        bloodgroup: ''
    });
    const fetchData = async () => {
        try {
            const response = await fetchEmployeeForm({ uidb64: id });
            setEmployeeData(response.data.data);
        } catch (error) {
            navigate('/api/admin/error')
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        
        if (employeeData) {
            setFormState(prevState => ({
                ...prevState,
                ...employeeData, // Spread the data into the form state
                email: employeeData.email, // Set email specifically if needed
                id: employeeData.id 
            }));
        }
    }, [employeeData]);


   


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'status' ? (value === 'true') : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            name,
            last_name,
            dob,
            pan,
            fathername,
            mothername,
            grandfathername,
            startdate,
            contact,
            email,
            province,
            district,
            municipality,
            address,
            wardno,
            village,
            houseno,
            accountnumber,
            accountholdername,
            nameofbank,
            bankbranch,
            collegename,
            course,
            onboarding_id,
            emergencypersonemail,
            emergencypersoncontact,
            emergencypersonname,
            emergencypersonrelation,
            bloodgroup
        } = formState;
        
        const payload = {
            name,
            last_name,
            dob,
            pan,
            fathername,
            mothername,
            grandfathername,
            startdate,
            contact,
            email,
            province,
            district,
            municipality,
            address,
            wardno,
            village,
            houseno,
            accountnumber,
            accountholdername,
            nameofbank,
            bankbranch,
            collegename,
            course,
            onboarding_id,
            emergencypersonemail,
            emergencypersoncontact,
            emergencypersonname,
            emergencypersonrelation,
            bloodgroup
        };

        if (employeeData) {
            update_employee({ id: employeeData.id, ...payload })
                .unwrap()
                .then(() => {
                    navigate('/api/admin/saved')
                })
                .catch((error) => {
                    if (error && error.data && typeof error.data === 'object') {
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
                                            <div className="form-group-wrapper">
                                                Internship Form
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="title-item">
                                    <div className="inner-item">
                                    </div>
                                </div>
                            </div>
                            <form id="Renewal_Form" onSubmit={handleSubmit}>
                            <div className="common-form">
                                <div className="fields">
                                    <div className="form-group-wrapper">
                                        <div className="form-group-item">
                                        <div className="form-group half-width">
                                            <label>First Name:</label>
                                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Last Name:</label>
                                            <input type="text" name="last_name" value={formState.last_name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Date of Birth:</label>
                                            <input type="date" name="dob" value={formState.dob} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>PAN:</label>
                                            <input type="text" name="pan" value={formState.pan} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Father's Name:</label>
                                            <input type="text" name="fathername" value={formState.fathername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Mother's Name:</label>
                                            <input type="text" name="mothername" value={formState.mothername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Grandfather's Name:</label>
                                            <input type="text" name="grandfathername" value={formState.grandfathername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Start Date:</label>
                                            <input type="date" name="startdate" value={formState.startdate} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact:</label>
                                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Email:</label>
                                            <input type="email" name="email" value={formState.email} onChange={handleInputChange}  readOnly/>
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Province:</label>
                                            <input type="text" name="province" value={formState.province} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>District:</label>
                                            <input type="text" name="district" value={formState.district} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Municipality:</label>
                                            <input type="text" name="municipality" value={formState.municipality} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Address:</label>
                                            <input type="text" name="address" value={formState.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Ward No:</label>
                                            <input type="text" name="wardno" value={formState.wardno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Village:</label>
                                            <input type="text" name="village" value={formState.village} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>House No:</label>
                                            <input type="text" name="houseno" value={formState.houseno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>College Name:</label>
                                            <input type="text" name="collegename" value={formState.collegename} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Course:</label>
                                            <input type="text" name="course" value={formState.course} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Email:</label>
                                            <input type="email" name="emergencypersonemail" value={formState.emergencypersonemail} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Contact:</label>
                                            <input type="text" name="emergencypersoncontact" value={formState.emergencypersoncontact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Name:</label>
                                            <input type="text" name="emergencypersonname" value={formState.emergencypersonname} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Relation:</label>
                                            <input type="text" name="emergencypersonrelation" value={formState.emergencypersonrelation} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Blood Group:</label>
                                            <input type="text" name="bloodgroup" value={formState.bloodgroup} onChange={handleInputChange} />
                                        </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-action ">
                                    <input type="submit" className="co-btn half-width" value="Submit" />
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
}

export default NewInternForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation} from "../../../../services/employee/Employee.ts";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface EmployeeFormProps {
    employee?: any;
    id?: number;
}

const EmployeeForm: React.FC<EmployeeFormProps> = () => {
    const location = useLocation();
    const employee = location.state?.employee;
    const navigate = useNavigate();
    const [store_employee] = useStoreMutation();
    const [update_employee] = useUpdateMutation();
    const error = (e: string) => toast.error(e);
    const success = () => toast.success('Updated');
    const [formState, setFormState] = useState({
        name: '',
        last_name: '',
        dob: '',
        gender: '',
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
        bloodgroup: '',
        device_employee_no: null
    });



    useEffect(() => {
        if (employee) {
            setFormState({
                name: employee.name || '',
                last_name: employee.last_name || '',
                dob: employee.dob || '',
                gender: employee.gender||'',
                pan: employee.pan || '',
                fathername: employee.fathername || '',
                mothername: employee.mothername || '',
                grandfathername: employee.grandfathername || '',
                startdate: employee.startdate || '',
                contact: employee.contact || '',
                email: employee.email || '',
                province: employee.province || '',
                district: employee.district || '',
                municipality: employee.municipality || '',
                address: employee.address || '',
                wardno: employee.wardno || '',
                village: employee.village || '',
                houseno: employee.houseno || '',
                accountnumber: employee.accountnumber || '',
                accountholdername: employee.accountholdername || '',
                nameofbank: employee.nameofbank || '',
                bankbranch: employee.bankbranch || '',
                collegename: employee.collegename || '',
                course: employee.course || '',
                onboarding_id: employee.onboarding_id || '',
                emergencypersonemail: employee.emergencypersonemail || '',
                emergencypersoncontact: employee.emergencypersoncontact || '',
                emergencypersonname: employee.emergencypersonname || '',
                emergencypersonrelation: employee.emergencypersonrelation || '',
                bloodgroup: employee.bloodgroup || '',
                device_employee_no: employee.device_employee_no || null,
            });
        } else {
            setFormState({
                name: '',
                last_name: '',
                dob: '',
                gender:'',
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
                bloodgroup: '',
                device_employee_no:null,
            });
        }
    }, [employee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'status' ? (value === 'true') : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const handleError = (errors: any) => {
            for (const key in errors) {
                if (errors[key].length > 0) {
                    console.log(errors[key])
                    error(`${key}: ${errors[key][0]}`);
                }
            }
        };
        const {
            name,
            last_name,
            dob,
            gender,
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
            bloodgroup,
            device_employee_no
        } = formState;
        
        const payload = {
            name,
            last_name,
            dob,
            gender,
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
            bloodgroup,
            device_employee_no
        };

        if (employee) {
            update_employee({ id: employee.id, ...payload })
                .unwrap()
                .then(() => {
                    navigate('/admin/employees')
                    success();
                })
                .catch((e) => {
                    handleError(e.data);
                });
        } else {
            store_employee(payload)
                .unwrap()
                .then(() => {
                    console.log('stored');
                    navigate('/admin/employees')
                    success();
                })
                .catch((e) => {
                    handleError(e.data);
                });
        }
    };
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
                                            <label>First Name</label>
                                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Last Name</label>
                                            <input type="text" name="last_name" value={formState.last_name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Date of Birth</label>
                                            <input type="date" name="dob" value={formState.dob} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                                        <label>Gender</label>
                                                        <select name="gender" value={formState.gender} onChange={handleInputChange} >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Both">Both</option>
                                                        </select>
                                                    </div>
                                                    
                                        <div className="form-group half-width">
                                            <label>PAN</label>
                                            <input type="text" name="pan" value={formState.pan} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Father's Name</label>
                                            <input type="text" name="fathername" value={formState.fathername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Mother's Name</label>
                                            <input type="text" name="mothername" value={formState.mothername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Grandfather's Name</label>
                                            <input type="text" name="grandfathername" value={formState.grandfathername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Start Date</label>
                                            <input type="date" name="startdate" value={formState.startdate} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Contact</label>
                                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Email</label>
                                            <input type="email" name="email" value={formState.email} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Province</label>
                                            <input type="text" name="province" value={formState.province} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>District</label>
                                            <input type="text" name="district" value={formState.district} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Municipality</label>
                                            <input type="text" name="municipality" value={formState.municipality} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Address</label>
                                            <input type="text" name="address" value={formState.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Ward No</label>
                                            <input type="number" name="wardno" value={formState.wardno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Village</label>
                                            <input type="text" name="village" value={formState.village} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>House No</label>
                                            <input type="text" name="houseno" value={formState.houseno} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Account Number</label>
                                            <input type="text" name="accountnumber" value={formState.accountnumber} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Account Holder Name</label>
                                            <input type="text" name="accountholdername" value={formState.accountholdername} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Name of Bank</label>
                                            <input type="text" name="nameofbank" value={formState.nameofbank} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Bank Branch</label>
                                            <input type="text" name="bankbranch" value={formState.bankbranch} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>College Name</label>
                                            <input type="text" name="collegename" value={formState.collegename} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Course</label>
                                            <input type="text" name="course" value={formState.course} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Email</label>
                                            <input type="email" name="emergencypersonemail" value={formState.emergencypersonemail} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Contact</label>
                                            <input type="text" name="emergencypersoncontact" value={formState.emergencypersoncontact} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Name</label>
                                            <input type="text" name="emergencypersonname" value={formState.emergencypersonname} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Emergency Person Relation</label>
                                            <input type="text" name="emergencypersonrelation" value={formState.emergencypersonrelation} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group half-width">
                                            <label>Blood Group</label>
                                            <input type="text" name="bloodgroup" value={formState.bloodgroup} onChange={handleInputChange} />
                                        </div>
                                        <PermissionWrapper
                                            redirect={false}
                                            permission="employee_leave.delete_employeeleave"
                                        >
                                        <div className="form-group half-width">
                                            <label>Employee Device ID</label>
                                            <input type="number" name="device_employee_no" value={formState.device_employee_no} onChange={handleInputChange} />
                                        </div>
                                        </PermissionWrapper>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-action">
                                    <input type="submit" className="co-btn type-full" value="Submit" />
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

export default EmployeeForm;

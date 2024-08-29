/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { vendorService } from "../../../services/vendor/Vendor.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface EditVendorFormProps {
  vendor?: any;
  id?: number;
}

const EditVendorForm: React.FC<EditVendorFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vendor = location.state?.vendor;
  const [store_vendor] = vendorService.useStoreMutation();
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    Nameofbank: '',
    BankBranch: '',
    AccountNo: '',
    CompanyName: '',
    email: '',
    ContactPerson: '',
    PAN: '',
    contact: '',
    Address: '',
  });

  useEffect(() => {
    if (vendor) {
      setFormState({
        id: vendor.id || '',
        name: vendor.name || '',
        Nameofbank: vendor.Nameofbank || '',
        BankBranch: vendor.BankBranch || '',
        AccountNo: vendor.AccountNo || '',
        CompanyName: vendor.CompanyName || '',
        email: vendor.email || '',
        ContactPerson: vendor.ContactPerson || '',
        PAN: vendor.PAN || '',
        contact: vendor.contact || '',
        Address: vendor.Address || '',
      });
    } else {
      setFormState({
        id: '',
        name: '',
        Nameofbank: '',
        BankBranch: '',
        AccountNo: '',
        CompanyName: '',
        email: '',
        ContactPerson: '',
        PAN: '',
        contact: '',
        Address: '',
      });
    }
  }, [vendor]);

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
      id,
      name,
      Nameofbank,
      BankBranch,
      AccountNo,
      CompanyName,
      email,
      ContactPerson,
      PAN,
      contact,
      Address,
    } = formState;

    const payload = {
      id,
      name,
      Nameofbank,
      BankBranch,
      AccountNo,
      CompanyName,
      email,
      ContactPerson,
      PAN,
      contact,
      Address,
    };

    store_vendor(payload)
      .unwrap()
      .then(() => {
        navigate('/admin/onboarding')
      })
      .catch((error) => {
        if (error && error.data && typeof error.data === 'object') {
          for (const [key, value] of Object.entries(error.data)) {
            alert(`${key}: ${value}`);
          }
        } else {
          alert("An error occurred");
        }
        console.log(error);
      });
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
                          Vendor Form
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
                            <label>Name</label>
                            <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Contact Person</label>
                            <input type="text" name="ContactPerson" value={formState.ContactPerson} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Contact</label>
                            <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>PAN</label>
                            <input type="text" name="PAN" value={formState.PAN} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Address</label>
                            <input type="text" name="Address" value={formState.Address} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Email</label>
                            <input type="text" name="email" value={formState.email} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Company Name</label>
                            <input type="text" name="CompanyName" value={formState.CompanyName} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Name of Bank</label>
                            <input type="text" name="Nameofbank" value={formState.Nameofbank} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Bank Branch</label>
                            <input type="text" name="BankBranch" value={formState.BankBranch} onChange={handleInputChange} />
                          </div>
                          <div className="form-group half-width">
                            <label>Account No</label>
                            <input type="text" name="AccountNo" value={formState.AccountNo} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-action">
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

export default EditVendorForm;
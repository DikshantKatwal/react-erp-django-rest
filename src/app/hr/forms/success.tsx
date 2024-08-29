/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation } from 'react-router-dom';
import { employeeService } from "../../../services/employee/Employee";

interface NewEmployeeFormProps {
  employee?: any;
  id?: number;
}

const SuccessPage: React.FC<NewEmployeeFormProps> = () => {
  const location = useLocation();
  const { employeeData } = location.state || {};
  const [rensendAPI, { error, isLoading }] = employeeService.useResendMutation();

  const resend = (employeeData: any) => {
    const { email } = employeeData;
    const { id } = employeeData;
    rensendAPI({
      email,id
    })
      .then((response: any) => {
        // handle success response
      })
      .catch((error: any) => {
        console.error("Failed to fetch employee attendance", error);
      });
  }
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
                        <div className="form-group-wrapper">Success Page</div>
                        {employeeData && (
                          <div>
                            An email on {employeeData.email} has been sent to you for login details :)  
                            <a onClick={() => resend(employeeData)}>Resend?</a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="title-item">
                    <div className="inner-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessPage;

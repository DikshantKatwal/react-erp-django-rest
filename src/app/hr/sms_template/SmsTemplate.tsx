/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { templateService } from "../../../services/template/Template";
import { fetchSms } from "../../../slices/smsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";

interface SMSProps {
    sms: any;
}

const SMSTemplate: React.FC<SMSProps> = () => {
  const navigate = useNavigate();
  const [fetchSMSTemplatesApi] = templateService.useFetch_sms_templateMutation();
  const { sms } = useAppSelector((state: RootState) => state.smsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchSMSTemplatesApi({})
      .unwrap()
      .then((data) => {
        dispatch(fetchSms(data));
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      });
  }, [dispatch, fetchSMSTemplatesApi]);
  const handleEdit = (template:any)=>{
    navigate(`/admin/templates/sms/edit/${ template.id }`, { state: { template } })
  }
  return (
    <>
     <div id="common-list-page">
            <section className="content-section">
                <div className="custom-container">
                    <div className="section-content">
                        <div className="common-content-box">
                          {sms === null ? (
                              <div className="common-table">
                                  <div className="title-container">
                                        <div className="title-item">
                                            Loading
                                        </div>
                                    </div>
                              </div>
                          ): sms.data && sms.data.length > 0 ? (
                            <div className="row">
                              {sms.data.map((template: any, index: number) => (
                              <div className="col-md-4" onClick={() => handleEdit(template)}>
                                <div className="common-table">
                                    <div className="title-container">
                                        <div className="title-item">
                                            
                                        </div>
                                    </div>
                                    <h3>{ template.template_name }</h3>
                                    <p>Template for { template.template_name }</p>
                                  </div>
                              </div>
                              ))}
                            </div>
                            ) : (
                              <div className="common-table">
                                  <div className="title-container">
                                        <div className="title-item">
                                            No Templates Available
                                        </div>
                                    </div>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
  );
};

export default SMSTemplate;
import { useEffect} from "react";
import { templateService } from "../../../services/template/Template";
import { fetchTemplate } from "../../../slices/templateSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";

interface TemplateProp {
  templates: [];
}

const Template: React.FC<TemplateProp> = () => {
  const navigate = useNavigate();
  const [fetchTemplatesApi] = templateService.useFetch_templateMutation();
  const { templates } = useAppSelector((state: RootState) => state.templateSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Trigger the fetchTemplatesApi mutation when the component mounts
    fetchTemplatesApi({})
      .unwrap()
      .then((data) => {
        dispatch(fetchTemplate(data));
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      });
  }, [dispatch, fetchTemplatesApi]);
  const handleEdit = (template:any)=>{
    navigate(`/admin/templates/email/edit/${ template.id }`, { state: { template } })
  }
  return (
    <>
     <div id="common-list-page">
            <section className="content-section">
                <div className="custom-container">
                    <div className="section-content">
                        <div className="common-content-box">
                          {templates === null ? (
                              <div className="common-table">
                                  <div className="title-container">
                                        <div className="title-item">
                                            Loading
                                        </div>
                                    </div>
                              </div>
                          ): templates.data && templates.data.length > 0 ? (
                            <div className="row">
                              {templates.data.map((template: any, index: number) => (
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

export default Template;
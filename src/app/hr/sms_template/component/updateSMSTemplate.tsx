import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdate_templateMutation } from "../../../../services/template/Template";


interface GeneralInterface{
  id?: number;
  template_id?:number;
  available_var?: JSON;
  template_name?: string;
  body?: string;
}

const UpdateSMSTemplate: React.FC<GeneralInterface> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const template = location.state?.template;

  const [update_template] = useUpdate_templateMutation();

  const [content, setContent] = useState('');
  const [availablevar, setAvailableVar] = useState('');
  
  useEffect(() => {
    if (template) {
        setContent(template.body)
      setAvailableVar(template.available_var)
    }
  }, [template]);



  const updateBody = (e: React.FormEvent) =>  {
    e.preventDefault();
    if (template) {
        update_template({ id: template.id, body: content }).unwrap().then(() => {
            navigate('/admin/templates/sms')
        }).catch(() => {
            // Handle login failure if necessary
        });
    }
};
const handleChange = (event) => {
    setContent(event.target.value);
  };


  return (
    
    <>
    <button onClick={updateBody}>Save</button>
          <textarea
            value={content}
            onChange={handleChange}
            style={{ width: '100%', height: '500px', marginTop: '20px', fontFamily: 'monospace' }}
          />
    <h2>Available Variables</h2>
    <ul>
        {Object.keys(availablevar).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {availablevar[key]}
          </li>
        ))}
      </ul>
    </>
  );
}


export default UpdateSMSTemplate;
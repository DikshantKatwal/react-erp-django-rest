import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton, Paper, Typography, Box } from '@mui/material';
import { useUpdate_templateMutation } from "../../../../services/template/Template";


interface GeneralInterface{
  id?: number;
  template_id?:number;
  available_var?: JSON;
  template_name?: string;
  body?: string;
}

const UpdateTemplate: React.FC<GeneralInterface> = () => {
  const location = useLocation();
  const template = location.state?.template;
  const navigate = useNavigate();

  const [update_template] = useUpdate_templateMutation();

  const [htmlContent, setHtmlContent] = useState('');
  const [view, setView] = useState('preview');
  const [availablevar, setAvailableVar] = useState('');
  
  useEffect(() => {
    if (template) {
      setHtmlContent(template.body)
      setAvailableVar(template.available_var)
    }
  }, [template]);


  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const updateBody = (e: React.FormEvent) =>  {
    e.preventDefault();
    if (template) {
        update_template({ id: template.id, body: htmlContent }).unwrap().then(() => {
            handleViewChange();
        }).catch(() => {
            // Handle login failure if necessary
        });
    }
};


  return (
    
    <>
    
    <Box p={2}>
    <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5">Editor</Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
        >
          <ToggleButton value="code" aria-label="code">
            HTML
            
          </ToggleButton>
          <ToggleButton value="preview" aria-label="preview">
            Quick preview
          </ToggleButton>
        </ToggleButtonGroup>

        {view === 'code' ? (
          <>
          <button onClick={updateBody}>Save</button>
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            style={{ width: '100%', height: '500px', marginTop: '20px', fontFamily: 'monospace' }}
          />
          
          </>
        ) : (
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ marginTop: '20px' }}
          />
        )}
      </Paper>
    </Box>
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


export default UpdateTemplate;
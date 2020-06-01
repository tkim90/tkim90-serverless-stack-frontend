import React, { useRef, useState } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';

import config from '../config';
import { s3Upload } from '../libs/awsLib';
import { LoaderButton } from '../components/LoaderButton';
import { onError } from '../libs/errorLibs';
import './NewNote.css';

export const NewNote = () => {
  const file = useRef(null);
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validateForm = () => {
    return content.length > 0;
  }

  const createNode = note => {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  const handleFileChange = e => {
    file.current = e.target.files[0];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (file.current && file.currentsize > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return ;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNode({ content, attachment });
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  )
}

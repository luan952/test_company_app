
import React from "react";
import api from '../../api/axios';
import ResponsiveAppBar from "../../components/navBar";
import { Body, Container } from "./style";
import Button from '@mui/material/Button';
import { UploadController } from './../../controllers/UploadController';

export function Upload() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      setFile(fileUploaded);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      try {
        UploadController.upload(formData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        //clear file input
        setFile(null);
      }
    }
  };

  return (
    <Body>
      <ResponsiveAppBar />
      <Container>
        <input type="file" onChange={handleFileChange} className="input" />
        <Button variant="contained" className="button"
          onClick={handleUpload}
        >
          Upload
        </Button>
        {loading && <p>Loading...</p>}
        {file && <p>{file.name}</p>}
        {error && <p>Failed to upload</p>}
      </Container>
    </Body>



  );
}
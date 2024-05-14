 "use client"
import React, { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Layout from './Layout';
import { Container, Checkbox, Label, Form } from 'semantic-ui-react';

const FileUpload = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSuccess = (result) => {
        console.log('Successfully uploaded:', result);
        if (result.info && result.info.url) {
            setImageUrl(result.info.url);
        }
    };

    const handleError = (error) => {
        console.error('Upload failed:', error);
        setError(error.statusText || "An unexpected error occurred");
    };

    return ( 
    
      <Container>
        <div>
        <label>
                <input
                   
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                  I agree to the terms and conditions
            </label>
            
            { isChecked && (
              <Form>
              <Label pointing='right'> Please Upload your Accreditation Document </Label>
            <CldUploadButton 
               style={{marginLeft:"10px", padding:"10px", backgroundColor:"teal", color:"white", border: 'none', borderRadius:"3px"}} 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleSuccess}
                onError={handleError}
            />
            </Form>
     )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={imageUrl} alt="Uploaded Content"
style={{ maxWidth: '100%', marginTop: '20px' }} />
                    <p>Image URL: <a href={imageUrl} target="_blank"
rel="noopener noreferrer">{imageUrl}</a></p>


                </div>
            )}
        </div>
        </Container>
        

    );
};

export default FileUpload;
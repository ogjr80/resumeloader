'use client'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AlertCircle, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ResumeForm from './ResumeForm';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

    if (allowedTypes.includes(uploadedFile.type)) {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Please upload a PDF, DOCX, or TXT file.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/parse-resume', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to parse resume');
        }

        const data = await response.json();
        setParsedData(data);
      } catch (error) {
        setError('Error parsing resume. Please try again.');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveResume = async (formData) => {
    try {
      const response = await fetch('/api/save-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume data');
      }

      alert('Resume data saved successfully!');
    } catch (error) {
      setError('Error saving resume data. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? 'Drop the file here' : 'Drag & drop a resume file, or click to select'}
        </p>
        <p className="mt-1 text-xs text-gray-500">Supported formats: PDF, DOCX, TXT</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
          <Button onClick={handleUpload} className="mt-2" disabled={isLoading}>
            {isLoading ? 'Parsing...' : 'Parse Resume'}
          </Button>
        </div>
      )}

      {parsedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Parsed Resume Data</h3>
          <ResumeForm initialData={parsedData} onSubmit={handleSaveResume} />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
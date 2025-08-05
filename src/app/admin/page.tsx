'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

export default function AdminDashboardPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('Please upload a valid spreadsheet file (.xlsx, .xls, .csv)');
      return;
    }
    
    setUploadStatus(`Uploading ${file.name}...`);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus(`${file.name} uploaded successfully!`);
      setTimeout(() => setUploadStatus(''), 3000);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-8 text-center">
          Admin Panel
        </h1>
        
        <div className="bg-card-bg rounded-lg shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Data Management
            </h2>
            <p className="text-charcoal-light">
              Upload spreadsheets or data files to manage competition data
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200
              ${isDragOver 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <DocumentArrowUpIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            
            <h3 className="text-lg font-medium text-charcoal mb-2">
              Upload Data Files
            </h3>
            
            <p className="text-charcoal-light mb-6">
              Drag and drop your spreadsheet here, or click to browse
            </p>
            
            <div className="space-y-4">
              <label className="inline-block">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <span className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 cursor-pointer">
                  <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                  Upload Data
                </span>
              </label>
              
              <p className="text-sm text-charcoal-light">
                Supported formats: .xlsx, .xls, .csv (Max size: 10MB)
              </p>
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div className={`
              mt-6 p-4 rounded-lg text-center
              ${uploadStatus.includes('successfully') 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : uploadStatus.includes('Please') 
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
              }
            `}>
              {uploadStatus}
            </div>
          )}

          {/* File Guidelines */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-charcoal mb-3">File Guidelines:</h4>
            <ul className="text-sm text-charcoal-light space-y-1">
              <li>• Ensure your spreadsheet has proper column headers</li>
              <li>• Include all required fields (Name, Group, Category, Institution)</li>
              <li>• Remove any empty rows or columns</li>
              <li>• Save as .xlsx, .xls, or .csv format</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

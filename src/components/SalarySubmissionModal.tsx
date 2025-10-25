"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import SalaryForm from "./SalaryForm";

interface SalaryData {
  company_name: string;
  designation: string;
  location: string;
  yoe: number;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
  reports: number;
  role?: string;
  university?: string;
  employment_type?: string;
  duration?: string;
  year?: number;
  stipend_min?: number;
  stipend_max?: number;
  stipend_avg?: number;
}

interface SalarySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageType: 'fulltime' | 'internship' | 'university';
}

const SalarySubmissionModal: React.FC<SalarySubmissionModalProps> = ({
  isOpen,
  onClose,
  pageType
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data: SalaryData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission (dummy)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted with data:', data);
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    switch (pageType) {
      case 'fulltime':
        return 'Add Your Salary Data';
      case 'internship':
        return 'Add Your Internship Stipend';
      case 'university':
        return 'Add Your University Data';
    }
  };

  const getModalDescription = () => {
    switch (pageType) {
      case 'fulltime':
        return 'Share your full-time compensation details to help others make informed career decisions.';
      case 'internship':
        return 'Share your internship stipend details to help students find the best opportunities.';
      case 'university':
        return 'Share your university and salary data to help others understand salary trends.';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {getModalTitle()}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {getModalDescription()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your form has been submitted successfully. Thank you for your contribution!
              </p>
            </div>
          ) : (
            <SalaryForm
              pageType={pageType}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalarySubmissionModal;

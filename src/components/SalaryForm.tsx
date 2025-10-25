"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface SalaryData {
  company_name: string;
  designation: string;
  location: string;
  yoe: number;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
  reports: number;
  currency?: string;
  // Additional fields for different page types
  role?: string;
  university?: string;
  employment_type?: string;
  duration?: string;
  year?: number;
  stipend_min?: number;
  stipend_max?: number;
  stipend_avg?: number;
}

interface SalaryFormProps {
  initialData?: Partial<SalaryData>;
  pageType: 'fulltime' | 'internship' | 'university';
  onSubmit: (data: SalaryData) => Promise<void>;
  isSubmitting: boolean;
}

const SalaryForm: React.FC<SalaryFormProps> = ({
  initialData,
  pageType,
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = useState<Partial<SalaryData>>({
    company_name: '',
    designation: '',
    location: '',
    yoe: 0,
    min_salary: 0,
    max_salary: 0,
    avg_salary: 0,
    reports: 1,
    currency: 'INR',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // No longer need to calculate average from min/max

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_name?.trim()) {
      newErrors.company_name = 'Company name is required';
    }
    if (!formData.designation?.trim()) {
      newErrors.designation = 'Designation is required';
    }
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.avg_salary || formData.avg_salary <= 0) {
      newErrors.avg_salary = `${pageType === 'internship' ? 'Total stipend' : 'Total compensation'} is required`;
    }

    // Page-specific validations
    if (pageType === 'internship') {
      if (!formData.duration?.trim()) {
        newErrors.duration = 'Duration is required for internships';
      }
      if (!formData.university?.trim()) {
        newErrors.university = 'University is required for internships';
      }
    }

    if (pageType === 'university') {
      if (!formData.university?.trim()) {
        newErrors.university = 'University is required';
      }
      if (!formData.employment_type?.trim()) {
        newErrors.employment_type = 'Employment type is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData as SalaryData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof SalaryData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={formData.company_name || ''}
          onChange={(e) => handleInputChange('company_name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.company_name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter company name"
        />
        {errors.company_name && (
          <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
        )}
      </div>

      {/* Designation/Role */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {pageType === 'internship' ? 'Role' : 'Designation'} *
        </label>
        <input
          type="text"
          value={formData.designation || ''}
          onChange={(e) => handleInputChange('designation', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.designation ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={pageType === 'internship' ? 'e.g., Software Engineering Intern' : 'e.g., Software Engineer'}
        />
        {errors.designation && (
          <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Bengaluru, IN"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      {/* Years of Experience (for full-time) */}
      {pageType === 'fulltime' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            value={formData.yoe || ''}
            onChange={(e) => handleInputChange('yoe', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="0"
            min="0"
          />
        </div>
      )}

      {/* University (for internship and university pages) */}
      {(pageType === 'internship' || pageType === 'university') && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            University *
          </label>
          <input
            type="text"
            value={formData.university || ''}
            onChange={(e) => handleInputChange('university', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
              errors.university ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., IIT Delhi, BITS Pilani"
          />
          {errors.university && (
            <p className="text-red-500 text-sm mt-1">{errors.university}</p>
          )}
        </div>
      )}

      {/* Employment Type (for university page) */}
      {pageType === 'university' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employment Type *
          </label>
          <select
            value={formData.employment_type || ''}
            onChange={(e) => handleInputChange('employment_type', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
              errors.employment_type ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select employment type</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
          </select>
          {errors.employment_type && (
            <p className="text-red-500 text-sm mt-1">{errors.employment_type}</p>
          )}
        </div>
      )}

      {/* Duration (for internship page) */}
      {pageType === 'internship' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Duration *
          </label>
          <select
            value={formData.duration || ''}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select duration</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="12 months">12 months</option>
          </select>
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>
      )}

      {/* Total Compensation */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {pageType === 'internship' ? 'Total Stipend' : 'Total Compensation'} *
        </label>
        <input
          type="number"
          value={formData.avg_salary || ''}
          onChange={(e) => handleInputChange('avg_salary', parseInt(e.target.value) || 0)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.avg_salary ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0"
          min="0"
        />
        {errors.avg_salary && (
          <p className="text-red-500 text-sm mt-1">{errors.avg_salary}</p>
        )}
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Currency *
        </label>
        <select
          value={formData.currency || 'INR'}
          onChange={(e) => handleInputChange('currency', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="INR">Indian Rupee (₹)</option>
          <option value="USD">US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="GBP">British Pound (£)</option>
          <option value="CAD">Canadian Dollar (C$)</option>
          <option value="AUD">Australian Dollar (A$)</option>
          <option value="SGD">Singapore Dollar (S$)</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          onClick={() => window.history.back()}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Data'}
        </Button>
      </div>
    </form>
  );
};

export default SalaryForm;

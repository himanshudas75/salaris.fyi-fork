"use client";

import React from "react";
import Button from "./Button";

interface SalarySubmissionCardProps {
  onAddSalary: () => void;
  pageType: 'fulltime' | 'internship' | 'university';
}

const SalarySubmissionCard: React.FC<SalarySubmissionCardProps> = ({
  onAddSalary,
  pageType
}) => {
  const getCardContent = () => {
    switch (pageType) {
      case 'fulltime':
        return {
          title: "Share Your Full-time Salary Data",
          description: "Help others negotiate better by sharing your compensation details",
          icon: "💼",
          buttonText: "Add Salary Data"
        };
      case 'internship':
        return {
          title: "Share Your Internship Stipend Data",
          description: "Help students find the best internship opportunities",
          icon: "🎓",
          buttonText: "Add Stipend Data"
        };
      case 'university':
        return {
          title: "Share Your University Data",
          description: "Help others understand salary trends by university",
          icon: "🏫",
          buttonText: "Add University Data"
        };
    }
  };

  const content = getCardContent();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{content.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600">
                {content.description}
              </p>
            </div>
          </div>
          <Button
            onClick={onAddSalary}
            className="w-full sm:w-auto"
          >
            {content.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalarySubmissionCard;

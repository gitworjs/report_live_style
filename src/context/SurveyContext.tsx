import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { FormData } from '../types';

interface SurveyContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleCheckbox: (field: string, value: string) => void;
  resetSurvey: () => void;
}

const STORAGE_KEY = 'survey_form_data';

const initialData: FormData = {
  email: '',
  priority: '',
  source: [],
  deliveryRatio: 50,
  soulFood: '',
  convQuality: '',
  happyMoment: '',
  communityIntent: '',
  restNeeds: '',
  mentoring: ''
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or use initialData
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved survey data', e);
        return initialData;
      }
    }
    return initialData;
  });

  // Persist to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleCheckbox = useCallback((field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(i => i !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  }, []);

  const resetSurvey = useCallback(() => {
    setFormData(initialData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SurveyContext.Provider value={{ formData, setFormData, handleCheckbox, resetSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

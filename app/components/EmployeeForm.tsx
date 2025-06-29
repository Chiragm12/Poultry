"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  age: string;
  salary: string;
  workEmployedToDo: string;
  aadharNumber: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
}

interface ApiError {
  error: string;
}

interface ApiSuccess {
  message: string;
  employee: {
    id: string;
    full_name: string;
    age: number;
    created_at: string;
  };
}

const EmployeeForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    salary: '',
    workEmployedToDo: '',
    aadharNumber: '',
    phoneNumber: '',
    gender: '',
    maritalStatus: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Age validation
    const ageNum = parseInt(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    // Salary validation
    const salaryNum = parseFloat(formData.salary);
    if (!formData.salary || isNaN(salaryNum) || salaryNum <= 0) {
      newErrors.salary = 'Please enter a valid salary greater than 0';
    }

    // Work description validation
    if (!formData.workEmployedToDo.trim()) {
      newErrors.workEmployedToDo = 'Work description is required';
    } else if (formData.workEmployedToDo.trim().length < 10) {
      newErrors.workEmployedToDo = 'Work description must be at least 10 characters';
    }

    // Aadhar validation
    if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be exactly 12 digits';
    }

    // Phone validation
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    // Marital status validation
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Please select marital status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiError | ApiSuccess = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const successData = data as ApiSuccess;
      toast.success(successData.message || "Employee registration completed successfully");
      
      // Reset form on success
      setFormData({
        fullName: '',
        age: '',
        salary: '',
        workEmployedToDo: '',
        aadharNumber: '',
        phoneNumber: '',
        gender: '',
        maritalStatus: ''
      });
      
      // Clear any remaining errors
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle specific error messages from the server
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      
      // Show specific error message for duplicate Aadhar
      if (errorMessage.includes('Aadhar number already exists')) {
        setErrors({ aadharNumber: 'This Aadhar number is already registered' });
        toast.error('An employee with this Aadhar number already exists');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Employee Registration Form</CardTitle>
          <CardDescription className="text-center text-blue-100">
            Please fill in all the required information below
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`transition-colors ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                maxLength={100}
              />
              {errors.fullName && <p className="text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {errors.fullName}
              </p>}
            </div>

            {/* Age and Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  className={`transition-colors ${errors.age ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.age && <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.age}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-semibold text-gray-700">
                  Salary (₹) *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="Enter salary amount"
                  min="1"
                  step="1"
                  className={`transition-colors ${errors.salary ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.salary && <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.salary}
                </p>}
              </div>
            </div>

            {/* Work Description */}
            <div className="space-y-2">
              <Label htmlFor="workEmployedToDo" className="text-sm font-semibold text-gray-700">
                Work/Job Description *
              </Label>
              <Textarea
                id="workEmployedToDo"
                value={formData.workEmployedToDo}
                onChange={(e) => handleInputChange('workEmployedToDo', e.target.value)}
                placeholder="Describe the work you are employed to do (minimum 10 characters)"
                rows={4}
                maxLength={500}
                className={`transition-colors resize-none ${errors.workEmployedToDo ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
              />
              <div className="flex justify-between items-center">
                {errors.workEmployedToDo && <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.workEmployedToDo}
                </p>}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.workEmployedToDo.length}/500 characters
                </p>
              </div>
            </div>

            {/* Aadhar and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="aadharNumber" className="text-sm font-semibold text-gray-700">
                  Aadhar Card Number *
                </Label>
                <Input
                  id="aadharNumber"
                  type="text"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                  className={`transition-colors font-mono ${errors.aadharNumber ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.aadharNumber && <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.aadharNumber}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  className={`transition-colors font-mono ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.phoneNumber}
                </p>}
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex flex-row space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer">Other</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {errors.gender}
              </p>}
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Marital Status *</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                <SelectTrigger className={`transition-colors ${errors.maritalStatus ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="has-family">Has Family (Unmarried)</SelectItem>
                </SelectContent>
              </Select>
              {errors.maritalStatus && <p className="text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {errors.maritalStatus}
              </p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 py-3 text-lg font-semibold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeForm;
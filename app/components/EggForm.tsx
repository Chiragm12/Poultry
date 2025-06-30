"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EggFormData {
  crack_eggs: number;
  jumbo_eggs: number;
  normal_eggs: number;
}

const EggForm = () => {
  const [formData, setFormData] = useState<EggFormData>({
    crack_eggs: 0,
    jumbo_eggs: 0,
    normal_eggs: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof EggFormData, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/eggs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save egg data');
      }

      toast.success("Egg inventory data saved successfully!");
      
      // Reset form
      setFormData({
        crack_eggs: 0,
        jumbo_eggs: 0,
        normal_eggs: 0,
      });
      
    } catch (error) {
      console.error('Error submitting egg data:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save egg data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalEggs = formData.crack_eggs + formData.jumbo_eggs + formData.normal_eggs;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Egg Inventory Form</CardTitle>
        <CardDescription>
          Enter the number of different types of eggs. Total will be calculated automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="crack_eggs">Crack Eggs</Label>
              <Input
                id="crack_eggs"
                type="number"
                min="0"
                value={formData.crack_eggs}
                onChange={(e) => handleInputChange('crack_eggs', e.target.value)}
                className="text-center"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jumbo_eggs">Jumbo Eggs</Label>
              <Input
                id="jumbo_eggs"
                type="number"
                min="0"
                value={formData.jumbo_eggs}
                onChange={(e) => handleInputChange('jumbo_eggs', e.target.value)}
                className="text-center"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="normal_eggs">Normal Eggs</Label>
              <Input
                id="normal_eggs"
                type="number"
                min="0"
                value={formData.normal_eggs}
                onChange={(e) => handleInputChange('normal_eggs', e.target.value)}
                className="text-center"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-center">
              <span className="text-lg font-semibold text-blue-800">
                Total Eggs: {totalEggs}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Egg Inventory'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EggForm;
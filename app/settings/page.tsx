import React from "react";
import { Toaster } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your poultry farm management system</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Farm Information */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Information</CardTitle>
              <CardDescription>Basic farm details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" placeholder="Enter farm name" />
              </div>
              <div>
                <Label htmlFor="farmAddress">Farm Address</Label>
                <Input id="farmAddress" placeholder="Enter farm address" />
              </div>
              <div>
                <Label htmlFor="farmPhone">Contact Phone</Label>
                <Input id="farmPhone" placeholder="Enter contact phone" />
              </div>
              <div>
                <Label htmlFor="farmEmail">Contact Email</Label>
                <Input id="farmEmail" type="email" placeholder="Enter contact email" />
              </div>
              <Button className="w-full">Save Farm Information</Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Application preferences and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select id="timezone" className="w-full p-2 border rounded-md">
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="IST">Indian Standard Time</option>
                </select>
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select id="currency" className="w-full p-2 border rounded-md">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <select id="language" className="w-full p-2 border rounded-md">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <Button className="w-full">Save System Settings</Button>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Backup, export, and data operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Export Data</Button>
              <Button variant="outline" className="w-full">Import Data</Button>
              <Button variant="outline" className="w-full">Backup Database</Button>
              <Button variant="destructive" className="w-full">Clear All Data</Button>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button className="w-full">Change Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 
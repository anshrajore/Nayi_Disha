
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { Plus, X, MapPin, Calendar, BriefcaseIcon, Banknote, Map } from 'lucide-react';

const ProfileJobPreferences = () => {
  const [jobRoles, setJobRoles] = React.useState([
    'Electrician', 
    'Maintenance Technician', 
    'Electrical Supervisor'
  ]);
  
  const [newRole, setNewRole] = React.useState('');
  const [salaryRange, setSalaryRange] = React.useState([15000, 25000]);
  
  const addJobRole = () => {
    if (newRole.trim() && !jobRoles.includes(newRole.trim())) {
      setJobRoles([...jobRoles, newRole.trim()]);
      setNewRole('');
      
      toast({
        description: "Job role added successfully"
      });
    }
  };
  
  const removeJobRole = (roleToRemove) => {
    setJobRoles(jobRoles.filter(role => role !== roleToRemove));
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your job preferences have been updated successfully."
    });
  };
  
  return (
    <Card className="border-2 border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Job Preferences</CardTitle>
        <CardDescription>Tell us what you're looking for</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="job-roles">Preferred Job Roles</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs text-nayidisha-blue"
                onClick={addJobRole}
              >
                <Plus className="h-3 w-3 mr-1" /> Add More
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {jobRoles.map((role) => (
                <Badge key={role} className="px-3 py-1 flex items-center gap-1">
                  {role}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeJobRole(role)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a job role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addJobRole}>Add</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="job-type" className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                Job Type
              </Label>
              <Select defaultValue="full-time">
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="daily-wage">Daily Wage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Availability
              </Label>
              <Select defaultValue="immediate">
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-week">Within 1 week</SelectItem>
                  <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="2-months">Within 2 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              Expected Salary Range (₹ per month)
            </Label>
            <div className="pt-4 pb-2 px-2">
              <Slider 
                defaultValue={[15000, 25000]} 
                min={5000} 
                max={100000} 
                step={1000}
                value={salaryRange}
                onValueChange={setSalaryRange}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>₹{salaryRange[0].toLocaleString()}</span>
              <span>₹{salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="work-location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Preferred Work Locations
            </Label>
            <div className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="Enter city" defaultValue="New Delhi" />
                <Input placeholder="Enter area or locality" />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <Label className="flex items-center gap-1 cursor-pointer">
                <Map className="h-4 w-4 text-muted-foreground" />
                Use current location
              </Label>
              <Button variant="outline" size="sm">Detect Location</Button>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Additional Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="night-shift" className="cursor-pointer">
                  Willing to work night shifts
                </Label>
                <Switch id="night-shift" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="relocate" className="cursor-pointer">
                  Willing to relocate for the right opportunity
                </Label>
                <Switch id="relocate" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="travel" className="cursor-pointer">
                  Comfortable with traveling/commuting long distances
                </Label>
                <Switch id="travel" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="tools" className="cursor-pointer">
                  I have my own tools/equipment
                </Label>
                <Switch id="tools" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileJobPreferences;

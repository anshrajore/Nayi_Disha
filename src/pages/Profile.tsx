
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Check, 
  ChevronRight, 
  Edit, 
  MapPin, 
  Phone, 
  Plus, 
  Upload, 
  User, 
  X,
  Mail,
  Cake,
  Languages,
  Home,
  Smartphone
} from 'lucide-react';

import ProfileSkillSection from '@/components/profile/ProfileSkillSection';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileJobPreferences from '@/components/profile/ProfileJobPreferences';
import ProfileDocumentWallet from '@/components/profile/ProfileDocumentWallet';

const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    
    // Simulate progress increase
    setProfileCompletion(Math.min(profileCompletion + 10, 100));
  };
  
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <ProfileCompletionBadge completion={profileCompletion} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="sticky top-20 border-2 border-muted">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 flex items-center justify-center text-white text-3xl font-bold">
                      RS
                    </div>
                    <button className="absolute bottom-0 right-0 bg-nayidisha-blue text-white p-1 rounded-full hover:bg-nayidisha-blue-600">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
                <CardTitle className="text-xl">Rahul Singh</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <MapPin size={14} />
                  <span>New Delhi, India</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Profile Completion</p>
                    <div className="flex items-center gap-2">
                      <Progress value={profileCompletion} className="h-2" />
                      <span className="text-sm font-medium">{profileCompletion}%</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span className="text-sm">rahul.singh@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <span className="text-sm">Electrician, 5 Years Exp.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span className="text-sm">Available Immediately</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-muted/50">Electrical Wiring</Badge>
                      <Badge variant="outline" className="bg-muted/50">Circuit Repair</Badge>
                      <Badge variant="outline" className="bg-muted/50">Industrial</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Quick Links</p>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/saved-jobs">Saved Jobs</Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/applications">My Applications</Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/settings">Account Settings</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/saved-jobs">
                    View Saved Jobs <ChevronRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main profile content */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            <Card className="border-2 border-muted">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input 
                      id="fullName" 
                      defaultValue="Rahul Singh" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      defaultValue="+91 98765 43210" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone" className="flex items-center gap-2">
                      <Smartphone size={14} className="text-muted-foreground" />
                      Alternate Phone (Optional)
                    </Label>
                    <Input 
                      id="alternatePhone" 
                      placeholder="Enter alternate phone number" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail size={14} className="text-muted-foreground" />
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      defaultValue="rahul.singh@example.com" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Cake size={14} className="text-muted-foreground" />
                      Date of Birth
                    </Label>
                    <Input 
                      id="dob" 
                      type="date"
                      defaultValue="1990-05-15" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      Gender
                    </Label>
                    <Select disabled={!isEditing} defaultValue="male">
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Languages size={14} className="text-muted-foreground" />
                      Preferred Language
                    </Label>
                    <Select disabled={!isEditing} defaultValue="hindi">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="punjabi">Punjabi</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="gujarati">Gujarati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <Home size={14} className="text-muted-foreground" />
                    Address
                  </Label>
                  <Textarea 
                    id="address" 
                    defaultValue="123, Karol Bagh, New Delhi - 110005, India" 
                    disabled={!isEditing}
                    className="min-h-20"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Communication Preferences</h3>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">
                      Receive job alerts via SMS
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="emailNotifications" defaultChecked />
                    <Label htmlFor="emailNotifications">
                      Receive email notifications
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="whatsappNotifications" />
                    <Label htmlFor="whatsappNotifications">
                      Receive WhatsApp notifications
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <div className="hidden md:block">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Profile assessment completed",
                      description: "We've updated your job recommendations based on your profile."
                    })
                  }}>
                    <Check className="mr-1 h-4 w-4" /> Assess Profile
                  </Button>
                </div>
              </div>
              
              <TabsContent value="skills" className="mt-0">
                <ProfileSkillSection />
              </TabsContent>
              
              <TabsContent value="education" className="mt-0">
                <ProfileEducation />
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-0">
                <ProfileJobPreferences />
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <ProfileDocumentWallet />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ProfileCompletionBadge = ({ completion }) => {
  let status = "Incomplete";
  let color = "bg-amber-500";
  
  if (completion >= 100) {
    status = "Complete";
    color = "bg-green-500";
  } else if (completion >= 70) {
    status = "Almost Complete";
    color = "bg-blue-500";
  } else if (completion >= 40) {
    status = "In Progress";
    color = "bg-amber-500";
  }
  
  return (
    <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-sm font-medium">{status}</span>
      <span className="text-sm text-muted-foreground">({completion}%)</span>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Mic, Save, Eye, ArrowRight, Upload, MapPin, Plus, Trash, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { StyledInput } from '@/components/ui/styled-input';
import JobPreview from '@/components/JobPreview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const jobCategories = [
  "Construction", "Transportation", "Hospitality", "Manufacturing", 
  "Security", "Cleaning", "Retail", "Agriculture", "Healthcare", "Warehouse",
  "Factory Work", "Plumbing", "Electrical Work", "Carpentry", "Painting",
  "Gardening", "Delivery", "Loading/Unloading", "Housekeeping"
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Daily-wage"];
const workShifts = ["Day shift", "Night shift", "Rotational shift", "Morning shift", "Evening shift"];
const educationLevels = ["None", "Primary (5th)", "Middle (8th)", "High School (10th)", "Higher Secondary (12th)", "ITI", "Diploma"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati"];
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const daysOfWeek = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

interface Facility {
  name: string;
  icon: string;
}

const facilities: Facility[] = [
  { name: "Accommodation", icon: "🏠" },
  { name: "Food", icon: "🍱" },
  { name: "Transportation", icon: "🚌" },
  { name: "Insurance", icon: "🏥" },
  { name: "PF/ESI", icon: "💰" },
  { name: "Training", icon: "📚" },
  { name: "Uniform", icon: "👕" },
  { name: "Mobile Allowance", icon: "📱" },
];

// Define the initial state for formData
const initialFormData = {
  title: '',
  jobType: '',
  category: '',
  workShift: '',
  numPositions: 1,
  pincode: '',
  state: '',
  city: '',
  area: '',
  address: '',
  salaryPeriod: 'monthly',
  salaryMin: 10000,
  salaryMax: 20000,
  overtimePay: false,
  incentives: '',
  providedFacilities: [] as string[],
  shiftStart: '',
  shiftEnd: '',
  workDays: [] as string[],
  startDate: 'immediate',
  specificStartDate: '',
  minEducation: '',
  experienceMonths: 0,
  minAge: 18,
  maxAge: 50,
  languages: [] as string[],
  physicalRequirements: '',
  certifications: '',
  description: '',
  companyName: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  companyLogo: '',
  siteImages: [] as string[],
  siteVideo: '',
  isHighlighted: false
};

// Define the type for the formData based on its initial state
type FormDataState = typeof initialFormData;

interface Draft {
  id: string;
  title: string;
  date: string;
  data: FormDataState;
}

const PostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [jobPostType, setJobPostType] = useState<'standard' | 'blueCollar'>('blueCollar');
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState<Draft[]>([]);
  const [showDraftsList, setShowDraftsList] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleMultiSelectChange = (name: keyof FormDataState, value: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...(prev[name] as string[]), value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: (prev[name] as string[]).filter(item => item !== value)
      }));
    }
  };

  const handleSalaryChange = (values: number[]) => {
    setFormData({
      ...formData,
      salaryMin: values[0],
      salaryMax: values[1]
    });
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (!formData.title || !formData.jobType || !formData.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required job details",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 1) {
      if (!formData.state || !formData.city) {
        toast({
          title: "Missing information",
          description: "Please provide at least the state and city",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleSaveDraft = () => {
    const draftId = Date.now().toString();
    const draft: Draft = {
      id: draftId,
      title: formData.title || "Untitled Draft",
      date: new Date().toLocaleDateString(),
      data: formData
    };
    
    setSavedDrafts([...savedDrafts, draft]);
    
    toast({
      title: "Draft saved",
      description: "Your job posting has been saved as a draft",
    });
  };

  const handleLoadDraft = (draft: Draft) => {
    setFormData(draft.data);
    setShowDraftsList(false);
    
    toast({
      title: "Draft loaded",
      description: "Your draft has been loaded successfully",
    });
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts(savedDrafts.filter(draft => draft.id !== id));
    
    toast({
      title: "Draft deleted",
      description: "Your draft has been deleted",
    });
  };

  const handleDuplicateJob = async () => {
    setFormData({
      ...formData,
      title: `${formData.title} (Copy)`,
    });
    
    toast({
      title: "Job duplicated",
      description: "You can now edit and post the duplicated job",
    });
  };

  const handleFileUpload = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      
      if (name === 'siteImages') {
        setFormData(prev => ({
          ...prev,
          siteImages: [...prev.siteImages, fileURL]
        }));
      } else if (name === 'companyLogo') {
        setFormData(prev => ({
          ...prev,
          companyLogo: fileURL
        }));
      } else if (name === 'siteVideo') {
        setFormData(prev => ({
          ...prev,
          siteVideo: fileURL
        }));
      }
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      siteImages: prev.siteImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Commenting out authentication check for direct job posting
      // const { data: { session } } = await supabase.auth.getSession();
      
      // if (!session) {
      //   toast({
      //     title: "Authentication required",
      //     description: "Please sign in to post a job",
      //     variant: "destructive"
      //   });
      //   navigate('/auth');
      //   return;
      // }
      
      // For now, setting a placeholder employer_id. In a real application, this should be handled properly.
      const employerId = null; // Set to null if job can be posted without a logged-in employer

      const { data, error } = await supabase
        .from('jobs')
        .insert({
          employer_id: employerId, // Use the placeholder ID
          title: formData.title,
          job_type: formData.jobType,
          category: formData.category,
          description: formData.description,
          location_pincode: formData.pincode,
          location_state: formData.state,
          location_city: formData.city,
          location_address: formData.address,
          salary_min: formData.salaryMin,
          salary_max: formData.salaryMax,
          salary_period: formData.salaryPeriod,
          incentives: formData.incentives,
          shift_start: formData.shiftStart,
          shift_end: formData.shiftEnd,
          work_days: formData.workDays,
          start_date: formData.startDate === 'immediate' ? new Date().toISOString().split('T')[0] : formData.specificStartDate,
          min_education: formData.minEducation,
          min_experience_months: formData.experienceMonths,
          languages_required: formData.languages,
          physical_requirements: formData.physicalRequirements,
          certifications_required: formData.certifications?.split(',').map(cert => cert.trim()),
          is_highlighted: formData.isHighlighted,
          status: 'active',
          company_name: formData.companyName,
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        toast({
          title: "Job posted successfully!",
          description: "Your job listing is now live and visible to job seekers",
          variant: "success"
        });
        
        navigate(`/jobs?newJob=${data[0].id}`);
      } else {
        // This case should ideally not happen if Supabase insert is successful, but provides a fallback
        toast({
          title: "Error posting job",
          description: "Job was not returned after successful post. Please check the dashboard manually.",
          variant: "destructive"
        });
      }
      
    } catch (error: unknown) {
      toast({
        title: "Error posting job",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSaveButton = () => (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleSaveDraft}>
        <Save className="w-4 h-4 mr-2" />
        Save Draft
      </Button>
      <Button variant="outline" onClick={() => setShowDraftsList(!showDraftsList)}>
        {showDraftsList ? "Hide Drafts" : "Load Draft"}
      </Button>
    </div>
  );

  const stepTitles = [
    "Job Details",
    "Location & Salary",
    "Schedule & Requirements",
    "Company Info"
  ];

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const previewJob = {
    id: 'preview',
    title: formData.title || 'Job Title',
    company: formData.companyName || 'Company Name',
    location: `${formData.city || 'City'}, ${formData.state || 'State'}`,
    salary: `₹${formData.salaryMin.toLocaleString()} - ₹${formData.salaryMax.toLocaleString()}/${formData.salaryPeriod}`,
    postedDate: 'Just now',
    jobType: formData.jobType || 'Job Type',
    category: formData.category || 'Category',
    description: formData.description || 'Job Description',
    isUrgent: false,
    isVerified: false,
    requirements: {
      education: formData.minEducation,
      experience: formData.experienceMonths > 0 ? `${Math.floor(formData.experienceMonths/12)} years ${formData.experienceMonths % 12} months` : 'None',
      languages: formData.languages,
      skills: []
    },
    workSchedule: {
      days: formData.workDays,
      hours: formData.shiftStart && formData.shiftEnd ? `${formData.shiftStart} to ${formData.shiftEnd}` : 'Full day'
    },
    contactInfo: {
      name: formData.contactName,
      phone: formData.contactPhone,
      email: formData.contactEmail
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Post a Blue Collar Job</h1>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {stepTitles.map((title, index) => (
              <div 
                key={index} 
                className={`hidden md:block text-sm ${currentStep >= index ? 'text-primary font-medium' : 'text-muted-foreground'}`}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep + 1) / stepTitles.length * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {stepTitles.length}
          </div>
        </div>

        {showDraftsList && savedDrafts.length > 0 && (
          <Card className="max-w-3xl mx-auto mb-6">
            <CardHeader>
              <CardTitle>Saved Drafts</CardTitle>
              <CardDescription>Select a draft to continue editing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedDrafts.map(draft => (
                  <div key={draft.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{draft.title}</p>
                      <p className="text-sm text-muted-foreground">Saved on {draft.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleLoadDraft(draft)}>
                        Load
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteDraft(draft.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {showDraftsList && savedDrafts.length === 0 && (
          <Card className="max-w-3xl mx-auto mb-6">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No saved drafts found.</p>
            </CardContent>
          </Card>
        )}

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{stepTitles[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Provide basic information about the blue collar job opening"}
              {currentStep === 1 && "Where is the job located and what's the compensation?"}
              {currentStep === 2 && "Specify work schedule and job requirements"}
              {currentStep === 3 && "Add your company details and contact information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 0 && (
                <div className="space-y-4">
                  <StyledInput
                    label="Job Title"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTextChange}
                    placeholder="e.g. Warehouse Loader, Electrician"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobType">Job Type <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.jobType} 
                        onValueChange={(value) => handleSelectChange('jobType', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workShift">Work Shift <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.workShift} 
                        onValueChange={(value) => handleSelectChange('workShift', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select work shift" />
                        </SelectTrigger>
                        <SelectContent>
                          {workShifts.map(shift => (
                            <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="numPositions">Number of Positions <span className="text-red-500">*</span></Label>
                      <Input 
                        id="numPositions"
                        name="numPositions"
                        type="number"
                        min="1"
                        value={formData.numPositions}
                        onChange={handleNumberChange}
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <div className="flex items-center space-x-2 mb-2">
                      <Button type="button" variant="outline" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Voice Record
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        AI Assistant
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleTextChange}
                      placeholder="Describe job responsibilities, working conditions, safety requirements, etc."
                      rows={5}
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.state} 
                        onValueChange={(value) => handleSelectChange('state', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleTextChange}
                        placeholder="e.g. Mumbai"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input 
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleTextChange}
                        placeholder="e.g. 110001"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="area">Area/Locality</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleTextChange}
                        placeholder="e.g. Andheri East"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Detailed Address/Landmark</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleTextChange}
                      placeholder="e.g. Near Railway Station, Behind City Mall"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label>Salary Range</Label>
                    <Tabs value={formData.salaryPeriod} onValueChange={(value) => handleSelectChange('salaryPeriod', value)}>
                      <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="hourly">Hourly</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="mb-8">
                      <Slider 
                        defaultValue={[formData.salaryMin, formData.salaryMax]}
                        max={100000}
                        step={1000}
                        onValueChange={handleSalaryChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{formData.salaryMin.toLocaleString()}</span>
                        <span>₹{formData.salaryMax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="overtimePay"
                      checked={formData.overtimePay}
                      onCheckedChange={(checked) => handleCheckboxChange('overtimePay', !!checked)}
                    />
                    <div>
                      <Label htmlFor="overtimePay">Overtime Pay Available</Label>
                      <p className="text-sm text-muted-foreground">
                        Workers will be compensated for extra hours
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="incentives">Bonuses or Perks (Optional)</Label>
                    <Input 
                      id="incentives"
                      name="incentives"
                      value={formData.incentives}
                      onChange={handleTextChange}
                      placeholder="e.g. Performance bonus, tips, festival bonus"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Facilities Provided</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {facilities.map((facility) => (
                        <div
                          key={facility.name}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            formData.providedFacilities.includes(facility.name)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleMultiSelectChange(
                            'providedFacilities',
                            facility.name,
                            !formData.providedFacilities.includes(facility.name)
                          )}
                        >
                          <div className="flex gap-2 items-center">
                            <span className="text-xl">{facility.icon}</span>
                            <span className="text-sm">{facility.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shiftStart">Shift Start Time</Label>
                      <Input 
                        id="shiftStart"
                        name="shiftStart"
                        type="time"
                        value={formData.shiftStart}
                        onChange={handleTextChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shiftEnd">Shift End Time</Label>
                      <Input 
                        id="shiftEnd"
                        name="shiftEnd"
                        type="time"
                        value={formData.shiftEnd}
                        onChange={handleTextChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Work Days</Label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {daysOfWeek.map((day) => (
                        <div key={day.id} className="flex items-center justify-center">
                          <Checkbox 
                            id={day.id} 
                            checked={formData.workDays.includes(day.id)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('workDays', day.id, !!checked)
                            }
                            className="mx-auto"
                          />
                          <Label htmlFor={day.id} className="ml-1 text-sm">{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Start Date</Label>
                    <RadioGroup 
                      value={formData.startDate} 
                      onValueChange={(value) => handleSelectChange('startDate', value)}
                      className="flex flex-col space-y-1 mt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <Label htmlFor="immediate">Immediate Joining</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific" id="specific" />
                        <Label htmlFor="specific">Specific Date</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.startDate === 'specific' && (
                      <Input 
                        id="specificStartDate"
                        name="specificStartDate"
                        type="date"
                        value={formData.specificStartDate}
                        onChange={handleTextChange}
                        className="mt-2 text-gray-900 border-gray-300"
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minEducation">Minimum Education</Label>
                      <Select 
                        value={formData.minEducation} 
                        onValueChange={(value) => handleSelectChange('minEducation', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="experienceMonths">Experience (months)</Label>
                      <Input 
                        id="experienceMonths"
                        name="experienceMonths"
                        type="number"
                        min="0"
                        value={formData.experienceMonths}
                        onChange={handleNumberChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minAge">Minimum Age</Label>
                      <Input 
                        id="minAge"
                        name="minAge"
                        type="number"
                        min="18"
                        value={formData.minAge}
                        onChange={handleNumberChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxAge">Maximum Age</Label>
                      <Input 
                        id="maxAge"
                        name="maxAge"
                        type="number"
                        min={formData.minAge}
                        value={formData.maxAge}
                        onChange={handleNumberChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Languages Required</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center">
                          <Checkbox 
                            id={`lang-${language}`} 
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('languages', language, !!checked)
                            }
                          />
                          <Label htmlFor={`lang-${language}`} className="ml-2 text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="physicalRequirements">Physical Requirements</Label>
                    <Input 
                      id="physicalRequirements"
                      name="physicalRequirements"
                      value={formData.physicalRequirements}
                      onChange={handleTextChange}
                      placeholder="e.g. Ability to lift 20kg, stand for 8 hours"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="certifications">Required Certifications or Licenses</Label>
                    <Input 
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleTextChange}
                      placeholder="e.g. Driving License, Electrician License, Safety Training"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company/Organization Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleTextChange}
                      placeholder="e.g. ABC Construction"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactName">Contact Person Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleTextChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone / WhatsApp <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleTextChange}
                      placeholder="e.g. 9876543210"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                    <Input 
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleTextChange}
                      placeholder="e.g. contact@example.com"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="companyLogo">Company Logo (Optional)</Label>
                    <div className="mt-2 flex flex-col items-start gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full cursor-pointer"
                        onClick={() => document.getElementById('logoUpload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                      <input
                        id="logoUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('companyLogo', e)}
                        className="hidden"
                        aria-label="Upload Company Logo"
                      />
                      
                      {formData.companyLogo && (
                        <div className="relative border rounded-md p-2 w-full">
                          <img 
                            src={formData.companyLogo} 
                            alt="Company Logo" 
                            className="h-20 object-contain mx-auto" 
                          />
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData({...formData, companyLogo: ''})}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteImages">Workplace Photos (Optional)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload photos of the work environment to help job seekers understand the workplace
                    </p>
                    <div className="mt-2 flex flex-col items-start gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full cursor-pointer"
                        onClick={() => document.getElementById('imageUpload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Images
                      </Button>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload('siteImages', e)}
                        className="hidden"
                        aria-label="Upload Workplace Photos"
                      />
                      
                      {formData.siteImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                          {formData.siteImages.map((image, index) => (
                            <div key={index} className="relative border rounded-md p-2">
                              <img 
                                src={image} 
                                alt={`Site Image ${index + 1}`} 
                                className="w-full h-24 object-cover rounded" 
                              />
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => removeImage(index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteVideo">Workplace Video (Optional)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a short video to showcase the work environment
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full cursor-pointer"
                      onClick={() => document.getElementById('videoUpload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </Button>
                    <input
                      id="videoUpload"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload('siteVideo', e)}
                      className="hidden"
                      aria-label="Upload Workplace Video"
                    />
                    
                    {formData.siteVideo && (
                      <div className="mt-4 relative border rounded-md p-2">
                        <video 
                          src={formData.siteVideo} 
                          controls 
                          className="w-full rounded" 
                        />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData({...formData, siteVideo: ''})}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="isHighlighted"
                      checked={formData.isHighlighted}
                      onCheckedChange={(checked) => handleCheckboxChange('isHighlighted', !!checked)}
                    />
                    <div>
                      <Label htmlFor="isHighlighted">Featured Job Listing (Premium)</Label>
                      <p className="text-sm text-muted-foreground">
                        Highlight your job to get more visibility (additional charges apply)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            {currentStep > 0 && (
              <Button 
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            {currentStep === 0 && renderSaveButton()}
            
            {currentStep < stepTitles.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDuplicateJob}
                >
                  Duplicate
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:opacity-90"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Job Preview</span>
                <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                This is how your job will appear to job seekers
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <JobPreview job={previewJob} />
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setPreviewOpen(false)}>
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {currentStep === stepTitles.length - 1 && (
          <div className="max-w-3xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Dashboard</CardTitle>
                <CardDescription>
                  Track applications and manage your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex flex-col items-center p-4 border rounded-md text-center">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">Active Jobs</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-md text-center">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">Applications</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-md text-center">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">Interviews</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-md text-center">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">Hired</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Recent Applicants</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    No applicants yet for this job posting.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostJob;

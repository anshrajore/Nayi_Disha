import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash, Plus, Users, Briefcase, Calendar, Filter, Download } from 'lucide-react';

interface JobItemProps {
  id: string;
  title: string;
  location: string;
  postedDate: string;
  applicantsCount: number;
  status: 'active' | 'paused' | 'closed' | 'draft';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const JobItem = ({
  id,
  title,
  location,
  postedDate,
  applicantsCount,
  status,
  onEdit,
  onDelete,
  onView
}: JobItemProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-amber-100 text-amber-800 border-amber-200",
    closed: "bg-red-100 text-red-800 border-red-200",
    draft: "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 mb-4 hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Posted on {postedDate}</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{applicantsCount} applicants</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
        <Badge className={statusColors[status]} variant="outline">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8" 
            onClick={() => onView(id)}
          >
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8" 
            onClick={() => onEdit(id)}
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 text-destructive" 
            onClick={() => onDelete(id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ApplicantCardProps {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  status: 'new' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  appliedDate: string;
  onView: (id: string) => void;
}

const ApplicantCard = ({
  id,
  name,
  role,
  location,
  experience,
  status,
  appliedDate,
  onView
}: ApplicantCardProps) => {
  const statusColors = {
    new: "bg-blue-100 text-blue-800 border-blue-200",
    shortlisted: "bg-yellow-100 text-yellow-800 border-yellow-200",
    interviewed: "bg-purple-100 text-purple-800 border-purple-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    hired: "bg-green-100 text-green-800 border-green-200"
  };
  
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 mb-4 hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-muted-foreground">Applied for: {role}</p>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>{location}</span>
          <div className="hidden md:block">•</div>
          <span>{experience} experience</span>
          <div className="hidden md:block">•</div>
          <span>Applied on {appliedDate}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
        <Badge className={statusColors[status]} variant="outline">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8" 
          onClick={() => onView(id)}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

const BlueCollarDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("jobs");
  
  // Sample data - would come from API in real implementation
  const jobs = [
    {
      id: '1',
      title: 'Plumber needed for residential project',
      location: 'Mumbai, Maharashtra',
      postedDate: '10 May 2023',
      applicantsCount: 5,
      status: 'active' as const
    },
    {
      id: '2',
      title: 'Factory Worker - Night Shift',
      location: 'Pune, Maharashtra',
      postedDate: '8 May 2023',
      applicantsCount: 12,
      status: 'active' as const
    },
    {
      id: '3',
      title: 'Construction Helper - Immediate Joining',
      location: 'Thane, Maharashtra',
      postedDate: '5 May 2023',
      applicantsCount: 8,
      status: 'closed' as const
    },
    {
      id: '4',
      title: 'Delivery Driver with own vehicle',
      location: 'Navi Mumbai, Maharashtra',
      postedDate: '1 May 2023',
      applicantsCount: 15,
      status: 'paused' as const
    },
    {
      id: '5',
      title: 'Electrician for commercial project',
      location: 'Mumbai, Maharashtra',
      postedDate: '25 Apr 2023',
      applicantsCount: 0,
      status: 'draft' as const
    }
  ];
  
  const applicants = [
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'Plumber needed for residential project',
      location: 'Mumbai, Maharashtra',
      experience: '3 years',
      status: 'new' as const,
      appliedDate: '11 May 2023'
    },
    {
      id: '2',
      name: 'Sanjay Kumar',
      role: 'Plumber needed for residential project',
      location: 'Thane, Maharashtra',
      experience: '5 years',
      status: 'shortlisted' as const,
      appliedDate: '10 May 2023'
    },
    {
      id: '3',
      name: 'Priya Singh',
      role: 'Factory Worker - Night Shift',
      location: 'Pune, Maharashtra',
      experience: '1 year',
      status: 'interviewed' as const,
      appliedDate: '9 May 2023'
    },
    {
      id: '4',
      name: 'Amit Patel',
      role: 'Factory Worker - Night Shift',
      location: 'Pune, Maharashtra',
      experience: '2 years',
      status: 'hired' as const,
      appliedDate: '8 May 2023'
    },
    {
      id: '5',
      name: 'Deepak Verma',
      role: 'Construction Helper - Immediate Joining',
      location: 'Mumbai, Maharashtra',
      experience: 'Fresher',
      status: 'rejected' as const,
      appliedDate: '6 May 2023'
    }
  ];
  
  const handleEditJob = (id: string) => {
    navigate(`/edit-job/${id}`);
  };
  
  const handleDeleteJob = (id: string) => {
    // Would implement deletion API call in real app
    console.log(`Delete job ${id}`);
  };
  
  const handleViewJob = (id: string) => {
    navigate(`/jobs/${id}`);
  };
  
  const handleViewApplicant = (id: string) => {
    navigate(`/applicants/${id}`);
  };
  
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job postings and track applications</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/post-job')} 
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
          <Button 
            variant="outline"
            onClick={() => console.log("Export data")} 
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">{jobs.filter(j => j.status === 'active').length}</span>
              <span className="text-sm text-muted-foreground">Active Jobs</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">{applicants.length}</span>
              <span className="text-sm text-muted-foreground">Total Applicants</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">{applicants.filter(a => a.status === 'interviewed').length}</span>
              <span className="text-sm text-muted-foreground">Interviews</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">{applicants.filter(a => a.status === 'hired').length}</span>
              <span className="text-sm text-muted-foreground">Hired</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs 
        defaultValue="jobs" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="jobs" className="flex-1 sm:flex-initial">Job Postings</TabsTrigger>
          <TabsTrigger value="applications" className="flex-1 sm:flex-initial">Applications</TabsTrigger>
          <TabsTrigger value="hired" className="flex-1 sm:flex-initial">Hired</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl font-semibold">Your Job Postings</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => console.log('Filter jobs')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button 
                variant="default"
                size="sm"
                onClick={() => navigate('/post-job')} 
              >
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">You haven't posted any jobs yet.</p>
                  <Button onClick={() => navigate('/post-job')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              jobs.map(job => (
                <JobItem 
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  location={job.location}
                  postedDate={job.postedDate}
                  applicantsCount={job.applicantsCount}
                  status={job.status}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onView={handleViewJob}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
          
          <div>
            {applicants.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No applications received yet.</p>
                </CardContent>
              </Card>
            ) : (
              applicants.map(applicant => (
                <ApplicantCard 
                  key={applicant.id}
                  id={applicant.id}
                  name={applicant.name}
                  role={applicant.role}
                  location={applicant.location}
                  experience={applicant.experience}
                  status={applicant.status}
                  appliedDate={applicant.appliedDate}
                  onView={handleViewApplicant}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="hired" className="space-y-4">
          <h2 className="text-xl font-semibold">Hired Workers</h2>
          
          <div>
            {applicants.filter(a => a.status === 'hired').length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You haven't hired any workers yet.</p>
                </CardContent>
              </Card>
            ) : (
              applicants
                .filter(a => a.status === 'hired')
                .map(applicant => (
                  <ApplicantCard 
                    key={applicant.id}
                    id={applicant.id}
                    name={applicant.name}
                    role={applicant.role}
                    location={applicant.location}
                    experience={applicant.experience}
                    status={applicant.status}
                    appliedDate={applicant.appliedDate}
                    onView={handleViewApplicant}
                  />
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlueCollarDashboard;

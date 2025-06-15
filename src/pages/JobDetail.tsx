
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JobProps } from '@/components/JobCard';
import { Calendar, MapPin, Building, Share2, Heart, AlertCircle } from 'lucide-react';

// Mock data for job details (extending the JobProps)
interface JobDetailProps extends JobProps {
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const jobDetails: Record<string, JobDetailProps> = {
  '1': {
    id: '1',
    title: 'Plumber for Residential Project',
    company: 'BrightBuild Construction',
    location: 'Delhi, India',
    salary: '15,000 - 20,000/month',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    category: 'Plumbing',
    isUrgent: true,
    isVerified: true,
    description: 'We are seeking a skilled plumber to join our residential project team. The ideal candidate will have experience in installing and repairing plumbing systems in residential buildings. This is a full-time position with competitive pay and benefits.',
    responsibilities: [
      'Install, repair, and maintain plumbing systems and fixtures',
      'Read blueprints and follow state and local building codes',
      'Install and connect appliances to water lines',
      'Troubleshoot and resolve plumbing issues',
      'Ensure proper water pressure and distribution',
      'Collaborate with construction team members',
    ],
    requirements: [
      'At least 2 years of experience in residential plumbing',
      'Knowledge of plumbing codes and regulations',
      'Ability to use plumbing tools and equipment',
      'Physical stamina and dexterity',
      'Good problem-solving skills',
      'Ability to work in a team environment',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid time off',
      'On-the-job training',
      'Career growth opportunities',
    ],
    applicationDeadline: '15 May, 2025',
    contactPerson: 'Amit Sharma',
    contactEmail: 'hiring@brightbuild.com',
    contactPhone: '+91 9876543210',
  },
  '2': {
    id: '2',
    title: 'Experienced Electrician',
    company: 'PowerTech Solutions',
    location: 'Mumbai, Maharashtra',
    salary: '18,000 - 25,000/month',
    postedDate: '1 day ago',
    jobType: 'Full-time',
    category: 'Electrical',
    isVerified: true,
    description: 'PowerTech Solutions is looking for an experienced electrician to join our team. The successful candidate will be responsible for installing, maintaining, and repairing electrical systems in commercial and residential buildings.',
    responsibilities: [
      'Install, maintain, and repair electrical systems',
      'Read and interpret electrical drawings and specifications',
      'Troubleshoot electrical issues',
      'Ensure compliance with safety standards and regulations',
      'Collaborate with construction teams',
    ],
    requirements: [
      'At least 3 years of experience as an electrician',
      'Knowledge of electrical codes and safety regulations',
      'Ability to use electrical testing equipment',
      'Good problem-solving skills',
      'Valid electrician license',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid time off',
      'Tools provided',
      'Career advancement opportunities',
    ],
    applicationDeadline: '20 May, 2025',
    contactPerson: 'Priya Patel',
    contactEmail: 'careers@powertech.com',
    contactPhone: '+91 9876543211',
  },
  // More job details can be added here
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = id ? jobDetails[id] : undefined;

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/jobs">Jobs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{job.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white dark:bg-muted rounded-lg border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    {job.isUrgent && (
                      <Badge variant="outline" className="bg-nayidisha-orange/10 text-nayidisha-orange border-nayidisha-orange">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Building size={16} className="mr-1" />
                    <span className="mr-4">{job.company}</span>
                    {job.isVerified && (
                      <span className="flex items-center text-nayidisha-blue text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                        <span className="ml-1">Verified Employer</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin size={16} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar size={16} className="mr-1" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon">
                    <Heart size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Badge variant="secondary" className="font-normal">
                  {job.jobType}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  {job.category}
                </Badge>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-muted rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-muted-foreground mb-6">{job.description}</p>

              <h3 className="text-lg font-semibold mb-3">Responsibilities:</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Requirements:</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Benefits:</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* How to Apply */}
            <div className="bg-white dark:bg-muted rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
              <p className="text-muted-foreground mb-6">
                Click the "Apply Now" button to submit your application. Our team will review your profile and contact you for the next steps.
              </p>
              <Button className="w-full md:w-auto btn-primary">Apply Now</Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Job Summary */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Job Summary</h2>
                
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-medium">₹{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job Type</p>
                    <p className="font-medium">{job.jobType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Posted Date</p>
                    <p className="font-medium">{job.postedDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Application Deadline</p>
                    <p className="font-medium">{job.applicationDeadline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Company Information</h2>
                <div className="space-y-3">
                  <p className="font-medium">{job.company}</p>
                  <p className="text-muted-foreground text-sm">{job.location}</p>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Company Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            {job.contactPerson && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{job.contactPerson}</p>
                    </div>
                    {job.contactEmail && (
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{job.contactEmail}</p>
                      </div>
                    )}
                    {job.contactPhone && (
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{job.contactPhone}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Similar Jobs */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
                <div className="space-y-4">
                  {Object.values(jobDetails)
                    .filter(j => j.id !== job.id && j.category === job.category)
                    .slice(0, 3)
                    .map((similarJob) => (
                      <Link 
                        key={similarJob.id} 
                        to={`/jobs/${similarJob.id}`}
                        className="block p-3 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="font-medium mb-1">{similarJob.title}</h3>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{similarJob.company}</span>
                          <span className="font-medium text-nayidisha-blue">₹{similarJob.salary.split(' ')[0]}</span>
                        </div>
                      </Link>
                    ))}
                  <Button variant="outline" asChild className="w-full mt-2">
                    <Link to="/jobs">View All Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;

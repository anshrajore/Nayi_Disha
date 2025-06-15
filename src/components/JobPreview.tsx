
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Clock, BookOpen, Languages, Award } from 'lucide-react';

interface JobRequirements {
  education?: string;
  experience?: string;
  languages?: string[];
  skills?: string[];
}

interface WorkSchedule {
  days?: string[];
  hours?: string;
}

interface ContactInfo {
  name?: string;
  phone?: string;
  email?: string;
}

interface JobPreviewProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    postedDate: string;
    jobType: string;
    category: string;
    description?: string;
    isUrgent?: boolean;
    isVerified?: boolean;
    requirements?: JobRequirements;
    workSchedule?: WorkSchedule;
    contactInfo?: ContactInfo;
  };
}

const JobPreview: React.FC<JobPreviewProps> = ({ job }) => {
  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      'mon': 'Monday',
      'tue': 'Tuesday',
      'wed': 'Wednesday',
      'thu': 'Thursday',
      'fri': 'Friday',
      'sat': 'Saturday',
      'sun': 'Sunday'
    };
    return days[day.toLowerCase()] || day;
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/5 p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className="font-normal">
                {job.jobType}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {job.category}
              </Badge>
              {job.isUrgent && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              {job.isVerified && (
                <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="font-medium text-lg">{job.salary}</div>
            <div className="text-sm text-muted-foreground">Posted {job.postedDate}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Job Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            </div>

            <Separator className="my-6" />

            {job.requirements && (
              <div>
                <h3 className="text-lg font-medium mb-4">Requirements</h3>
                <div className="space-y-4">
                  {job.requirements.education && (
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Education</div>
                        <div className="text-muted-foreground">{job.requirements.education}</div>
                      </div>
                    </div>
                  )}

                  {job.requirements.experience && (
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Experience</div>
                        <div className="text-muted-foreground">{job.requirements.experience}</div>
                      </div>
                    </div>
                  )}

                  {job.requirements.languages && job.requirements.languages.length > 0 && (
                    <div className="flex items-start">
                      <Languages className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Languages</div>
                        <div className="text-muted-foreground">
                          {job.requirements.languages.join(", ")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {job.workSchedule && (
              <div>
                <h3 className="text-lg font-medium mb-4">Work Schedule</h3>
                {job.workSchedule.days && job.workSchedule.days.length > 0 && (
                  <div className="flex items-start mb-4">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Working Days</div>
                      <div className="text-muted-foreground">
                        {job.workSchedule.days.map(getDayName).join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                {job.workSchedule.hours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Working Hours</div>
                      <div className="text-muted-foreground">{job.workSchedule.hours}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <Card className="bg-muted/40">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-medium">Company Details</h3>
                
                <div>
                  <div className="font-medium">{job.company}</div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{job.location}</span>
                </div>
                
                {job.contactInfo && (
                  <>
                    <Separator className="my-2" />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Contact Details</h4>
                      
                      {job.contactInfo.name && (
                        <div className="text-sm">
                          <span className="font-medium">Name:</span> {job.contactInfo.name}
                        </div>
                      )}
                      
                      {job.contactInfo.phone && (
                        <div className="text-sm">
                          <span className="font-medium">Phone:</span> {job.contactInfo.phone}
                        </div>
                      )}
                      
                      {job.contactInfo.email && (
                        <div className="text-sm">
                          <span className="font-medium">Email:</span> {job.contactInfo.email}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Separator className="my-2" />
                
                <div className="pt-2 text-center">
                  <Badge className="bg-primary hover:bg-primary/90">Apply Now</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreview;

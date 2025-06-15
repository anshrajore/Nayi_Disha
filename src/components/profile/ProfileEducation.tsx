
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, BookOpen, Award, Calendar, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const ProfileEducation = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border rounded-md border-muted">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-muted/70 flex items-center justify-center text-muted-foreground">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">ITI Diploma in Electrical</h3>
                  <p className="text-sm text-muted-foreground">
                    Industrial Training Institute, Delhi
                  </p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>2015 - 2017</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Certifications</CardTitle>
          <CardDescription>Add professional certificates and qualifications</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border rounded-md border-muted">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-muted/70 flex items-center justify-center text-muted-foreground">
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Electrical Safety Certification</h3>
                  <p className="text-sm text-muted-foreground">
                    National Skill Development Corporation (NSDC)
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Issued July 2019</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Verified</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md border-muted">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-muted/70 flex items-center justify-center text-muted-foreground">
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Industrial Wiring Specialist</h3>
                  <p className="text-sm text-muted-foreground">
                    Skill India
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Issued March 2021</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Verified</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Add New Certification</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-name">Certificate Name</Label>
                  <Input id="cert-name" placeholder="e.g. Electrical Safety Training" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuing-org">Issuing Organization</Label>
                  <Input id="issuing-org" placeholder="e.g. NSDC, Skill India" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input id="issue-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                  <Input id="expiry-date" type="date" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 border border-dashed rounded-md">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload certificate (PDF or image)</span>
                <Button variant="ghost" size="sm" className="ml-auto">Select File</Button>
              </div>
              
              <div className="flex items-center justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => {
                  toast({
                    title: "Certificate Added",
                    description: "Your certificate has been added to your profile."
                  });
                }}>Add Certificate</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-muted bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-nayidisha-blue mt-0.5" />
            <div>
              <h3 className="font-medium">Recommended Learning</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your profile, we recommend these free courses to improve your skills and job prospects.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-nayidisha-blue/10 hover:bg-nayidisha-blue/20 cursor-pointer transition-colors">
                  Advanced Electrical Safety
                </Badge>
                <Badge variant="secondary" className="bg-nayidisha-blue/10 hover:bg-nayidisha-blue/20 cursor-pointer transition-colors">
                  Solar Panel Installation
                </Badge>
                <Badge variant="secondary" className="bg-nayidisha-blue/10 hover:bg-nayidisha-blue/20 cursor-pointer transition-colors">
                  Smart Home Wiring
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEducation;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const ProfileDocumentWallet = () => {
  const handleUpload = (documentType) => {
    // In a real implementation, this would trigger a file upload dialog
    toast({
      title: "Upload initiated",
      description: `Select a file to upload as your ${documentType}.`
    });
  };

  return (
    <Card className="border-2 border-muted overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-nayidisha-blue-100 to-nayidisha-blue-50 pb-3">
        <CardTitle className="text-nayidisha-blue">Your Document Wallet</CardTitle>
        <CardDescription>Safely store your important documents for job applications</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Resume/CV */}
          <DocumentCard 
            title="Resume/CV"
            description="Your professional resume/CV"
            status="uploaded"
            fileName="rahul_singh_resume.pdf"
            fileSize="245 KB"
            uploadDate="Apr 15, 2023"
            onUpload={() => handleUpload("Resume")}
          />
          
          {/* ID Proof */}
          <DocumentCard 
            title="ID Proof"
            description="Aadhaar, PAN, or Voter ID"
            status="uploaded"
            fileName="aadhar_card.jpg"
            fileSize="1.2 MB"
            uploadDate="Mar 22, 2023"
            onUpload={() => handleUpload("ID Proof")}
          />
          
          {/* Education Certificates */}
          <DocumentCard 
            title="Education Certificates"
            description="Degree, diploma or course certificates"
            status="pending"
            fileName=""
            fileSize=""
            uploadDate=""
            onUpload={() => handleUpload("Education Certificate")}
          />
          
          {/* Work Experience */}
          <DocumentCard 
            title="Work Experience"
            description="Experience letters or employment proof"
            status="pending"
            fileName=""
            fileSize=""
            uploadDate=""
            onUpload={() => handleUpload("Work Experience Proof")}
          />
          
          {/* Address Proof */}
          <DocumentCard 
            title="Address Proof"
            description="Utility bill or rental agreement"
            status="pending"
            fileName=""
            fileSize=""
            uploadDate=""
            onUpload={() => handleUpload("Address Proof")}
          />
          
          {/* Profile Photo */}
          <DocumentCard 
            title="Profile Photo"
            description="Professional profile picture"
            status="uploaded"
            fileName="profile_photo.jpg"
            fileSize="780 KB"
            uploadDate="Apr 2, 2023"
            onUpload={() => handleUpload("Profile Photo")}
          />
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium">Document Security</h4>
            <p className="text-muted-foreground">
              Your documents are encrypted and securely stored. They are only shared with employers when you apply for a job and give permission.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentCard = ({ 
  title, 
  description, 
  status, 
  fileName, 
  fileSize, 
  uploadDate,
  onUpload 
}) => {
  return (
    <Card className={`border ${status === 'uploaded' ? 'border-solid' : 'border-dashed'} hover:border-primary transition-colors`}>
      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-3 items-center">
            <div className={`w-10 h-10 rounded-full ${status === 'uploaded' ? 'bg-green-100' : 'bg-muted/50'} flex items-center justify-center`}>
              {status === 'uploaded' ? (
                <FileText className="h-5 w-5 text-green-600" />
              ) : (
                <Upload className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          
          {status === 'uploaded' && (
            <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" />
              <span>Uploaded</span>
            </div>
          )}
        </div>
        
        {status === 'uploaded' ? (
          <div className="mt-2 mb-3">
            <div className="text-sm truncate">{fileName}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{fileSize}</span>
              <span className="mx-2">•</span>
              <span>Uploaded on {uploadDate}</span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground mt-1 mb-3">
            No document uploaded yet
          </div>
        )}
        
        <div className="mt-auto">
          <Button 
            variant={status === 'uploaded' ? "outline" : "default"} 
            size="sm" 
            className="w-full"
            onClick={onUpload}
          >
            <Upload className="h-3.5 w-3.5 mr-1" />
            {status === 'uploaded' ? 'Replace' : 'Upload'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDocumentWallet;

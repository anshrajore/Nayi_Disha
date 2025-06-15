import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, AlertTriangle, CheckCircle, Check, Loader2, LogIn } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  jobType: string;
  category: string;
  isUrgent?: boolean;
  isVerified?: boolean;
  onApply?: (id: string) => void;
  className?: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  postedDate,
  jobType,
  category,
  isUrgent = false,
  isVerified = false,
  onApply,
  className
}: JobProps) => {
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired' | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Check if user has already applied for this job
  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data } = await supabase
            .from('applications')
            .select('id, status')
            .eq('job_id', id)
            .eq('applicant_id', session.user.id)
            .single();
            
          if (data) {
            setIsApplied(true);
            setApplicationStatus(data.status as 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired');
          }
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };
    
    checkIfApplied();
  }, [id]);

  const handleApply = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setShowAuthDialog(true);
      return;
    }

    setIsApplying(true);
    
    try {
      if (onApply) {
        await onApply(id);
        setIsApplied(true);
        setApplicationStatus('applied');
        toast.success("Application submitted successfully!", {
          description: "You'll be notified when the employer responds.",
        });
      }
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again later.",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleAuth = () => {
    setShowAuthDialog(false);
    navigate('/auth');
  };

  const getStatusBadge = () => {
    if (!applicationStatus) return null;

    const statusConfig = {
      applied: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        text: "Applied"
      },
      shortlisted: {
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        text: "Shortlisted"
      },
      interviewed: {
        color: "bg-purple-50 text-purple-700 border-purple-200",
        text: "Interviewed"
      },
      rejected: {
        color: "bg-red-50 text-red-700 border-red-200",
        text: "Rejected"
      },
      hired: {
        color: "bg-green-50 text-green-700 border-green-200",
        text: "Hired"
      }
    };

    const config = statusConfig[applicationStatus];
    return (
      <Badge 
        variant="outline" 
        className={`${config.color} flex items-center gap-1`}
      >
        <Check className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <>
      <Card className={cn("group relative overflow-hidden", className)}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col h-full">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <h3 className="text-base sm:text-lg font-medium mb-1 hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {isUrgent && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                  </Badge>
                )}
                {isVerified && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-3">{company}</p>
            
            <div className="space-y-2 mb-4 flex-grow">
              <div className="flex items-center text-xs sm:text-sm flex-wrap">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm flex-wrap">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
                <span className="mr-1">{jobType}</span>
                <span className="mx-1">•</span>
                <span>{category}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
                <span>Posted {postedDate}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 mt-auto flex-wrap gap-2">
              <div className="font-medium text-sm sm:text-base">₹{salary}</div>
              
              {isApplied ? (
                getStatusBadge()
              ) : (
                <Button 
                  size="sm" 
                  className="bg-nayidisha-blue hover:bg-nayidisha-blue-600 text-xs sm:text-sm w-full sm:w-auto"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? (
                    <>
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                      Applying...
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to Apply</DialogTitle>
            <DialogDescription>
              You need to be signed in to apply for this job. Please sign in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAuth}
              className="w-full sm:w-auto"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;

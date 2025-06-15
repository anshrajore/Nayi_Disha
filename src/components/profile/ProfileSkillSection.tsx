
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Mic, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const skills = [
  "Electrical Wiring", "Circuit Repair", "Industrial Installation", "Household Wiring", 
  "Panel Board Installation", "Switchgear Maintenance", "Transformer Installation",
  "Motor Control", "Lighting Systems", "Electronic Repairs"
];

const ProfileSkillSection = () => {
  const [userSkills, setUserSkills] = useState(['Electrical Wiring', 'Circuit Repair', 'Industrial Installation']);
  const [newSkill, setNewSkill] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const addSkill = () => {
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill('');
      toast({
        description: "Skill added successfully!"
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setUserSkills([...userSkills, "Lighting Systems"]);
      toast({
        title: "Voice input processed",
        description: "Added 'Lighting Systems' to your skills."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Skills</CardTitle>
          <CardDescription>Add your core skills and competencies</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {userSkills.map(skill => (
                <Badge key={skill} className="px-3 py-1 flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Type a skill to add"
                  list="skill-suggestions"
                />
                <datalist id="skill-suggestions">
                  {skills.filter(skill => !userSkills.includes(skill)).map(skill => (
                    <option key={skill} value={skill} />
                  ))}
                </datalist>
              </div>
              <Button onClick={addSkill}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
              <Button 
                variant="outline" 
                onClick={handleVoiceInput}
                className={isRecording ? "animate-pulse bg-red-50" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Work Experience</CardTitle>
          <CardDescription>Add your relevant work experience</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border rounded-md border-muted">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-md">Senior Electrician</h3>
                  <p className="text-sm text-muted-foreground">ABC Electrical Services</p>
                </div>
                <Badge variant="outline">Current</Badge>
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span>March 2020 - Present</span>
                <span className="mx-2">•</span>
                <span>3 years, 2 months</span>
              </div>
              <p className="mt-3 text-sm">
                Responsible for installing, maintaining, and repairing electrical systems and equipment in both residential and commercial buildings. Led a team of 3 junior electricians.
              </p>
            </div>
            
            <div className="p-4 border rounded-md border-muted">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-md">Electrician</h3>
                  <p className="text-sm text-muted-foreground">XYZ Electrical Company</p>
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span>June 2017 - February 2020</span>
                <span className="mx-2">•</span>
                <span>2 years, 8 months</span>
              </div>
              <p className="mt-3 text-sm">
                Installed and maintained electrical systems in residential buildings. Ensured all work complied with local electrical codes and safety standards.
              </p>
            </div>
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Another Experience
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">About Me</CardTitle>
          <CardDescription>Write a brief summary about yourself</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Tell employers about yourself, your skills, and experience."
              className="min-h-[120px]"
              defaultValue="Skilled electrician with 5+ years of experience in residential and commercial electrical work. Strong knowledge of electrical codes and safety standards. Experienced in troubleshooting complex electrical issues and leading small teams of electricians."
            />
            
            <div className="flex items-start gap-2 bg-muted/40 rounded-md p-3">
              <Check className="h-5 w-5 text-nayidisha-blue mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Pro tip:</span> Include your years of experience, key skills, and what makes you stand out as a candidate.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="ml-auto"
            onClick={() => {
              toast({
                title: "Summary saved",
                description: "Your profile summary has been updated."
              });
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSkillSection;

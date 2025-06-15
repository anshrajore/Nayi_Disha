import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  Tag,
  Calendar,
  Building,
  Shield,
  Zap,
  HeartHandshake,
  Wallet,
  List,
  UserCheck,
  Share2,
  Phone,
} from 'lucide-react';

const Employers = () => {
  const navigate = useNavigate();
  
  const handlePostJob = () => {
    navigate('/post-job');
  };
  
  return (
    <Layout>
      <div className="bg-gradient-to-r from-nayidisha-blue-50 to-nayidisha-blue-100 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-nayidisha-blue">
                Find the Right Talent for Your Business
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Post jobs, screen applicants, and hire qualified blue-collar workers all in one place. 
                NayiDisha connects you with pre-vetted candidates who match your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-nayidisha-blue hover:bg-nayidisha-blue-600"
                  onClick={handlePostJob}
                >
                  Post a Job
                </Button>
                <Button size="lg" variant="outline">
                  Learn More <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-nayidisha-blue-300 to-nayidisha-blue-500 opacity-20 animate-pulse"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-4 bg-nayidisha-blue text-white">
                      <h3 className="font-medium">Job Posting</h3>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold mb-2">Electricians Needed</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Building size={14} className="mr-1" />
                        <span>ABC Contractors</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Tag size={14} className="mr-1" />
                        <span>₹18K - ₹25K per month</span>
                      </div>
                      <div className="mt-6 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="flex justify-between mt-8">
                        <Button size="sm" className="bg-nayidisha-blue">Post Now</Button>
                        <Button size="sm" variant="outline">Preview</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose NayiDisha for Hiring?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform connects you with pre-vetted blue-collar workers, simplifying your hiring process and saving you time and money.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<UserCheck className="h-10 w-10 text-nayidisha-blue" />}
            title="Pre-Vetted Candidates"
            description="All workers on our platform are pre-screened and verified with background checks and skill assessments."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-nayidisha-blue" />}
            title="Fast Hiring"
            description="Fill positions quickly with our large pool of qualified candidates ready to start work immediately."
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-nayidisha-blue" />}
            title="Reduced Risk"
            description="Our thorough verification process minimizes hiring risks and ensures quality talent."
          />
          <FeatureCard 
            icon={<Wallet className="h-10 w-10 text-nayidisha-blue" />}
            title="Cost-Effective"
            description="Save on recruitment costs with our affordable plans designed for businesses of all sizes."
          />
        </div>
      </div>

      <div className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Post jobs, find candidates, and hire the right talent in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Post a Job"
              description="Create a detailed job listing with your requirements, location, and compensation details."
            />
            <StepCard 
              number="2"
              title="Review Applicants"
              description="Receive applications from qualified candidates and review their profiles, skills, and experience."
            />
            <StepCard 
              number="3"
              title="Hire & Onboard"
              description="Select the best candidate, schedule interviews, and efficiently complete the hiring process."
            />
          </div>
        </div>
      </div>

      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your hiring needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            title="Basic"
            price="₹999"
            description="For small businesses with occasional hiring needs"
            features={[
              "Post up to 3 jobs per month",
              "Access to basic candidate profiles",
              "Email support",
              "30-day job listings"
            ]}
            highlighted={false}
          />
          <PricingCard 
            title="Professional"
            price="₹2,499"
            description="For growing businesses with regular hiring needs"
            features={[
              "Post up to 10 jobs per month",
              "Access to detailed candidate profiles",
              "Priority candidate matching",
              "Email and phone support",
              "45-day job listings"
            ]}
            highlighted={true}
          />
          <PricingCard 
            title="Enterprise"
            price="Custom"
            description="For large businesses with ongoing hiring requirements"
            features={[
              "Unlimited job postings",
              "Premium candidate matching",
              "Dedicated account manager",
              "Custom integration options",
              "Advanced analytics",
              "60-day job listings"
            ]}
            highlighted={false}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-nayidisha-blue-700 to-nayidisha-blue py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Find the Perfect Candidates?</h2>
              <p className="text-lg mb-8 text-white opacity-90">
                Join thousands of businesses who trust NayiDisha for their blue-collar staffing needs. 
                Post your first job today and start receiving applications from qualified candidates.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-nayidisha-blue hover:bg-gray-100"
                  onClick={handlePostJob}
                >
                  Post a Job Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input placeholder="Your Company Ltd." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="john@company.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Tell us about your hiring needs..." />
                </div>
                <Button className="w-full">Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients have to say about their experience with NayiDisha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="We've reduced our hiring time by 60% since using NayiDisha. The quality of candidates is much better than what we found through traditional channels."
            name="Rajesh Kumar"
            company="Sunshine Builders"
            role="HR Manager"
          />
          <TestimonialCard 
            quote="The verification process gives us peace of mind. We know that every worker we hire through NayiDisha has been properly vetted and has the skills they claim."
            name="Priya Sharma"
            company="Elite Electrical Services"
            role="Owner"
          />
          <TestimonialCard 
            quote="As a growing company, we needed to quickly scale our workforce. NayiDisha helped us hire 25 qualified workers in just two weeks."
            name="Vikram Singh"
            company="Modern Plumbing Solutions"
            role="Operations Director"
          />
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 -mt-2 -ml-2 bg-nayidisha-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <Card className="pl-8 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const PricingCard = ({ title, price, description, features, highlighted }) => {
  return (
    <Card className={`relative overflow-hidden ${highlighted ? 'border-nayidisha-blue border-2' : ''}`}>
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-nayidisha-blue text-white text-xs px-3 py-1 transform rotate-45 translate-x-4 -translate-y-1">
            Popular
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle size={16} className="text-green-600 mr-2 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${highlighted ? 'bg-nayidisha-blue hover:bg-nayidisha-blue-600' : ''}`}>
          {price === "Custom" ? "Contact Sales" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const TestimonialCard = ({ quote, name, company, role }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 text-3xl text-gray-400">"</div>
        <p className="mb-6 text-muted-foreground italic">{quote}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-600 flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}, {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Employers;

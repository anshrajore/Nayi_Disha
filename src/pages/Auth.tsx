import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Eye, EyeOff, Mail, Phone, Lock, User } from 'lucide-react';
import { WavyBackground } from '@/components/Animation/WavyBackground';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('signin');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [reCaptchaToken, setReCaptchaToken] = useState<string>('');
  
  // Sign In Form State
  const [signInForm, setSignInForm] = useState({
    phone: '',
    password: ''
  });
  
  // Sign Up Form State
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isEmployer: false
  });

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm({
      ...signInForm,
      [name]: value
    });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!reCaptchaToken) {
      toast({
        title: "Authentication Error",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn(signInForm.phone, signInForm.password, reCaptchaToken);
      
      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to sign in. Please check your credentials.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      
      navigate('/', { replace: true });
    } catch (error: unknown) {
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateSignUpForm = () => {
    if (!signUpForm.fullName.trim()) {
      toast({
        title: "Registration Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!signUpForm.phone.trim()) {
      toast({
        title: "Registration Error",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!signUpForm.password) {
      toast({
        title: "Registration Error",
        description: "Please create a password.",
        variant: "destructive"
      });
      return false;
    }
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!reCaptchaToken) {
      toast({
        title: "Registration Error",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignUpForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(
        signUpForm.phone, 
        signUpForm.password,
        {
          full_name: signUpForm.fullName,
          is_employer: signUpForm.isEmployer
        },
        reCaptchaToken
      );
      
      if (error) {
        toast({
          title: "Registration Error",
          description: error.message || "Failed to sign up. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Account created successfully!",
        description: "You are now signed in.",
      });
      
      navigate('/', { replace: true });
    } catch (error: unknown) {
      toast({
        title: "Registration Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <WavyBackground className="py-20">
        <div className="container max-w-md mx-auto px-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {activeTab === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'signin' 
                  ? 'Sign in to access your account' 
                  : 'Enter your details to get started'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signin-phone"
                          name="phone"
                          placeholder="9876543210"
                          type="tel"
                          value={signInForm.phone}
                          onChange={handleSignInChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="signin-password">Password</Label>
                        <Link to="#" className="text-xs text-nayidisha-blue hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signin-password"
                          name="password"
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          value={signInForm.password}
                          onChange={handleSignInChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <GoogleReCaptcha onVerify={setReCaptchaToken} />

                    <Button 
                      type="submit" 
                      className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-name"
                          name="fullName"
                          placeholder="John Doe"
                          value={signUpForm.fullName}
                          onChange={handleSignUpChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-phone"
                          name="phone"
                          placeholder="9876543210"
                          type="tel"
                          value={signUpForm.phone}
                          onChange={handleSignUpChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-password"
                          name="password"
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          value={signUpForm.password}
                          onChange={handleSignUpChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-confirm-password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          value={signUpForm.confirmPassword}
                          onChange={handleSignUpChange}
                          className="pl-10 text-gray-900 placeholder-gray-400 border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isEmployer"
                        name="isEmployer"
                        checked={signUpForm.isEmployer}
                        onChange={handleSignUpChange}
                        className="rounded border-gray-300"
                        title="I am an employer/recruiter looking to hire"
                      />
                      <Label htmlFor="isEmployer" className="text-sm font-normal">
                        I am an employer/recruiter looking to hire
                      </Label>
                    </div>
                    
                    <GoogleReCaptcha onVerify={setReCaptchaToken} />

                    <Button 
                      type="submit" 
                      className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-muted-foreground">
                By continuing, you agree to our{' '}
                <Link to="#" className="underline text-nayidisha-blue hover:text-nayidisha-blue-600">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="#" className="underline text-nayidisha-blue hover:text-nayidisha-blue-600">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </WavyBackground>
    </Layout>
  );
};

export default Auth;

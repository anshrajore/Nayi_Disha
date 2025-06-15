import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import JobCard, { JobProps } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { AnimatedCard } from '@/components/Animation/AnimatedCard';
import { CounterAnimation } from '@/components/Animation/CounterAnimation';
import { WavyBackground } from '@/components/Animation/WavyBackground';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Mock data for job listings
const featuredJobs: JobProps[] = [{
  id: '1',
  title: 'Plumber for Residential Project',
  company: 'BrightBuild Construction',
  location: 'Delhi, India',
  salary: '15,000 - 20,000/month',
  postedDate: '2 days ago',
  jobType: 'Full-time',
  category: 'Plumbing',
  isUrgent: true,
  isVerified: true
}, {
  id: '2',
  title: 'Experienced Electrician',
  company: 'PowerTech Solutions',
  location: 'Mumbai, Maharashtra',
  salary: '18,000 - 25,000/month',
  postedDate: '1 day ago',
  jobType: 'Full-time',
  category: 'Electrical',
  isVerified: true
}, {
  id: '3',
  title: 'Carpenter for Furniture Workshop',
  company: 'WoodCraft Interiors',
  location: 'Bengaluru, Karnataka',
  salary: '16,000 - 22,000/month',
  postedDate: '3 days ago',
  jobType: 'Full-time',
  category: 'Carpentry',
  isVerified: true
}, {
  id: '4',
  title: 'Driver for Delivery Services',
  company: 'SpeedEx Logistics',
  location: 'Hyderabad, Telangana',
  salary: '14,000 - 18,000/month',
  postedDate: '5 days ago',
  jobType: 'Full-time',
  category: 'Driving',
  isUrgent: true,
  isVerified: true
}];

// Job categories with icons
const categories = [{
  name: 'Plumbing',
  icon: '🔧',
  count: 245
}, {
  name: 'Electrical',
  icon: '⚡',
  count: 312
}, {
  name: 'Carpentry',
  icon: '🪚',
  count: 178
}, {
  name: 'Masonry',
  icon: '🧱',
  count: 156
}, {
  name: 'Driving',
  icon: '🚗',
  count: 289
}, {
  name: 'Housekeeping',
  icon: '🧹',
  count: 201
}, {
  name: 'Security',
  icon: '🔒',
  count: 134
}, {
  name: 'Cooking',
  icon: '🍳',
  count: 167
}, {
  name: 'Tailoring',
  icon: '🧵',
  count: 119
}];

// Success stories
const successStories = [{
  id: '1',
  name: 'Rajesh Kumar',
  job: 'Electrician',
  company: 'Metro Construction',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop',
  story: 'After struggling to find work for months, NayiDisha helped me secure a job with Metro Construction. My income has doubled and I now have job security.'
}, {
  id: '2',
  name: 'Priya Singh',
  job: 'Tailor',
  company: 'Fashion Threads',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
  story: 'The voice assistant on NayiDisha made it easy for me to find tailoring jobs without having to type. I now work at Fashion Threads with a good salary.'
}, {
  id: '3',
  name: 'Mohammed Siddiqui',
  job: 'Plumber',
  company: 'WaterWorks Solutions',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
  story: 'NayiDisha found me a plumbing job that matched my skills perfectly. The notifications keep me updated on new opportunities in my area.'
}];
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const {
    user
  } = useAuth();
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    console.log(`Searching for: ${query} in ${location}`);
    // In a real app, this would trigger a search API call
  };
  return <Layout>
      {/* Hero Section with WavyBackground */}
      <WavyBackground className="relative py-20 px-4 bg-nayidisha-blue text-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                  A New Direction for Your Work Life
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Find jobs that find you. Connect with thousands of employers looking for skilled workers like you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                  <Button asChild size="lg" className="bg-nayidisha-orange hover:bg-nayidisha-orange/90">
                    <Link to="/auth">Get Hired</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to={user ? "/post-job" : "/auth"} className="make the text color black ">Post a Job</Link>
                  </Button>
                </div>

                <div className="mt-6 flex justify-center lg:justify-start">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
              <div className="relative max-w-md">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-nayidisha-orange/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl">
                  <div className="mb-6">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-sm">
                    <span>Popular:</span>
                    {['Electrician', 'Plumber', 'Driver', 'Carpenter'].map(term => <button key={term} className="bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 transition-colors" onClick={() => handleSearch(term, '')}>
                        {term}
                      </button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WavyBackground>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Jobs</h2>
            <Button variant="ghost" asChild>
              <Link to="/jobs" className="flex items-center">
                View All Jobs <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map(job => <AnimatedCard key={job.id} className="h-full">
                <JobCard {...job} />
              </AnimatedCard>)}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Job Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find opportunities across various skills and trades that match your expertise
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(category => <AnimatedCard key={category.name} className="h-full">
                <Link to={`/jobs?category=${category.name}`} className="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-muted border shadow-sm hover:shadow-md transition-shadow h-full">
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">{category.count} jobs</span>
                </Link>
              </AnimatedCard>)}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How NayiDisha Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to find your next job opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-nayidisha-blue/10 text-nayidisha-blue flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and create your profile with your skills, experience, and job preferences. Or simply use our voice assistant to get started.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-nayidisha-blue/10 text-nayidisha-blue flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Explore Opportunities</h3>
              <p className="text-muted-foreground">
                Browse through job listings tailored to your skills and preferences. Filter by location, salary, and job type.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-nayidisha-blue/10 text-nayidisha-blue flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Apply & Get Hired</h3>
              <p className="text-muted-foreground">
                Apply for jobs with just one click and receive updates about your application status. Our AI helps match you with the right employers.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
              <Link to="/auth">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from workers who found great jobs through NayiDisha
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map(story => <AnimatedCard key={story.id} className="h-full">
                <div className="bg-white dark:bg-muted p-6 rounded-lg border shadow-sm h-full">
                  <div className="flex items-center mb-4">
                    <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <h3 className="font-medium">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.job} at {story.company}</p>
                    </div>
                  </div>
                  <p className="italic">{story.story}</p>
                </div>
              </AnimatedCard>)}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-nayidisha-blue mb-1">
                <CounterAnimation end={25000} suffix="+" />
              </div>
              <p className="text-muted-foreground">Jobs Posted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-nayidisha-blue mb-1">
                <CounterAnimation end={78000} suffix="+" delay={200} />
              </div>
              <p className="text-muted-foreground">Registered Workers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-nayidisha-blue mb-1">
                <CounterAnimation end={5000} suffix="+" delay={400} />
              </div>
              <p className="text-muted-foreground">Hiring Companies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-nayidisha-blue mb-1">
                <CounterAnimation end={42} suffix="K+" delay={600} />
              </div>
              <p className="text-muted-foreground">Successful Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-nayidisha-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of workers who have found their perfect job through NayiDisha
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
            <Button asChild size="lg" className="bg-nayidisha-orange hover:bg-nayidisha-orange/90">
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Index;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-md p-1 mr-1">
              <span className="text-white font-bold text-lg">ND</span>
            </div>
            <span className="font-bold text-xl">NayiDisha</span>
          </Link>
          <p className="text-muted-foreground">
            Connecting blue-collar workers with opportunities that match their skills and aspirations.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">For Job Seekers</h3>
          <ul className="space-y-2">
            <li><Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">Browse Jobs</Link></li>
            <li><Link to="/skills" className="text-muted-foreground hover:text-foreground transition-colors">Skill Development</Link></li>
            <li><Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">Create Profile</Link></li>
            <li><Link to="/saved-jobs" className="text-muted-foreground hover:text-foreground transition-colors">Saved Jobs</Link></li>
            <li><Link to="/application-status" className="text-muted-foreground hover:text-foreground transition-colors">Application Status</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">For Employers</h3>
          <ul className="space-y-2">
            <li><Link to="/employers" className="text-muted-foreground hover:text-foreground transition-colors">Post a Job</Link></li>
            <li><Link to="/employers/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/employers/candidates" className="text-muted-foreground hover:text-foreground transition-colors">Browse Candidates</Link></li>
            <li><Link to="/employers/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Employer Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container border-t mt-8 pt-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} NayiDisha. All rights reserved.</p>
        <p className="text-sm mt-2">Connecting opportunities. Empowering workers. Building futures.</p>
      </div>
    </footer>
  );
};

export default Footer;

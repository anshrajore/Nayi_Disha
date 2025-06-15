
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-md p-1 mr-1">
              <span className="text-white font-bold text-lg">ND</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">NayiDisha</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/jobs" active={isActive('/jobs')}>Job Listings</NavLink>
          <NavLink to="/skills" active={isActive('/skills')}>Skill Development</NavLink>
          <NavLink to="/employers" active={isActive('/employers')}>For Employers</NavLink>
          <NavLink to="/about" active={isActive('/about')}>About Us</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-nayidisha-orange rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <NotificationItem 
                  title="New job match: Electrician"
                  description="A new job matching your skills has been posted in Delhi."
                  time="10 min ago"
                  isNew
                />
                <NotificationItem 
                  title="Application Update"
                  description="Your application for Plumber at ABC Company has been reviewed."
                  time="2 hours ago"
                  isNew
                />
                <NotificationItem 
                  title="Profile Suggestion"
                  description="Complete your profile to get better job recommendations."
                  time="1 day ago"
                />
                <NotificationItem 
                  title="Skill Assessment"
                  description="Take our electrical wiring assessment to showcase your skills."
                  time="2 days ago"
                />
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon">
            <Search size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/saved-jobs">Saved Jobs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/applications">Applications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild className="hidden md:inline-flex btn-primary">
            <Link to="/auth">Login / Register</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-x-0 top-16 p-4 bg-background border-b md:hidden transition-all duration-300 ease-in-out",
        menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col space-y-2">
          <MobileNavLink to="/jobs" active={isActive('/jobs')} onClick={() => setMenuOpen(false)}>Job Listings</MobileNavLink>
          <MobileNavLink to="/skills" active={isActive('/skills')} onClick={() => setMenuOpen(false)}>Skill Development</MobileNavLink>
          <MobileNavLink to="/employers" active={isActive('/employers')} onClick={() => setMenuOpen(false)}>For Employers</MobileNavLink>
          <MobileNavLink to="/about" active={isActive('/about')} onClick={() => setMenuOpen(false)}>About Us</MobileNavLink>
          <Button asChild className="mt-2 w-full btn-primary">
            <Link to="/auth" onClick={() => setMenuOpen(false)}>Login / Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, active, onClick, children }: { to: string; active: boolean; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "px-4 py-3 rounded-md text-lg font-medium transition-colors block",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
};

const NotificationItem = ({ title, description, time, isNew = false }) => {
  return (
    <div className={`p-3 hover:bg-muted cursor-pointer ${isNew ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm">{title}</h4>
        {isNew && (
          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">New</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="text-xs text-muted-foreground mt-1">{time}</div>
    </div>
  );
};

export default Header;

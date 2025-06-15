
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  className?: string;
  initialQuery?: string;
  initialLocation?: string;
}

const SearchBar = ({ 
  onSearch, 
  className, 
  initialQuery = "", 
  initialLocation = "" 
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) onSearch(query, location);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-muted"
            placeholder="Job title, skills, or keywords"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 bg-white dark:bg-muted"
            placeholder="City, state, or area"
          />
        </div>
        <Button type="submit" className="btn-primary h-10 px-4 py-2 md:w-auto w-full">
          <Search className="h-4 w-4 mr-2 md:block hidden" />
          Search Jobs
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

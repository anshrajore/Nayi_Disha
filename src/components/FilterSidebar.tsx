
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Job categories for blue collar workers
const jobCategories = [
  "Plumbing", "Electrical", "Carpentry", "Masonry", 
  "Driving", "Housekeeping", "Security", "Cooking", "Tailoring"
];

const jobTypes = ["Full-time", "Part-time", "Contractual", "Daily Wages", "Gig work"];

const experienceLevels = ["No experience", "Entry-level", "Experienced", "Advanced"];

// States and districts mapping
const statesAndDistricts = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"]
};

// For type safety
type StateType = keyof typeof statesAndDistricts;

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
  className?: string;
  isMobile?: boolean;
}

const FilterSidebar = ({ onFilterChange, className, isMobile = false }: FilterSidebarProps) => {
  const [salaryRange, setSalaryRange] = useState<number[]>([5000, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<StateType | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  // Update available districts when state changes
  useEffect(() => {
    if (selectedState && selectedState in statesAndDistricts) {
      setAvailableDistricts(statesAndDistricts[selectedState as StateType]);
      setSelectedDistrict(""); // Reset district when state changes
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedState]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Handle job type selection
  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Handle experience level selection
  const handleExperienceChange = (level: string) => {
    setSelectedExperienceLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  // Handle salary range change
  const handleSalaryChange = (value: number[]) => {
    setSalaryRange(value);
  };

  // Apply all filters
  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        jobTypes: selectedJobTypes,
        experienceLevels: selectedExperienceLevels,
        salaryRange: salaryRange,
        location: selectedDistrict ? `${selectedDistrict}, ${selectedState}` : selectedState
      });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSalaryRange([5000, 50000]);
    setSelectedState("");
    setSelectedDistrict("");
    
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return (
    <div className={`${className} space-y-6 p-4 rounded-lg bg-white dark:bg-muted border`}>
      <div>
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mb-4"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>
      
      <Separator />
      
      <Accordion type="multiple" defaultValue={["category", "jobType", "location", "experience", "salary"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Job Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {jobCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="jobType">
          <AccordionTrigger className="font-semibold">Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`} 
                    checked={selectedJobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeChange(type)}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="font-semibold">Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="state-select">State</Label>
                <Select 
                  value={selectedState} 
                  onValueChange={(value) => setSelectedState(value as StateType)}
                >
                  <SelectTrigger id="state-select">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statesAndDistricts).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedState && (
                <div className="space-y-2">
                  <Label htmlFor="district-select">District</Label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger id="district-select">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="experience">
          <AccordionTrigger className="font-semibold">Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`}
                    checked={selectedExperienceLevels.includes(level)}
                    onCheckedChange={() => handleExperienceChange(level)}
                  />
                  <Label htmlFor={`level-${level}`}>{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="salary">
          <AccordionTrigger className="font-semibold">Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="mt-6 px-2">
              <Slider 
                value={salaryRange}
                min={0} 
                max={100000} 
                step={1000}
                onValueChange={handleSalaryChange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>₹{salaryRange[0].toLocaleString()}</span>
                <span>₹{salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;

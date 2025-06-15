import { supabase } from "@/integrations/supabase/client";

// Sample job data
const sampleJobs = [
  {
    title: "Electrician - Construction Site",
    job_type: "Full-time",
    category: "Electrical",
    location_city: "Mumbai",
    location_state: "Maharashtra",
    salary_min: 25000,
    salary_max: 35000,
    salary_period: "month",
    description: "Looking for skilled electricians to work on a large commercial construction project. Experience with industrial wiring required.",
    is_urgent: true,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    physical_requirements: "Must be able to lift up to 20kg and work at heights",
    work_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    certifications_required: ["Basic Electrical Safety", "Wireman License"]
  },
  {
    title: "Plumber Assistant",
    job_type: "Part-time",
    category: "Plumbing",
    location_city: "Pune",
    location_state: "Maharashtra",
    salary_min: 15000,
    salary_max: 20000,
    salary_period: "month",
    description: "Assisting senior plumbers with residential and small commercial plumbing jobs. Great opportunity to learn and grow.",
    is_urgent: false,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    physical_requirements: "Good physical stamina required",
    work_days: ["Monday", "Wednesday", "Friday"]
  },
  {
    title: "Delivery Driver",
    job_type: "Full-time",
    category: "Driving",
    location_city: "Bengaluru",
    location_state: "Karnataka",
    salary_min: 18000,
    salary_max: 25000,
    salary_period: "month",
    description: "Delivery drivers needed for a growing e-commerce company. Must have valid driving license and good knowledge of city roads.",
    is_urgent: true,
    is_verified: false,
    status: "active",
    employer_id: "", // Will be set dynamically
    certifications_required: ["Driving License"]
  },
  {
    title: "Security Guard - Night Shift",
    job_type: "Full-time",
    category: "Security",
    location_city: "Delhi",
    location_state: "Delhi",
    salary_min: 16000,
    salary_max: 22000,
    salary_period: "month",
    description: "Looking for reliable security guards for night shift at a residential complex. Previous security experience preferred.",
    is_urgent: false,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    work_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    shift_start: "20:00:00",
    shift_end: "08:00:00"
  },
  {
    title: "Carpenter for Custom Furniture",
    job_type: "Contractual",
    category: "Carpentry",
    location_city: "Hyderabad",
    location_state: "Telangana",
    salary_min: 30000,
    salary_max: 40000,
    salary_period: "month",
    description: "Skilled carpenter needed for crafting custom furniture. Experience with different wood types and finishing techniques required.",
    is_urgent: false,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    physical_requirements: "Good eye-hand coordination and attention to detail"
  },
  {
    title: "Cook for Corporate Cafeteria",
    job_type: "Full-time",
    category: "Cooking",
    location_city: "Chennai",
    location_state: "Tamil Nadu",
    salary_min: 22000,
    salary_max: 28000,
    salary_period: "month",
    description: "Experienced cook needed for a corporate cafeteria serving 200+ employees daily. Knowledge of South Indian cuisine required.",
    is_urgent: true,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    work_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    shift_start: "07:00:00",
    shift_end: "16:00:00"
  },
  {
    title: "House Cleaning Staff",
    job_type: "Part-time",
    category: "Housekeeping",
    location_city: "Lucknow",
    location_state: "Uttar Pradesh",
    salary_min: 12000,
    salary_max: 15000,
    salary_period: "month",
    description: "Looking for reliable house cleaning staff for premium residential apartments. Training provided for the right candidates.",
    is_urgent: false,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    physical_requirements: "Ability to stand for long periods and perform cleaning tasks"
  },
  {
    title: "Tailor for Boutique",
    job_type: "Full-time",
    category: "Tailoring",
    location_city: "Jaipur",
    location_state: "Rajasthan",
    salary_min: 20000,
    salary_max: 30000,
    salary_period: "month",
    description: "Seeking experienced tailor for a high-end boutique. Must be skilled in both traditional and western clothing alterations.",
    is_urgent: false,
    is_verified: true,
    status: "active",
    employer_id: "", // Will be set dynamically
    min_experience_months: 24
  }
];

/**
 * Adds sample jobs to the database
 * @returns Promise resolving to success message or error
 */
export const addSampleJobs = async (employerId: string): Promise<string> => {
  try {
    // Check if we already have jobs in the database
    const { count, error: countError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // If we already have jobs, don't add sample jobs again
    if (count && count > 0) {
      return "Sample jobs already exist";
    }

    // Add employer ID to all sample jobs
    const jobsWithEmployerId = sampleJobs.map(job => ({
      ...job,
      employer_id: employerId
    }));
    
    // Insert sample jobs
    const { error } = await supabase
      .from('jobs')
      .insert(jobsWithEmployerId);
    
    if (error) throw error;
    
    return "Sample jobs added successfully";
  } catch (error: any) {
    console.error("Failed to add sample jobs:", error);
    return `Error adding sample jobs: ${error.message}`;
  }
};

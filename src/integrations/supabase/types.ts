export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_id: string
          applied_at: string | null
          employer_notes: string | null
          id: string
          job_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id: string
          applied_at?: string | null
          employer_notes?: string | null
          id?: string
          job_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string
          applied_at?: string | null
          employer_notes?: string | null
          id?: string
          job_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "job_seeker_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          document_name: string
          document_type: string
          document_url: string
          id: string
          updated_at: string | null
          uploaded_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          document_name: string
          document_type: string
          document_url: string
          id?: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          document_name?: string
          document_type?: string
          document_url?: string
          id?: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_profiles: {
        Row: {
          company_address: string | null
          company_description: string | null
          company_logo: string | null
          company_name: string | null
          company_size: string | null
          company_website: string | null
          id: string
          industry: string | null
          is_verified: boolean | null
          updated_at: string | null
        }
        Insert: {
          company_address?: string | null
          company_description?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          id: string
          industry?: string | null
          is_verified?: boolean | null
          updated_at?: string | null
        }
        Update: {
          company_address?: string | null
          company_description?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_seeker_profiles: {
        Row: {
          availability_date: string | null
          date_of_birth: string | null
          desired_salary_max: number | null
          desired_salary_min: number | null
          education_level: string | null
          gender: string | null
          govt_id_number: string | null
          govt_id_type: string | null
          id: string
          months_experience: number | null
          preferred_job_types: string[] | null
          preferred_locations: string[] | null
          skills: string[] | null
          updated_at: string | null
          willing_to_relocate: boolean | null
          years_experience: number | null
        }
        Insert: {
          availability_date?: string | null
          date_of_birth?: string | null
          desired_salary_max?: number | null
          desired_salary_min?: number | null
          education_level?: string | null
          gender?: string | null
          govt_id_number?: string | null
          govt_id_type?: string | null
          id: string
          months_experience?: number | null
          preferred_job_types?: string[] | null
          preferred_locations?: string[] | null
          skills?: string[] | null
          updated_at?: string | null
          willing_to_relocate?: boolean | null
          years_experience?: number | null
        }
        Update: {
          availability_date?: string | null
          date_of_birth?: string | null
          desired_salary_max?: number | null
          desired_salary_min?: number | null
          education_level?: string | null
          gender?: string | null
          govt_id_number?: string | null
          govt_id_type?: string | null
          id?: string
          months_experience?: number | null
          preferred_job_types?: string[] | null
          preferred_locations?: string[] | null
          skills?: string[] | null
          updated_at?: string | null
          willing_to_relocate?: boolean | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_seeker_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          category: string
          certifications_required: string[] | null
          created_at: string | null
          description: string | null
          employer_id: string
          id: string
          incentives: string | null
          is_highlighted: boolean | null
          is_urgent: boolean | null
          is_verified: boolean | null
          job_type: string
          languages_required: string[] | null
          location_address: string | null
          location_city: string | null
          location_coordinates: unknown | null
          location_pincode: string | null
          location_state: string | null
          min_education: string | null
          min_experience_months: number | null
          physical_requirements: string | null
          salary_max: number | null
          salary_min: number | null
          salary_period: string | null
          shift_end: string | null
          shift_start: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          work_days: string[] | null
        }
        Insert: {
          category: string
          certifications_required?: string[] | null
          created_at?: string | null
          description?: string | null
          employer_id: string
          id?: string
          incentives?: string | null
          is_highlighted?: boolean | null
          is_urgent?: boolean | null
          is_verified?: boolean | null
          job_type: string
          languages_required?: string[] | null
          location_address?: string | null
          location_city?: string | null
          location_coordinates?: unknown | null
          location_pincode?: string | null
          location_state?: string | null
          min_education?: string | null
          min_experience_months?: number | null
          physical_requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          shift_end?: string | null
          shift_start?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          work_days?: string[] | null
        }
        Update: {
          category?: string
          certifications_required?: string[] | null
          created_at?: string | null
          description?: string | null
          employer_id?: string
          id?: string
          incentives?: string | null
          is_highlighted?: boolean | null
          is_urgent?: boolean | null
          is_verified?: boolean | null
          job_type?: string
          languages_required?: string[] | null
          location_address?: string | null
          location_city?: string | null
          location_coordinates?: unknown | null
          location_pincode?: string | null
          location_state?: string | null
          min_education?: string | null
          min_experience_months?: number | null
          physical_requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          shift_end?: string | null
          shift_start?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          work_days?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_employer: boolean | null
          phone_number: string | null
          preferred_language: string | null
          profile_image: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_employer?: boolean | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_image?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_employer?: boolean | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_image?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          rating: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          rating: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          proficiency: number | null
          skill_id: string
          user_id: string
          verified: boolean | null
          verified_by: string | null
          years_experience: number | null
        }
        Insert: {
          proficiency?: number | null
          skill_id: string
          user_id: string
          verified?: boolean | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Update: {
          proficiency?: number | null
          skill_id?: string
          user_id?: string
          verified?: boolean | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "job_seeker_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

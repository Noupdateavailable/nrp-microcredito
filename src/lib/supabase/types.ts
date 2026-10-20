// Generated from the Supabase schema (project nrp-microcredito). Regenerate after
// schema changes with: npx supabase gen types typescript --project-id <ref>

type Enums = {
  application_status: "new" | "reviewing" | "approved" | "rejected";
  income_band: "lt10k" | "10to25k" | "25to50k" | "gt50k";
  loan_product: "business" | "personal" | "entrepreneur";
};

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18";
  };
  public: {
    Tables: {
      loan_applications: {
        Row: {
          amount_mzn: number;
          city: string;
          created_at: string;
          email: string | null;
          full_name: string;
          id: string;
          locale: string;
          monthly_income: Enums["income_band"];
          occupation: string;
          phone: string;
          product: Enums["loan_product"];
          purpose: string;
          status: Enums["application_status"];
          term_months: number;
          updated_at: string;
        };
        Insert: {
          amount_mzn: number;
          city: string;
          created_at?: string;
          email?: string | null;
          full_name: string;
          id?: string;
          locale?: string;
          monthly_income: Enums["income_band"];
          occupation: string;
          phone: string;
          product: Enums["loan_product"];
          purpose: string;
          status?: Enums["application_status"];
          term_months: number;
          updated_at?: string;
        };
        Update: {
          amount_mzn?: number;
          city?: string;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          id?: string;
          locale?: string;
          monthly_income?: Enums["income_band"];
          occupation?: string;
          phone?: string;
          product?: Enums["loan_product"];
          purpose?: string;
          status?: Enums["application_status"];
          term_months?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: Enums;
    CompositeTypes: { [_ in never]: never };
  };
};

export type LoanApplication = Database["public"]["Tables"]["loan_applications"]["Row"];

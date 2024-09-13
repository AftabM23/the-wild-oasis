import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bjstfgvivrrufoflsrrj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqc3RmZ3ZpdnJydWZvZmxzcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzg1MDYsImV4cCI6MjA0MTc1NDUwNn0.-qtiLpOHPZS1KDefCsl_NieGWUALG-KsOg4XUBW61Hs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

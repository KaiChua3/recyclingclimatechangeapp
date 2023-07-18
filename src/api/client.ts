import { createClient } from "@supabase/supabase-js";
import { projectURL , projectKey } from "./constants";

export const supabase = createClient(projectURL, projectKey);
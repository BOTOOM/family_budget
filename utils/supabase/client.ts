import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseURL } from "./constants";

export const createClient = () =>
	createBrowserClient(supabaseURL, supabaseAnonKey);

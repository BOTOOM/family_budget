import { createClient } from "@/utils/supabase/server";
import { Banks } from "./types";

export async function getBanks(): Promise<Banks[]> {
  const supabaseServer = createClient();
  let { data, error } = await supabaseServer
    .from("Banks")
    .select("id, name")
    .returns<Banks[]>();
  if (error) throw error;

  if (!data) {
    return [];
  }

  const banks: Banks[] = data;
  return banks;
}

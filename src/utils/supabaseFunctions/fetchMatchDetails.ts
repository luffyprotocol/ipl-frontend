// import { createClient } from "@/utils/supabase/server";

// export default async function fetchMatchDetail(slug: string) {
//   const supabase = createClient();
//   const { data: fixture, error } = await supabase
//     .from("fixture")
//     .select("*")
//     .eq("id", slug);
//   if (error) throw new Error(error.message);
//   return fixture;
// }

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function fetchMatchDetail(slug: string): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data: fixture, error } = await supabase
      .from("fixture")
      .select("*")
      .eq("matchId", slug);
    if (error) throw new Error(error.message);
    return { message: "Success", response: fixture };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}

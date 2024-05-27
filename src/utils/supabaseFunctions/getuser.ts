// import { createClient } from "@/utils/supabase/server";

// export default async function getUser(address: string) {
//   const supabase = createClient();

//   let { data: userDetails, error } = await supabase
//     .from("userDetails")
//     .select("*")
//     .eq("address", address);

//   if (error) throw new Error(error.message);
//   return userDetails;
// }
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function getUser(address: string): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data: userDetails, error } = await supabase
      .from("userDetails")
      .select("*")
      .eq("address", address);
    if (error) throw new Error(error.message);
    return { message: "Success", response: userDetails };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}

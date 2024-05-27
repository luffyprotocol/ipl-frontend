// import { createClient } from "@/utils/supabase/server";

// export default async function insertUserDetails(
//   name: string,
//   address: string,
//   locality: string
// ) {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from("userDetails")
//     .insert([{ name: name }, { address: address }, { locality: locality }])
//     .select();

//   if (error) throw new Error(error.message);
//   return data;
// }

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function insertUserDetails(
  name: string,
  address: string,
  locality: string
): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data, error } = await supabase
      .from("userDetails")
      .insert([{ name: name }, { address: address }, { locality: locality }])
      .select();
    if (error) throw new Error(error.message);
    return { message: "Success", response: data };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}

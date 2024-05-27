import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function addFixture({
  id,
  team1,
  team2,
}: {
  id: number;
  team1: string;
  team2: string;
}): Promise<{
  message: string;
  response: any;
}> {
  // const supabase = createClient();

  try {
    const { data: fixture, error } = await supabase
      .from("fixture")
      .select("*")
      .eq("id", id);
    if (error || fixture == null || fixture.length === 0) {
      const { data: fixture, error } = supabase
        ? await supabase
            .from("fixture")
            .insert([
              {
                id: id,
                matchId: id,
                team1,
                team2,
                startDate: new Date(),
                endDate: new Date(),
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };

      if (error) {
        console.log(error);

        return { message: "Error creating baby request", response: "" };
      } else {
        return {
          message: "Success",
          response: fixture,
        };
      }
    } else {
      return { message: "Fixture already exists", response: fixture };
    }
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}

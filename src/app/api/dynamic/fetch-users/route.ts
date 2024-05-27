// pages/api/getImageUrl.ts

import axios from "axios";

const DYNAMIC_API_KEY = process.env.NEXT_PUBLIC_DYNAMIC_API_KEY;
const DYNAMIC_ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;

export async function GET(req: Request, res: Response) {
  try {
    const response = await axios.get(
      `https://app.dynamicauth.com/api/v0/environments/${DYNAMIC_ENV_ID}/users?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${DYNAMIC_API_KEY}`,
        },
      }
    );
    const data = response.data;
    console.log(response.data);
    return Response.json({ success: true, data: data });
  } catch (e) {
    console.log("ERROR OCCURED");
    console.log(e);
    return Response.json({ success: false, data: e });
  }
}

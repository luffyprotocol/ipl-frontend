// pages/api/getImageUrl.ts

import { NextApiRequest, NextApiResponse } from "next";

const getImage = async (id: number): Promise<string | null> => {
  const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${id}`;
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.CRICKET_API || "",
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  };

  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.image || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const imageUrl = await getImage(parseInt(id, 10));
    if (imageUrl) {
      return res.status(200).json({ imageUrl });
    } else {
      return res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

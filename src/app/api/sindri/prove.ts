// pages/api/getImageUrl.ts

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { proofInputs } = req.body;
  const SINDRI_API_KEY =
    process.env.NEXT_PUBLIC_SINDRI_API_KEY || "<your-key-here>";

  // Use v1 of the Sindri API.
  axios.defaults.baseURL = "https://sindri.app/api/v1";
  // Authorize all future requests with an `Authorization` header.
  axios.defaults.headers.common["Authorization"] = `Bearer ${SINDRI_API_KEY}`;
  // Expect 2xx responses for all requests.
  axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

  const circuitId = "8407979b-1359-401f-8259-2130ab7b46e1";
  try {
    const proveResponse = await axios.post(`/circuit/${circuitId}/prove`, {
      proof_input: proofInputs,
    });
    const proofId = proveResponse.data.proof_id;
    console.log("Proof ID:", proofId);
    let startTime = Date.now();
    let proofDetailResponse;
    while (true) {
      proofDetailResponse = await axios.get(`/proof/${proofId}/detail`);
      const { status } = proofDetailResponse.data;
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      if (status === "Ready") {
        console.log(`Polling succeeded after ${elapsedSeconds} seconds.`);
        break;
      } else if (status === "Failed") {
        throw new Error(
          `Polling failed after ${elapsedSeconds} seconds: ${proofDetailResponse.data.error}.`
        );
      } else if (Date.now() - startTime > 30 * 60 * 1000) {
        throw new Error("Timed out after 30 minutes.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("Proof Output:");
    console.log(proofDetailResponse.data.proof);
    console.log("Public Output:");
    console.log(proofDetailResponse.data.public);
    res.status(200).json({
      proof: proofDetailResponse.data.proof,
    });
  } catch (error) {
    console.log("Error generating proof:");
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

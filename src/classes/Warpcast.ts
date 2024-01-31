import { config } from "@/config/config";
import { z } from "zod";

// Neynar's api
const apiUrl = "https://api.neynar.com";

const recastsSchema = z.array(
  z.object({
    fid: z.number(),
    fname: z.string().min(1),
  })
);

const validateMessageSchema = z.object({
  valid: z.literal(true),
  action: z.object({
    interactor: z.object({
      fid: z.number(),
      username: z.string(),
      custody_address: z.string().startsWith("0x"),
    }),
    tapped_button: z.object({
      index: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    }),
  }),
});

export class Warpcast {
  private static get computeDefaultHeader() {
    return {
      api_key: config.neynar.apiKey as string,
      "content-type": "application/json",
    };
  }

  private static async fetchAllRecasts() {
    const url = `${apiUrl}/v2/farcaster/cast?identifier=${config.warpcast.castHas}&type=hash`;

    const response = await fetch(url, {
      headers: Warpcast.computeDefaultHeader,
      method: "GET",
    });

    const data = await response
      .json()
      .then((res) => res.cast.reactions.recasts)
      .then(recastsSchema.parse);

    return data;
  }

  public static async hasRecasted(fid: number) {
    const recasts = await Warpcast.fetchAllRecasts();
    return recasts.some((recast) => recast.fid === fid);
  }

  public static async validateMessage(messageBytes: string) {
    const url = `${apiUrl}/v2/farcaster/frame/validate`;

    const response = await fetch(url, {
      headers: Warpcast.computeDefaultHeader,
      method: "POST",
      body: JSON.stringify({
        message_bytes_in_hex: messageBytes,
      }),
    });

    const data = await response
      .json()
      .then((res) => res)
      .then(validateMessageSchema.parse);

    return data.action;
  }
}

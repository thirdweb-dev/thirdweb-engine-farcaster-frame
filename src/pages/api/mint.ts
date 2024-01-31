import { computeHtml } from "@/utils/compute-html";
import { Warpcast } from "../../classes/Warpcast";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { z } from "zod";
import { ThirdWebEngine } from "@/classes/ThirdWebEngine";

const requestBodyWarpcastSchema = z.object({
  trustedData: z.object({
    messageBytes: z.string().min(5),
  }),
});

const requestQuerySchema = z.object({
  type: z.union([z.literal("start"), z.literal("recast"), z.literal("mint")]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
  });

  if (req.method !== "POST") {
    return res.status(400).send({ error: "invalid method" });
  }

  try {
    const { type } = requestQuerySchema.parse(req.query);

    const { trustedData } = requestBodyWarpcastSchema.parse(req.body);

    const action = await Warpcast.validateMessage(trustedData.messageBytes);

    if (type === "start") {
      const isBalanceLow = await ThirdWebEngine.isBalanceLow();

      if (isBalanceLow) {
        return res.status(200).send(
          computeHtml({
            imagePath: "<next_js_image_path>",
            postType: "follow",
            content: "Sorry we went out of gas :(",
          })
        );
      }

      return res.status(200).send(
        computeHtml({
          imagePath: "<next_js_image_path>",
          postType: "recast",
          content: "Re-cast to mint",
        })
      );
    }

    if (type === "recast") {
      const hasRecasted = await Warpcast.hasRecasted(action.interactor.fid);

      if (!hasRecasted) {
        return res.status(200).send(
          computeHtml({
            imagePath: "<next_js_image_path>",
            postType: "recast",
            content: "Re-cast is required to mint the NFT",
          })
        );
      }

      return res.status(200).send(
        computeHtml({
          imagePath: "<next_js_image_path>",
          postType: "mint",
          content: "Mint NFT",
        })
      );
    }

    if (type === "mint") {
      await ThirdWebEngine.mint(action.interactor.custody_address);

      return res.status(200).send(
        computeHtml({
          imagePath: "<next_js_image_path>",
          postType: "start", // Do your own custom post_url after user has minted the NFT + clicks your button
          content: "Congrats! You minted the NFT",
        })
      );
    }
  } catch (err) {
    return res.status(200).send(
      computeHtml({
        imagePath: "<next_js_image_path>",
        postType: "start",
        content: "Something went wrong",
      })
    );
  }
}

import {z} from "zod";

export const orderInputSchema = z.object({
    baseAsset: z.string(),
    quoteAsset: z.string(),
    price: z.number(),
    quantity: z.number(),
    side: z.enum(["BUY", "SELL"]),
    type: z.enum(["LIMIT", "MARKET"]),
    kind: z.enum(["IOC"]).optional()
})
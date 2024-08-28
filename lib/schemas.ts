import { z } from "zod";
// define a schema for the notifications
export const tourSchema = z.object({
  tour: z.object({
    city: z.string().describe("name of the city"),
    country: z
      .string()
      .describe("name of the country where given city is belong to"),
    title: z.string().describe("title of the tour"),
    description: z.string().describe("description of the city and tour"),
    stops: z.array(
      z.string().describe("short paragraph on the stop 1 "),
      z.string().describe("short paragraph on the stop 2")
    ),
  }),
});

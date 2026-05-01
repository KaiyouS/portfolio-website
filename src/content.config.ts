import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    images: z.array(
      z.object({
        src: image(),
        alt: z.string(),
        device: z.enum(["desktop", "mobile"]).default("desktop"),
      })
    ).min(1),
    githubUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
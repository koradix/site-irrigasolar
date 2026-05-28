import { z } from 'zod';

const envSchema = z.object({
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  ZAPI_INSTANCE: z.string().optional(),
  ZAPI_TOKEN: z.string().optional(),
  N8N_WEBHOOK_URL: z.string().url().optional(),
  META_PIXEL_ID: z.string().optional(),
  GA4_MEASUREMENT_ID: z.string().optional(),
});

export const env = envSchema.parse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  ZAPI_INSTANCE: process.env.ZAPI_INSTANCE,
  ZAPI_TOKEN: process.env.ZAPI_TOKEN,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  META_PIXEL_ID: process.env.META_PIXEL_ID,
  GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID,
});

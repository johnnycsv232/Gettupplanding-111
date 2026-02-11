import { z } from 'zod';

export const LeadSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  city: z.string().optional(),
  country: z.string().optional(),
  source: z
    .string()
    .min(1, 'Source is required')
    .describe('Source of the lead, e.g. hero_zenith, exit_intent, etc.'),
});

export type Lead = z.infer<typeof LeadSchema>;

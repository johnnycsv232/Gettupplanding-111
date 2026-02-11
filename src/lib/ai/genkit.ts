import { googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

/**
 * Sovereign AI Configuration ($0 Budget)
 * Uses Gemini 1.5 Flash (Free Tier) via Google AI Plugin.
 */
const ai = genkit({
  plugins: [googleAI()],
});

const leadIntentSchema = z.object({
  intent: z.enum(['qualify', 'pricing', 'general']),
});

const leadArchitectInputSchema = z.object({
  message: z.string(),
  city: z.string().optional().default('Your City'),
  country: z.string().optional().default('US'),
  history: z.array(z.any()).optional(),
});

const leadArchitectOutputSchema = z.object({
  response: z.string(),
  intent: z.enum(['qualify', 'pricing', 'general']),
  score: z.number(),
});

type LeadArchitectInput = z.infer<typeof leadArchitectInputSchema>;
type LeadArchitectOutput = z.infer<typeof leadArchitectOutputSchema>;

export type LeadIntent = LeadArchitectOutput['intent'];

interface GenerateParams {
  model: string;
  prompt: string;
  config?: {
    temperature?: number;
  };
}

interface GenerateTextResult {
  text: string;
}

export type GenerateTextFunction = (params: GenerateParams) => Promise<GenerateTextResult>;

const CLASSIFIER_MODEL = 'googleai/gemini-1.5-flash';
const FALLBACK_RESPONSE =
  'The Lead Architect is currently recalibrating. Please try again in a moment.';
const BASE_QUALIFICATION_SCORE = 50;

function extractJsonObject(text: string): string | null {
  const match = text.match(/\{[\s\S]*\}/);
  return match?.[0] ?? null;
}

export function parseClassificationIntent(rawText: string): LeadIntent {
  const jsonCandidate = extractJsonObject(rawText);

  if (jsonCandidate) {
    try {
      const parsed = JSON.parse(jsonCandidate);
      return leadIntentSchema.parse(parsed).intent;
    } catch {
      // Fall through to heuristic fallback.
    }
  }

  const normalized = rawText.toLowerCase();
  if (normalized.includes('pricing')) return 'pricing';
  if (normalized.includes('qualify')) return 'qualify';
  return 'general';
}

export async function runLeadArchitectFlow(
  input: LeadArchitectInput,
  generateText: GenerateTextFunction
): Promise<LeadArchitectOutput> {
  let intent: LeadIntent = 'general';

  try {
    const classification = await generateText({
      model: CLASSIFIER_MODEL,
      prompt: `
Return strict JSON with this schema only:
{"intent":"qualify"|"pricing"|"general"}

User message:
"${input.message}"
      `.trim(),
      config: { temperature: 0.1 },
    });

    intent = parseClassificationIntent(classification.text);
  } catch (error: unknown) {
    console.error('Lead classification failed; defaulting to general intent.', error);
  }

  try {
    const response = await generateText({
      model: CLASSIFIER_MODEL,
      prompt: `
You are GettUpp's Lead Architect.
Respond in a concise, premium tone for this ${intent} inquiry.
City: ${input.city ?? 'Your City'}
Country: ${input.country ?? 'US'}
Message: "${input.message}"
      `.trim(),
      config: { temperature: 0.7 },
    });

    return {
      response: response.text,
      intent,
      score: BASE_QUALIFICATION_SCORE,
    };
  } catch (error: unknown) {
    console.error('Lead response generation failed; returning deterministic fallback.', error);
    return {
      response: FALLBACK_RESPONSE,
      intent,
      score: BASE_QUALIFICATION_SCORE,
    };
  }
}

/**
 * LeadArchitectFlow
 * An autonomous flow for lead qualification and strategy consultation.
 */
export const leadArchitectFlow = ai.defineFlow(
  {
    name: 'leadArchitectFlow',
    inputSchema: leadArchitectInputSchema,
    outputSchema: leadArchitectOutputSchema,
  },
  async (input) =>
    runLeadArchitectFlow(input, async (params) => {
      const output = await ai.generate(params);
      return { text: output.text };
    })
);

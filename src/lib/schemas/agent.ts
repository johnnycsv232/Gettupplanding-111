import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export const ChatHistorySchema = z.array(ChatMessageSchema);

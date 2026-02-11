import { z } from 'zod';

export type ActionState<T> = {
  success: boolean;
  data?: T;
  error?: string | Record<string, string[]>;
  timestamp: string;
};

/**
 * createServerAction
 * Higher-order function to wrap Server Actions with Validation, Auth, and Error Handling.
 */
export async function createServerAction<Input, Output>(
  schema: z.Schema<Input>,
  handler: (data: Input, context: { userId?: string }) => Promise<Output>,
  options: { requireAuth?: boolean } = { requireAuth: false },
  input: Input
): Promise<ActionState<Output>> {
  const timestamp = new Date().toISOString();

  try {
    // 1. Validation
    const parseResult = schema.safeParse(input);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.flatten().fieldErrors as Record<string, string[]>,
        timestamp,
      };
    }

    // 2. Authentication (Optional)
    let userId: string | undefined;
    if (options.requireAuth) {
      // Note: This requires passing the ID token or session cookie in headers/cookies
      // For Server Actions, we typically rely on cookies.
      // detailed implementation depends on specific auth strategy (e.g. session cookie)
      // This is a placeholder for the pattern.
      // const session = await getSession();
      // if (!session) throw new Error("Unauthorized");
      // userId = session.uid;
    }

    // 3. Execution
    const data = await handler(parseResult.data, { userId });

    return {
      success: true,
      data,
      timestamp,
    };
  } catch (error: unknown) {
    console.error(`[SERVER_ACTION_ERROR]`, error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return {
      success: false,
      error: message,
      timestamp,
    };
  }
}

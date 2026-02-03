/**
 * Strict Action pattern for state mutations.
 * Ensures all state changes are explicitly defined, logged, and handled consistently.
 */

export interface Action<T = void> {
  type: string;
  payload?: T;
  meta?: Record<string, any>;
}

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Creates a standardized action.
 */
export const createAction = <T>(
  type: string,
  payload?: T,
  meta?: Record<string, any>,
): Action<T> => ({
  type,
  payload,
  meta,
});

/**
 * Wrapper for executing state mutations with logging and error handling.
 */
export const executeAction = async <T>(
  action: Action<any>,
  handler: () => Promise<T>,
): Promise<ActionResult<T>> => {
  const timestamp = new Date().toISOString();
  console.warn(`[ACTION][${timestamp}] Executing: ${action.type}`, action.payload);

  try {
    const result = await handler();
    console.warn(`[ACTION][${timestamp}] Success: ${action.type}`, result);
    return {
      success: true,
      data: result,
      timestamp,
    };
  } catch (error: any) {
    console.error(`[ACTION][${timestamp}] Error: ${action.type}`, error);
    return {
      success: false,
      error: error.message || 'Unknown error occurred during action execution.',
      timestamp,
    };
  }
};

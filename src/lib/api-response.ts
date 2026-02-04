/**
 * Standard API Response Envelope
 * Standardizes all API responses (Data/Meta/Error) as per Task 35.
 */

export interface ApiResponseMeta {
  timestamp: string;
  requestId: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ApiResponseError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiResponseError | null;
  meta: ApiResponseMeta;
}

/**
 * Factory for creating successful API responses
 */
export const createSuccessResponse = <T>(
  data: T,
  pagination?: ApiResponseMeta['pagination']
): ApiResponse<T> => {
  return {
    success: true,
    data,
    error: null,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID?.() || Math.random().toString(36).substring(7),
      pagination,
    },
  };
};

/**
 * Factory for creating error API responses
 */
export const createErrorResponse = (
  code: string,
  message: string,
  details?: unknown
): ApiResponse<null> => {
  return {
    success: false,
    data: null,
    error: { code, message, details },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID?.() || Math.random().toString(36).substring(7),
    },
  };
};

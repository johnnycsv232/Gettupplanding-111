/**
 * Lead Data Transfer Object (DTO)
 * Standardizes lead data across the application.
 */

export interface LeadDTO {
  id: string;
  email: string;
  city: string;
  country: string;
  source: string;
  createdAt: string; // ISO String for consistent client handling
  status: 'new' | 'contacted' | 'audit_sent' | 'converted';
  metadata?: Record<string, unknown>;
}

/**
 * Mapper to convert raw Firestore data to LeadDTO
 */
interface FirestoreTimestamp {
  toDate: () => Date;
}

function isFirestoreTimestamp(value: unknown): value is FirestoreTimestamp {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as FirestoreTimestamp).toDate === 'function'
  );
}

export const mapToLeadDTO = (id: string, data: Record<string, unknown>): LeadDTO => {
  const createdAt = isFirestoreTimestamp(data.createdAt)
    ? data.createdAt.toDate().toISOString()
    : new Date().toISOString();

  return {
    id,
    email: (data.email as string) || '',
    city: (data.city as string) || 'Unknown',
    country: (data.country as string) || 'Unknown',
    source: (data.source as string) || 'Direct',
    createdAt,
    status: (data.status as LeadDTO['status']) || 'new',
    metadata: (data.metadata as Record<string, unknown>) || {},
  };
};

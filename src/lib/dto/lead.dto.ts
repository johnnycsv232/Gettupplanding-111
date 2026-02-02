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
  metadata?: Record<string, any>;
}

/**
 * Mapper to convert raw Firestore data to LeadDTO
 */
export const mapToLeadDTO = (id: string, data: any): LeadDTO => {
  return {
    id,
    email: data.email || '',
    city: data.city || 'Unknown',
    country: data.country || 'Unknown',
    source: data.source || 'Direct',
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : new Date().toISOString(),
    status: data.status || 'new',
    metadata: data.metadata || {},
  };
};

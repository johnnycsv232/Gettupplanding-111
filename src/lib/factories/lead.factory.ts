import { LeadDTO } from '../dto/lead.dto';

/**
 * Lead Factory
 * Generates mock lead data for testing.
 */
export const createMockLead = (overrides?: Partial<LeadDTO>): LeadDTO => {
  return {
    id: `lead_${Math.random().toString(36).substr(2, 9)}`,
    email: 'test@example.com',
    city: 'Monterrey',
    country: 'MX',
    source: 'Instagram',
    createdAt: new Date().toISOString(),
    status: 'new',
    ...overrides,
  };
};

export const createMockLeads = (count: number): LeadDTO[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockLead({
      id: `lead_${i}`,
      email: `test${i}@example.com`,
    }),
  );
};

/**
 * Zenith Lead Scoring Engine
 * Purpose: Identify high-value prospects based on interaction data.
 */

export interface LeadContext {
  interactions: number;
  city?: string;
  hasInteractedWith3D: boolean;
  messagesSent: number;
  lastMessageSentiment?: 'positive' | 'neutral' | 'negative';
}

export const calculateLeadScore = (context: LeadContext): number => {
  let score = 0;

  // Interaction Depth
  score += context.interactions * 5;
  score += context.messagesSent * 10;

  // High Value Locations (Example: Major Nightlife Hubs)
  const premiumCities = ['Miami', 'Las Vegas', 'New York', 'Los Angeles', 'Chicago', 'London'];
  if (context.city && premiumCities.includes(context.city)) {
    score += 50;
  }

  // Engagement with Immersive Features
  if (context.hasInteractedWith3D) {
    score += 30;
  }

  // Sentiment Bonus
  if (context.lastMessageSentiment === 'positive') {
    score += 20;
  }

  return score;
};

export const getLeadTier = (score: number) => {
  if (score >= 100) return 'VIP_WHALE';
  if (score >= 50) return 'HIGH_INTENT';
  return 'PROSPECT';
};

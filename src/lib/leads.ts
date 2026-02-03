import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { getFirebaseDb } from './firebase';
import { LeadSchema, type Lead } from './zod-schemas';

export async function saveLead(data: Lead) {
  try {
    // Validate data with Zod
    const validation = LeadSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || 'Invalid data',
      };
    }

    const db = getFirebaseDb();
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...validation.data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: 'Failed to save lead' };
  }
}

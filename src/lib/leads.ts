import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Action, executeAction } from './actions';
import { getFirebaseDb } from './firebase';
import { LeadSchema, type Lead } from './zod-schemas';

export async function saveLead(data: Lead) {
  const saveAction: Action<Lead> = {
    type: 'SAVE_LEAD',
    payload: data,
  };

  return executeAction(saveAction, async () => {
    // Validate data with Zod
    const validation = LeadSchema.parse(data);

    const db = getFirebaseDb();
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...validation,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  });
}

import { getFirebaseDb } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface LeadData {
    email: string;
    city?: string;
    source: 'hero' | 'exit-intent';
}

export async function saveLead(data: LeadData) {
    try {
        const db = getFirebaseDb();
        const leadsRef = collection(db, 'leads');
        const docRef = await addDoc(leadsRef, {
            ...data,
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving lead:', error);
        return { success: false, error };
    }
}

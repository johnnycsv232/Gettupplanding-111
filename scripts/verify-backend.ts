import { getAdminDb } from '../src/lib/firebase-admin';
import { getSanityClient } from '../src/lib/sanity';

async function verifyBackend() {
  console.log('🚀 Starting Backend Verification...');

  // 1. Verify Firestore
  console.log('\n🔥 Checking Firestore Connectivity...');
  try {
    const db = getAdminDb();
    const testDoc = db.collection('_verification').doc('test');

    await testDoc.set({
      timestamp: new Date().toISOString(),
      message: 'Backend verification',
    });
    console.log('✅ Firestore Write: SUCCESS');

    const snap = await testDoc.get();
    if (snap.exists) {
      console.log('✅ Firestore Read: SUCCESS');
    } else {
      throw new Error('Firestore Read: FAILED (Document not found)');
    }

    await testDoc.delete();
    console.log('✅ Firestore Delete: SUCCESS');
  } catch (error: unknown) {
    console.error('❌ Firestore Verification: FAILED');
    console.error(error instanceof Error ? error.message : String(error));
  }

  // 2. Verify Sanity
  console.log('\n💎 Checking Sanity Connectivity...');
  try {
    const client = getSanityClient();
    // Use a simple query that doesn't rely on existing data
    const result = await client.fetch('*[0]._id');
    console.log('✅ Sanity Connection: SUCCESS');
    console.log(`ℹ️ Sanity fetched first document ID: ${result || 'None found (Empty dataset)'}`);
  } catch (error: unknown) {
    console.error('❌ Sanity Verification: FAILED');
    console.error(error instanceof Error ? error.message : String(error));
  }

  console.log('\n✨ Verification Complete.');
}

verifyBackend().catch((err) => {
  console.error('💥 Critical Failure during verification:');
  console.error(err);
  process.exit(1);
});

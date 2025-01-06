/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at
 * https://firebase.google.com/docs/functions
 */
import {logger} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(
  (request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    logger.info("Hello logs1!", {structuredData: true});
    response.send("Hello from Firebase!");
  });


// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
//
// admin.initializeApp();
//
// interface SyncRequest {
//   userId: string;
//   favorites: string[];
// }
//
// interface DatabaseUpdates {
//   [key: string]: number;
// }
//
// export const syncServerRecommendations =
//   functions.https.onCall(async (data: SyncRequest, context) => {
//     const {userId, favorites} = data;
//     const db = admin.database();
//
//     try {
//       // Store user favorites
//       await db.ref(`/recommendations/${userId}`).set({
//         favoriteIds: favorites,
//         updatedAt: admin.database.ServerValue.TIMESTAMP,
//       });
//
//       // Update product ratings
//       const updates: DatabaseUpdates = {};
//
//       // Get existing favorites first
//       const snapshot = await db.ref(
//           `/recommendations/${userId}/favoriteIds`).once('value');
//       const oldFavorites: string[] = snapshot.val() || [];
//
//       // Calculate differences
//       const newFavorites = favorites.filter((id) =>
//       !oldFavorites.includes(id));
//
//       // Update product ratings
//       for (const productId of newFavorites) {
//         const productRef = db.ref(`/products/${productId}/rating`);
//         const ratingSnapshot = await productRef.once('value');
//         const currentRating: number = ratingSnapshot.val() || 0;
//         updates[`/products/${productId}/rating`] = currentRating + 0.1;
//       }
//
//       // Apply all updates atomically if there are any
//       if (Object.keys(updates).length > 0) {
//         await db.ref().update(updates);
//       }
//
//       return {success: true, message: 'Recommendations synced successfully'};
//     } catch (error) {
//       console.error('Error syncing recommendations:', error);
//       throw new functions.https.HttpsError(
//           'internal',
//           'Failed to sync recommendations',
//       );
//     }
//   });

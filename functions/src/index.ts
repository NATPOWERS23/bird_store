import {logger} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import Decimal from "decimal.js";

interface DatabaseUpdates {
  [key: string]: number;
}

admin.initializeApp();

export const syncPopularProducts = onRequest({cors: false},
  async (
    request, response) => {
    try {
      const db = admin.database();

      const favoritesString = request.query["favorites"];
      let favoritesArray: string[] = [];

      if (favoritesString && typeof favoritesString === "string") {
        favoritesArray = [...new Set(favoritesString.split(","))];
      }

      if (favoritesArray.length === 0) {
        response.status(400).send({
          message: "Favorites list should not be empty",
        });
      }

      logger.info("Update product ratings...");
      const updates: DatabaseUpdates = {};

      for (const productId of favoritesArray) {
        const productRef = db.ref(`/products/${productId}/rating`);
        const ratingSnapshot = await productRef.once("value");
        const currentRating: number = ratingSnapshot.val() || 0;
        updates[`/products/${productId}/rating`] = new Decimal(currentRating)
          .plus(0.1).toNumber();

        logger.info("Update product rating for: " + productId +
          ". Previous rating " + currentRating + " was increased with 0.1");
      }

      if (Object.keys(updates).length > 0) {
        logger.info("Applying all updates atomically if there are...");
        logger.info(updates);
        await db.ref().update(updates);
      }

      response.status(200).json({
        message: "Popular products synced successfully",
      });
    } catch (error) {
      logger.error("Error syncing populars:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to sync populars",
      );
    }
  }
);

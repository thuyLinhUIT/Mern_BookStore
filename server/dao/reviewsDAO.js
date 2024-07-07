import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviewsCollection) {
      return;
    }
    try {
      const database = await conn.db(process.env.MONGODB_DB);
      const bookCollection = await database.collection("books");

      reviewsCollection = bookCollection;
    } catch (e) {
      console.error(
        `Unable to establish connection handle in reviewsDAO: ${e}`
      );
    }
  }

  static async addReview(bookId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        _id: new ObjectId(bookId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update review:${e.message}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete review:${e}`);
      return { error: e };
    }
  }
}

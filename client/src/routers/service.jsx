import axios from "axios";

class Service {
  createUser(data) {
    return axios.post(`/api/v1/Register`, data);
  }

  createReview(data) {
    return axios.post(`/api/v1/add-review`, data);
  }

  updateReview(id, data) {
    return axios.patch(`/api/v1/review/${id}`, data);
  }

  deleteReview(id) {
    return axios.delete(`/api/v1/delete-review/${id}`, {
      // data: { user_id: userId },
    });
  }
  getReviewsById(id) {
    return axios.get(`/api/v1/reviews?bookId=${id}`, {
      // data: { user_id: userId },
    });
  }
}
export default new Service();

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaStar, FaTrash } from "react-icons/fa";
import { Loader } from "../../components/loader";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const token = localStorage.getItem("token");

  async function loadReviews() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/reviews/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load reviews."
      );
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function approveReview(reviewId) {
    try {
      setProcessingId(reviewId);

      await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          `/reviews/${reviewId}/status`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review._id === reviewId
            ? { ...review, status: "approved" }
            : review
        )
      );

      toast.success("Review approved successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to approve review."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function deleteReview(reviewId) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this review?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(reviewId);

      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review._id !== reviewId
        )
      );

      toast.success("Review deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete review."
      );
    } finally {
      setProcessingId(null);
    }
  }

  function getStatusStyle(status) {
    if (status === "approved") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  return (
    <div className="min-h-full w-full bg-primary px-5 py-12 md:px-10 lg:px-16">
      <h1 className="mb-10 text-center text-3xl font-semibold text-accent">
        Reviews
      </h1>

      {!loaded ? (
        <div className="flex min-h-[350px] items-center justify-center">
          <Loader />
        </div>
      ) : reviews.length === 0 ? (
        <div className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-16 text-center shadow-lg">
          <p className="text-lg font-medium text-gray-600">
            No reviews have been submitted yet.
          </p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-lg shadow-black/20">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead className="bg-accent text-white">
                <tr>
                  <th className="px-6 py-5 text-sm font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold">
                    Rating
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold">
                    Review
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-5 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-b border-gray-300 bg-white transition hover:bg-gray-50 last:border-b-0"
                  >
                    <td className="px-6 py-5 align-top text-sm font-medium text-gray-800">
                      {review.name}
                    </td>

                    <td className="px-6 py-5 align-top text-sm text-gray-700">
                      {review.email}
                    </td>

                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {review.rating}/5
                      </p>
                    </td>

                    <td className="max-w-[360px] px-6 py-5 align-top text-sm leading-relaxed text-gray-700">
                      {review.title && (
                        <p className="mb-1 font-semibold text-gray-900">
                          {review.title}
                        </p>
                      )}

                      <p className="whitespace-pre-wrap break-words">
                        {review.message}
                      </p>
                    </td>

                    <td className="px-6 py-5 align-top">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(
                          review.status
                        )}`}
                      >
                        {review.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            approveReview(review._id)
                          }
                          disabled={
                            processingId === review._id ||
                            review.status === "approved"
                          }
                          className="inline-flex min-w-[105px] items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <FaCheck />

                          {review.status === "approved"
                            ? "Approved"
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteReview(review._id)
                          }
                          disabled={
                            processingId === review._id
                          }
                          className="inline-flex min-w-[95px] items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Mail, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SLOGANS = [
  "Talk to a real human — no bots, no scripts.",
  "Same-day replies. Same-day solutions.",
  "Your problem is our priority.",
];

export default function ContactPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews")
      .then((response) => setReviews(response.data))
      .catch(() => setReviews([]));
  }, []);

  async function submitReview(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !title.trim() || !message.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/reviews",
        {
          name: name.trim(),
          email: email.trim(),
          title: title.trim(),
          message: message.trim(),
          rating,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      toast.success("Thank you! Your review is waiting for admin approval.");
      setName("");
      setEmail("");
      setTitle("");
      setMessage("");
      setRating(5);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit your review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
 
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/contact.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 mb-4">
            Get in Touch • Tech Hub
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            We're Here
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              When You Need Us
            </span>
          </h1>

      
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mt-10 min-h-[3rem] text-base sm:text-lg md:text-xl font-medium text-cyan-100"
          >
            {SLOGANS[activeIndex]}
          </motion.p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="https://wa.me/94701771543"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base sm:text-lg font-bold text-slate-900 shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/60 hover:scale-105"
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+94701771543"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-white/5 px-8 py-4 text-base sm:text-lg font-semibold text-slate-100 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-white/10 hover:scale-105"
            >
              <Phone className="mr-3 h-5 w-5" />
              Call Now
            </a>
          </div>
        </motion.div>
      </section>


      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-cyan-500/50 bg-cyan-500/10 p-10 text-center backdrop-blur-md shadow-lg shadow-cyan-500/20 transition-all"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-400 to-cyan-500 shadow-xl">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">WhatsApp / Chat</h3>
            <p className="text-base text-gray-300 mb-6">Fastest response — usually under 2 minutes</p>
            <a
              href="https://wa.me/94701771543"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:underline"
            >
              070 177 1543
            </a>
          </motion.div>

  
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-blue-500/50 bg-blue-500/10 p-10 text-center backdrop-blur-md shadow-lg shadow-blue-500/20 transition-all"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl">
              <Phone className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Call Us</h3>
            <p className="text-base text-gray-300 mb-6">
              Mon–Sat: 9 AM – 7 PM<br />Sunday: 10 AM – 5 PM
            </p>
            <a href="tel:+94701771543" className="text-cyan-400 font-semibold hover:underline">
              070 177 1543
            </a>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-purple-500/50 bg-purple-500/10 p-10 text-center backdrop-blur-md shadow-lg shadow-purple-500/20 transition-all"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl">
              <Mail className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email Us</h3>
            <p className="text-base text-gray-300 mb-6">Reply within 24 hours</p>
            <a href="mailto:info@techhub.com" className="text-cyan-400 font-semibold hover:underline break-all">
              info@techhub.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-orange-500/50 bg-orange-500/10 p-10 text-center backdrop-blur-md shadow-lg shadow-orange-500/20 transition-all"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl">
              <MapPin className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visit Our Store</h3>
            <p className="text-base text-gray-300 mb-4">Pannipitiya</p>
            <p className="text-sm text-gray-400">
              58/40/A, Hiripitiya,<br />
              Pannipitiya, Sri Lanka
            </p>
            <a
              href="https://maps.google.com/?q=Tech+Hub+Hiripitiya+Pannipitiya"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-cyan-400 font-semibold hover:underline"
            >
              Open in Google Maps →
            </a>
          </motion.div>
        </div>
      </section>


      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/10 bg-white/5 p-10 md:p-16 backdrop-blur-lg"
        >
          <h2 className="text-center text-3xl sm:text-4xl font-black mb-4">
            Share Your Experience
          </h2>
          <p className="text-center text-base sm:text-lg text-cyan-100 mb-10">
            Rate our products and service. Reviews appear publicly after admin approval.
          </p>

          <form onSubmit={submitReview} className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
              className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-gray-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={150}
              required
              className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-gray-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none transition"
            />
            <input
              type="text"
              placeholder="Review Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={120}
              required
              className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-gray-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none transition md:col-span-2"
            />

            <div className="md:col-span-2">
              <p className="mb-3 text-center font-semibold text-cyan-100">
                Your Rating
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    className="transition hover:scale-110"
                  >
                    <Star
                      className={`h-9 w-9 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-sm text-gray-400">
                {rating} out of 5 stars
              </p>
            </div>

            <textarea
              rows="6"
              placeholder="Write your review here..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1000}
              required
              className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-gray-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none transition resize-none md:col-span-2"
            />

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-10 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-cyan-500/40 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/60 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {reviews.length > 0 && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black">Customer Reviews</h2>
            <p className="mt-3 text-cyan-100">Approved feedback from our customers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review) => (
              <motion.article
                key={review._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-cyan-500/30 bg-white/5 p-7 backdrop-blur-md"
              >
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-cyan-300">{review.title}</h3>
                <p className="mt-3 text-gray-300 whitespace-pre-wrap">{review.message}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

 
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-indigo-900/30 to-violet-900/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8">
            We're Just One Message Away
          </h2>
          <p className="text-lg md:text-xl text-cyan-100 mb-12 max-w-3xl mx-auto">
            Have a question? Need advice on a build? Reach out — we're always ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/94701771543"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-10 py-4 text-lg font-bold text-slate-900 shadow-2xl shadow-cyan-500/50 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/70 hover:scale-110"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              START WHATSAPP CHAT
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
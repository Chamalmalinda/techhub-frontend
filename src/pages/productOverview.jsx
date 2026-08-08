import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND_URL +
          "/products/" +
          params.productID
      )
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product not found.");
        setStatus("error");
      });
  }, [params.productID]);

  function redirectGuestToLogin() {
    toast.error("Please log in to continue.");

    navigate("/login", {
      state: {
        from: location.pathname,
      },
    });
  }

  function handleAddToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      redirectGuestToLogin();
      return;
    }

    addToCart(product, 1);
    toast.success("Product added to cart.");
  }

  function handleBuyNow() {
    const token = localStorage.getItem("token");

    if (!token) {
      redirectGuestToLogin();
      return;
    }

    navigate("/checkout", {
      state: [
        {
          productID: product.productID,
          name: product.name,
          price: product.price,
          labelledPrice: product.labelledPrice,
          image: product.images?.[0] || "/default.jpg",
          quantity: 1,
        },
      ],
    });
  }

  return (
    <>
      {status === "loading" && <Loader />}

      {status === "error" && (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600">
            Error loading product.
          </h1>
        </div>
      )}

      {status === "success" && product && (
        <div className="min-h-screen w-full bg-gradient-to-br from-primary/5 via-white to-primary/10">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-1 lg:order-none">
                <div className="sticky top-4 lg:top-8">
                  <ImageSlider images={product.images} />
                </div>
              </div>

              <div className="order-2 flex flex-col justify-center space-y-8 lg:order-none">
                <h1 className="text-3xl font-black tracking-tight text-secondary sm:text-4xl lg:hidden">
                  {product.name}
                </h1>

                <h1 className="hidden text-4xl font-black leading-tight text-secondary lg:block lg:text-5xl xl:text-6xl">
                  {product.name}
                </h1>

                <p className="text-sm uppercase tracking-wider text-secondary/60">
                  #{product.productID}
                </p>

                <div className="flex items-center text-lg text-secondary/80">
                  <CgChevronRight className="mr-2 text-accent" />

                  <span className="font-medium">
                    {product.category}
                  </span>
                </div>

                {product.altNames &&
                  product.altNames.length > 0 && (
                    <p className="text-md italic text-secondary/70">
                      {product.altNames.join(" • ")}
                    </p>
                  )}

                <div className="rounded-2xl border border-secondary/10 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-base leading-relaxed text-secondary/90 lg:text-lg">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                  {product.labelledPrice > product.price && (
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-secondary/60 line-through">
                        LKR{" "}
                        {Number(
                          product.labelledPrice
                        ).toLocaleString()}
                      </span>

                      <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                        {Math.round(
                          ((product.labelledPrice -
                            product.price) /
                            product.labelledPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                  )}

                  <h2 className="text-4xl font-black text-accent lg:text-5xl">
                    LKR {Number(product.price).toLocaleString()}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 transform rounded-sm bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 transform rounded-sm border-2 border-accent bg-white px-8 py-4 text-lg font-bold text-accent shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
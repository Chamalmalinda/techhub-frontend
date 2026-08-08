import { useEffect, useState } from "react";
import {
  addToCart,
  getCart,
  getCartTotal,
} from "../utils/cart";
import { BsChevronUp } from "react-icons/bs";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to view your cart.");

      navigate("/login", {
        replace: true,
        state: {
          from: location.pathname,
        },
      });

      return;
    }

    setCart(getCart());
    setCheckingLogin(false);
  }, [navigate, location.pathname]);

  function increaseQuantity(item) {
    addToCart(item, 1);
    setCart(getCart());
  }

  function decreaseQuantity(item) {
    addToCart(item, -1);
    setCart(getCart());
  }

  if (checkingLogin) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center p-5">
      {cart.length === 0 ? (
        <div className="my-20 text-center">
          <h1 className="text-3xl font-bold text-secondary">
            Your cart is empty
          </h1>

          <Link
            to="/products"
            className="mt-6 inline-block rounded bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent/90"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.productID}
              className="relative my-1 flex w-full justify-between overflow-hidden rounded-xl pt-5 shadow-2xl lg:h-[150px] lg:w-1/2"
            >
              <h1 className="absolute top-0 h-5 w-full overflow-hidden lg:hidden">
                {item.name}
              </h1>

              <div className="flex h-full flex-col">
                <img
                  src={item.image || "/default.jpg"}
                  alt={item.name}
                  className="aspect-square h-20 object-cover lg:h-full"
                />

                {item.labelledPrice > item.price && (
                  <h2 className="mr-2 text-sm text-secondary/80 line-through decoration-gold/70 decoration-2">
                    LKR.{" "}
                    {Number(
                      item.labelledPrice
                    ).toLocaleString()}
                  </h2>
                )}

                <h2 className="mt-1 text-sm font-semibold text-accent lg:mt-2">
                  LKR. {Number(item.price).toLocaleString()}
                </h2>
              </div>

              <div className="hidden w-[300px] flex-col justify-center pl-4 lg:flex">
                <h1 className="relative text-2xl font-semibold hover:[&_.tooltip]:opacity-100">
                  <span className="tooltip absolute bottom-[-50px] rounded-lg bg-accent p-2 text-sm italic text-white opacity-0">
                    {item.name}
                  </span>

                  {item.name.length > 20
                    ? item.name.substring(0, 20) + "..."
                    : item.name}
                </h1>

                {item.labelledPrice > item.price && (
                  <h2 className="mr-2 text-lg text-secondary/80 line-through decoration-gold/70 decoration-2">
                    LKR.{" "}
                    {Number(
                      item.labelledPrice
                    ).toLocaleString()}
                  </h2>
                )}

                <h2 className="mt-2 text-xl font-semibold text-accent">
                  LKR. {Number(item.price).toLocaleString()}
                </h2>

                <h3 className="mt-2 text-lg">
                  {item.productID}
                </h3>
              </div>

              <div className="flex min-h-full flex-row items-center gap-4">
                <div className="flex h-full flex-col items-center justify-center">
                  <BsChevronUp
                    onClick={() => increaseQuantity(item)}
                    className="cursor-pointer text-2xl transition hover:text-accent"
                  />

                  <span className="text-lg">
                    {item.quantity}
                  </span>

                  <BsChevronUp
                    onClick={() => decreaseQuantity(item)}
                    className="rotate-180 cursor-pointer text-2xl transition hover:text-accent"
                  />
                </div>

                <span className="w-[150px] pr-4 text-right text-lg font-semibold">
                  LKR.{" "}
                  {Number(
                    item.price * item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

          <div className="my-1 flex h-[150px] w-full items-center justify-between overflow-hidden rounded-xl shadow-2xl lg:w-1/2">
            <Link
              to="/checkout"
              state={cart}
              className="ml-4 self-center rounded bg-accent px-6 py-3 text-white transition hover:bg-accent/90"
            >
              Checkout
            </Link>

            <span className="w-[180px] pr-4 text-right text-xl font-bold">
              LKR. {Number(getCartTotal()).toLocaleString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
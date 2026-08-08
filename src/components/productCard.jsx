import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productID}
      className="w-full max-w-sm mx-auto sm:w-[280px] md:w-[300px] h-[420px] my-4 shadow-2xl cursor-pointer relative overflow-hidden rounded-xs hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0 transition-all duration-300 hover:shadow-3xl"
    >
      <div className="w-full h-[260px] relative">
        <img
          src={product.images[1]}
          alt={product.name}
          className="w-full h-full absolute inset-0 bg-white object-cover"
        />
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full absolute inset-0 bg-white primary-image transition-opacity duration-500 object-cover"
        />
      </div>

      <div className="w-full h-[160px] p-4 flex flex-col justify-between bg-white">
        <h1 className="text-center text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h1>
        <div className="w-full flex flex-col items-center mt-2">
          {product.labelledPrice > product.price && (
            <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 text-sm sm:text-base">
              LKR. {product.labelledPrice}
            </h2>
          )}
          <h2 className="text-accent font-bold text-xl sm:text-2xl mt-1">
            LKR. {product.price}
          </h2>
        </div>
      </div>

      <div className="w-full h-[160px] absolute bottom-0 left-0 opacity-0 buttons bg-gradient-to-t from-white via-white to-white/90 flex flex-col gap-4 justify-center items-center transition-opacity duration-300">
        <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 h-12 w-40 sm:w-48 rounded-xs flex justify-center items-center font-semibold text-base">
          View Details
        </button>
      </div>
    </Link>
  );
}
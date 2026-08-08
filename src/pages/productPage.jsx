import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-white text-black">
      {!loaded ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-col items-center">
          {/* Page header — matches homepage eyebrow / heading style */}
          <div className="w-full max-w-7xl px-6 pt-10 sm:pt-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 mb-3">
              Tech Hub • Catalog
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Shop{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
          </div>

          {/* Search Bar - Sticky & Responsive */}
          <div className="w-full max-w-4xl sticky top-0 flex justify-center items-center py-4 my-6 px-4 z-10">
            <div className="w-full max-w-md rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/40">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-5 py-3 bg-transparent rounded-full outline-none text-base text-black placeholder:text-slate-400 border border-transparent focus:border-cyan-400 transition"
                onChange={async (e) => {
                  if (e.target.value === "") {
                    setLoaded(false);
                    await axios
                      .get(import.meta.env.VITE_BACKEND_URL + "/products")
                      .then((response) => {
                        console.log(response.data);
                        setProducts(response.data);
                        setLoaded(true);
                      });
                    setLoaded(true);
                  } else {
                    await axios
                      .get(
                        import.meta.env.VITE_BACKEND_URL +
                          "/products/search/" +
                          e.target.value
                      )
                      .then((response) => {
                        console.log(response.data);
                        setProducts(response.data);
                      });
                    setLoaded(true);
                  }
                }}
              />
            </div>
          </div>

          {/* Products Grid - Fully Responsive */}
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-4 pb-16">
            {products.map((item) => {
              return <ProductCard key={item.productID} product={item} />;
            })}
          </div>

          {/* No Results Message */}
          {products.length === 0 && (
            <div className="text-center py-20 px-4">
              <p className="text-xl text-slate-200">
                No products found matching your search.
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Try different keywords or browse all products.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
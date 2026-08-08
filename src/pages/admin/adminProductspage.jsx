import axios from "axios";
import { useEffect, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export function AdminProductspage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(! loaded){

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true)
      });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center p-8 relative">
      <h1 className="text-3xl font-semibold text-accent mb-8 tracking-wide">
        Product Inventory
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-2xl bg-white">
        {loaded ?<table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-accent text-primary text-sm uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4">Image</th>
              <th className="py-4 px-4">Product ID</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Labeled Price</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Brand</th>
              <th className="py-4 px-4">Model</th>
              <th className="py-4 px-4">Stock</th>
              <th className="py-4 px-4">Availability</th>
              <th className="py-4 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-primary/60 transition-colors duration-200 text-secondary"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md border border-gray-200"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{item.productID}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-gold font-semibold">
                  ${item.price}
                </td>
                <td className="py-3 px-4">{item.labelledPrice.join(" , ")}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.brand}</td>
                <td className="py-3 px-4">{item.model}</td>
                <td className="py-3 px-4">{item.stock}</td>
                <td className="py-3 px-4">
                  {item.isAvailable ? (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Out of Stock
                    </span>
                  )}
                </td>

                {/* 🗑️ Delete Button */}
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex items-center gap-2">
                  <Link 
                      to="/admin/update-product"
                      className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full hover:bg-accent hover:text-white transition-all duration-200 shadow-sm"
                      state={item}
                       >
                      <BiEdit className="text-lg" />
                         
                       </Link>
                  
                    <ProductDeleteButton productID = {item.productID} reload={()=>{setLoaded(false)}}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<Loader/>}
      </div>

      {/* ➕ Floating Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-[30px] bottom-[30px] w-[60px] h-[60px] flex justify-center items-center text-5xl border-2 rounded-full text-white bg-accent border-accent hover:bg-gold hover:text-secondary shadow-lg transition-all duration-300"
      >
        <BiPlus />
      </Link>
    </div>
  );
}

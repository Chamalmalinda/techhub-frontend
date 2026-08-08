import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";

export default function ProductDeleteButton(props){

    const productID = props.productID;
    const reload= props.reload;
    const[isMessageopen, setIsMessageopen] = useState(false);
    const[isDeleting, setIsDeleting] = useState(false)

    async function handleDelete(){
        setIsDeleting(true);
                     const token = localStorage.getItem("token");
                      axios
                        .delete(
                          import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then(() => {
                          toast.success("Product Deleted Successfully");
                          setIsDeleting(false);
                          setIsMessageopen(false);
                          reload();
                        }).catch(()=>{
                            toast.error("Failed to delete the product");
                            setIsDeleting(false)
                        });

        
    }
    return(
        <>
<button
  onClick={() => {
    setIsMessageopen(true);
  }}
  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
  title="Delete Product"
>
  <BiTrash className="text-xl" />
</button>

{isMessageopen && (
  <div className="w-[100vw] h-screen fixed z-[9999] top-0 left-0 bg-black/40 flex justify-center items-center backdrop-blur-sm">
    <div className="w-[450px] min-h-[250px] bg-white/30 rounded-4xl relative flex flex-col items-center justify-center shadow-2xl border border-gray-200 px-6 py-8">
      <button
        onClick={() => {
          setIsMessageopen(false);
        }}
        className="w-[32px] h-[32px] bg-red-400 rounded-full text-white text-lg font-bold cursor-pointer hover:bg-red-900 absolute right-[-16px] top-[-16px] flex items-center justify-center shadow-md"
      >
        ✕
      </button>

      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Are you sure you want to delete this product?
      </h1>
      <p className="text-sm text-black mb-6 text-center">
        Product ID: <span className="font-mono text-gray-700">{productID}</span>
      </p>

      <div className="flex justify-center gap-6 mt-4">
        <button
          disabled={isDeleting}
          onClick={handleDelete}
          className="px-6 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm cursor-pointer font-semibold"
        >
          Delete
        </button>

        <button
          onClick={() => setIsMessageopen(false)}
          className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white transition-all duration-200 shadow-sm cursor-pointer font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

                          </>
    )
}


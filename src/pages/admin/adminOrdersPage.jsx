import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";

export function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center p-8 relative">
      <h1 className="text-3xl font-semibold text-accent mb-8 tracking-wide">
        Orders
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-2xl bg-white">
        {loaded ? (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-accent text-primary text-sm uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Customer email</th>
                <th className="py-4 px-4">Customer Name</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">status</th>
                <th className="py-4 px-4">Total amount</th>
                <th className="py-4 px-4">Items</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-primary/60 transition-colors duration-200 text-secondary"
                >
                  <td className="py-3 px-4 font-medium">{order.orderId}</td>

                  <td className="py-3 px-4">{order.email}</td>

                  <td className="py-3 px-4">{order.name}</td>

                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4">{order.status}</td>

                  <td className="py-3 px-4">LKR. {order.total}</td>

                  <td className="py-3 px-4">
                    {/* OVERRIDE rounded using arbitrary selector */}
                    <div className="[&_*]:rounded-none">
                      <ViewOrderInfo order={order} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

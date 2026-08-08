import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
    <div className="w-full min-h-screen bg-gradient-to-br primary to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary tracking-tight">
            Your Orders
          </h1>
          <p className="mt-2 text-secondary/70 text-lg">Track and manage all your purchases in one place</p>
        </div>

        {loaded ? (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border border-secondary/10">
              <table className="w-full table-auto border-separate border-spacing-0">
                <thead className="bg-accent text-primary">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Customer Email</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Total Amount</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-primary/5 transition-all duration-200"
                    >
                      <td className="px-6 py-5 text-sm font-semibold text-secondary">{order.orderId}</td>
                      <td className="px-6 py-5 text-sm text-secondary/90">{order.email}</td>
                      <td className="px-6 py-5 text-sm text-secondary/90">{order.name}</td>
                      <td className="px-6 py-5 text-sm text-secondary/90">
                        {new Date(order.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-secondary">
                        LKR {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-5">
                        <ViewOrderInfoCustomer order={order} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

        
            <div className="lg:hidden space-y-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-secondary/10 p-6 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-semibold text-secondary/60 uppercase tracking-wider">Order ID</p>
                      <p className="text-lg font-bold text-secondary">{order.orderId}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-secondary/60">Customer</p>
                      <p className="font-medium text-secondary">{order.name}</p>
                      <p className="text-secondary/80">{order.email}</p>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="text-secondary/60">Date</p>
                        <p className="font-medium text-secondary">
                          {new Date(order.date).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-secondary/60">Total</p>
                        <p className="font-bold text-lg text-secondary">
                          LKR {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-secondary/10">
                      <ViewOrderInfoCustomer order={order} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        )}

 
        {!loaded && orders.length === 0 && loaded && (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-secondary/70">No orders found</p>
            <p className="mt-2 text-secondary/50">Start shopping to see your orders here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
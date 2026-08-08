import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Loader } from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center p-8 relative">
      <h1 className="text-3xl font-semibold text-accent mb-8 tracking-wide">
        Users
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-2xl bg-white">
        {loaded ? (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-accent text-primary text-sm uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">First Name</th>
                <th className="py-4 px-4">Last Name</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {users.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-primary/60 transition-colors duration-200 text-secondary"
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      className="w-[38px] h-[38px] rounded-lg object-cover shadow-sm ring-1 ring-secondary/10"
                    />
                  </td>

                  <td className="py-3 px-4 flex items-center gap-2 font-medium">
                    {item.email}
                    {item.isEmailverified ? (
                      <GoVerified className="text-blue-500" />
                    ) : (
                      ""
                    )}
                  </td>

                  <td className="py-3 px-4">{item.firstName}</td>

                  <td className="py-3 px-4 font-semibold">{item.lastName}</td>

                  <td className="py-3 px-4 font-semibold">{item.role}</td>

                  <td className="py-3 px-4">
                    {item.isBlocked ? "Blocked" : "Active"}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      className="px-3 py-1 bg-accent text-primary shadow hover:opacity-90 active:scale-95 transition"

                      onClick={async () => {
                        await axios.put(
                          import.meta.env.VITE_BACKEND_URL +
                            `/users/toggle-block/${item.email}`,
                          {
                            isBlocked: !item.isBlocked,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        );
                        setLoaded(false);
                      }}
                    >
                      {item.isBlocked ? "Unblock User" : "Block User"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-5"
      >
        
      </Link>
    </div>
  );
}

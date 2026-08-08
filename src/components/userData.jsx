import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { motion } from "framer-motion";

export default function UserData(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response)=>{
                setUser(response.data);
            }).catch(()=>{
                setUser(null);
            })
        }
    },[])
    const [selectedOption, setSelectedOption] = useState("user");

    return (
        <>
            {
                user?
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                >
                    <img
                        src={user.image}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-white/15 shrink-0"
                    />
                    <div className="relative">
                        <select
                            className="appearance-none bg-white/5 border border-white/10 rounded-full pl-3 pr-7 py-1.5 text-xs sm:text-sm font-medium text-white outline-none cursor-pointer hover:border-cyan-400/40 focus:border-cyan-400/40 transition-colors max-w-[110px] sm:max-w-[130px] truncate"
                            value={selectedOption}
                            onChange={
                                (e)=>{

                                    if(e.target.value == "logout"){
                                        localStorage.removeItem("token");
                                        window.location.href = "/login";
                                    }else if(e.target.value == "my-orders"){
                                        window.location.href = "/orders";
                                    }
                                    setSelectedOption("user")
                                }
                            }
                        >
                            <option className="bg-black text-white" value={"user"}>{user.firstName}</option>
                            <option className="bg-black text-white" value={"logout"}>Logout</option>
                            <option className="bg-black text-white" value={"my-orders"}>My Orders</option>
                        </select>
                        <LuChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/50 text-sm" />
                    </div>
                </motion.div>:
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                >
    <Link to="/login" className="px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-sm font-semibold text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-colors">Login</Link>
    <Link to="/register" className="px-4 py-1.5 rounded-full bg-cyan-500 text-xs sm:text-sm font-semibold text-black hover:bg-cyan-400 transition-colors">Register</Link>
</motion.div>
            }
        </>
    )


}
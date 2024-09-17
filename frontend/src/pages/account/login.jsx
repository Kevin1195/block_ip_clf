import "../page.css";
import logo from "../../assets/images/logo.png";
import { FaRegUserCircle, FaUserLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import { IoIosUnlock } from "react-icons/io";
import { useState, useEffect } from "react";
import { useUserLoginMutation } from "../../api/apiuser";
import { HiUser } from "react-icons/hi2";

export default function Login() {
  const [Login, { data: res }] = useUserLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      toast.error("Nhập thiếu thông tin");
      // console.log("hihi");
      return;
    }
    Login({ username, password });
  };

  console.log(res);

  useEffect(() => {
    if (res) {
      if (res?.result?.status === true) {
        sessionStorage.setItem("auth", res?.result?.auth);
        toast.success(res.result.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return;
      }
      toast.error(res?.result?.message || res?.message);
    }
  }, [res]);
  return (
    <div className="min-h-[100vh] flex flex-col  items-center bg-login">
      <div className="logo">
        <img src={logo} />
      </div>
      <h1 className="title mt-12 mb-8 font-bold">Đăng Nhập</h1>
      <div className="flex items-center w-full">
        <HiUser size={30} color="#007bff" />
        <input
          placeholder="Tài khoản"
          className="inputform"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center w-full">
        <IoIosUnlock size={30} color="#007bff" />
        <input
          placeholder="Mật khẩu"
          className="inputform"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full">
        <button onClick={handleLogin} className="btn_submit">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

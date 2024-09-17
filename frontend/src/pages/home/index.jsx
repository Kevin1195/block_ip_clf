import "../page.css";
import logo from "../../assets/images/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";
import { useBlockIPMutation } from "../../api/apiuser";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoIosUnlock } from "react-icons/io";

export const checkToken = () => {
  const accessToken = sessionStorage.getItem("auth");
  if (!accessToken) {
    sessionStorage.removeItem("auth");
    window.location.assign("/login");
  }
};

export default function Home() {
  checkToken();
  const token = sessionStorage.getItem("auth");
  const [ip, setIp] = useState("");
  const [blockIp, { data: res }] = useBlockIPMutation();

  const handleBlock = () => {
    if (!ip) {
      toast.warn("Chưa nhập ip");
      return;
    }
    blockIp({ ip });
  };

  useEffect(() => {
    if (res) {
      if (res?.result?.status) {
        toast.success(res.result.message);
        setIp("");
        return;
      }
      toast.error(res?.result?.message);
    }
  }, [res]);

  return (
    <div className="min-h-[100vh] flex flex-col  items-center bg-login relative">
      <div className="logo">
        <img src={logo} />
      </div>
      <h1 className="title mb-4 mt-12 font-bold">IP Người Dùng</h1>
      <div className="flex items-center w-full">
        <IoShieldHalfSharp size={30} color="#007bff" />
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Nhập IP người dùng"
          className="inputform"
        />
      </div>
      <div className="text-center mb-4 mt-4">
        Lưu ý: Nếu IPv4 vui lòng nhập chính xác. Nếu IPv6, ví dụ
        <span className="text-[blue] ml-2">
          2001:0DC8:1005:2F43:0BCD:FFFF
        </span>{" "}
        hãy nhập ngắn gọn như sau
        <span className="text-[blue] ml-2">2001:0DC8:1005::/48</span>
      </div>
      <div onClick={handleBlock} className="w-full">
        <button className="btn_submit flex items-center justify-center">
          Mở Khóa Ngay
          <IoIosUnlock className="ml-2" size={20} />
        </button>
      </div>
      <div
        onClick={() => {
          sessionStorage.clear();
          toast("Đăng xuất thành công");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }}
        className="w-[100px] absolute top-0 right-4 "
      >
        <button className="btn_submit">
          {token ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

import { useState } from "react";
import instance from "../axiosInstance";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm({ isLogin = true }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    // Input validation
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await instance.post(endpoint, form);

      if (res.status === 200 || res.status === 201) {
        dispatch(setCredentials(res.data));
        navigate("/");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hidden bg-[#F3F5F7] lg:flex lg:items-center lg:justify-center lg:w-1/2 w-full">
        <img
          src="/loginimage.png"
          alt="Login Background"
          className="object-cover h-screen"
        />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center lg:p-6 p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-[32px] "
          noValidate
        >
          <div className="flex flex-col gap-[24px]">
            <h2 className="text-3xl font-poppins font-semibold mb-2">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <p className="font-poppins text-sm">
              {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
              <Link to={isLogin ? "/register" : "/login"} className="text-[#38CB89]  ">
                {isLogin ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-[24px]">

            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                className="w-full font-inter border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none placeholder-gray-500 py-2 transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={loading}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full font-inter border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none placeholder-gray-500 py-2 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full font-inter border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none placeholder-gray-500 py-2 transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
              required
            />
       <label className="flex items-center space-x-2 cursor-pointer select-none">
  <input
    type="checkbox"
    className="w-4 h-4 accent-gray-800  rounded-sm"
  />
  {isLogin?(<span className="text-sm font-inter text-[#6C7275]">
    Remember me
  </span>):(<span className="text-sm font-inter text-[#6C7275]">
    I agree with <a href="#" className="font-semibold text-black ">Privacy Policy</a> and <a href="#" className="font-semibold text-black ">Terms of Use</a>
  </span>) }
  
</label>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-inter p-2 rounded  text-white transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#141718] hover:bg-gray-800"
              }`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>

          <p className={`text-sm text-center font-inter min-h-[1.25rem] transition-opacity duration-300 ${error ? "text-red-600 opacity-100" : "opacity-0"
            }`}>
            {error || ""}
          </p>
        </form>
      </div>
    </>
  );
}

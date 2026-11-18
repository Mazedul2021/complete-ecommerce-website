import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const user = await login(form.email, form.password);
      const target =
        location.state?.from ?? (user.role === "admin" ? "/admin" : "/");
      navigate(target, { replace: true });
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full h-[48px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 text-[14px] outline-none focus:border-[#ff5252] transition";

  return (
    <section className="py-12 bg-[#fafafa] min-h-[60vh] flex items-center">
      <div className="container">
        <div className="max-w-[440px] mx-auto bg-white rounded-2xl shadow-lg border border-[rgba(0,0,0,0.06)] p-8">
          <div className="text-center mb-6">
            <h1 className="text-[26px] font-[700]">Welcome Back 👋</h1>
            <p className="text-[13.5px] text-[rgba(0,0,0,0.5)] mt-1">
              Sign in to your Olevs Watch Shop account
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={inputCls}
            />

            {error && (
              <p
                role="alert"
                className="text-[12.5px] font-semibold text-[#e11d48] bg-rose-50 border border-rose-200 rounded-md px-3 py-2"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label={<span className="text-[13px]">Remember me</span>}
              />
              <Link
                to="/help-center"
                className="text-[13px] text-[#ff5252] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="btn-org w-full !normal-case !py-3"
            >
              {busy ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="text-[11.5px] text-center text-[rgba(0,0,0,0.45)] mt-3">
            Store administrators sign in here with their admin account.
          </p>

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-[rgba(0,0,0,0.1)]" />
            <span className="text-[12px] text-[rgba(0,0,0,0.4)]">or continue with</span>
            <span className="flex-1 h-px bg-[rgba(0,0,0,0.1)]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-[44px] border border-[rgba(0,0,0,0.15)] rounded-md text-[13.5px] font-[500] hover:border-[#ff5252] transition">
              <FaGoogle className="text-[#DB4437]" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 h-[44px] border border-[rgba(0,0,0,0.15)] rounded-md text-[13.5px] font-[500] hover:border-[#ff5252] transition">
              <FaFacebookF className="text-[#1877F2]" /> Facebook
            </button>
          </div>

          <p className="text-center text-[13.5px] text-[rgba(0,0,0,0.55)] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#ff5252] font-[600] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate("/", { replace: true });
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
        <div className="max-w-[480px] mx-auto bg-white rounded-2xl shadow-lg border border-[rgba(0,0,0,0.06)] p-8">
          <div className="text-center mb-6">
            <h1 className="text-[26px] font-[700]">Create Account ✨</h1>
            <p className="text-[13.5px] text-[rgba(0,0,0,0.5)] mt-1">
              Join 10,000+ watch lovers at Olevs Watch Shop
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <input
              required
              autoComplete="name"
              placeholder="Full Name"
              value={form.name}
              onChange={set("name")}
              className={inputCls}
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email Address"
              value={form.email}
              onChange={set("email")}
              className={inputCls}
            />
            <input
              required
              autoComplete="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={set("phone")}
              className={inputCls}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Password"
                value={form.password}
                onChange={set("password")}
                className={inputCls}
              />
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Confirm"
                value={form.confirm}
                onChange={set("confirm")}
                className={inputCls}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-[12.5px] font-semibold text-[#e11d48] bg-rose-50 border border-rose-200 rounded-md px-3 py-2"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={busy}
              className="btn-org w-full !normal-case !py-3"
            >
              {busy ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="text-[11.5px] text-center text-[rgba(0,0,0,0.45)] mt-3">
            New accounts are customer accounts. Admin access is granted separately.
          </p>

          <p className="text-center text-[13.5px] text-[rgba(0,0,0,0.55)] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff5252] font-[600] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

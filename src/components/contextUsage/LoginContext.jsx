import { useState } from "react";
import useAuth from "../mycontext/AuthContext";
import { toast } from "react-toastify";

const LoginContext = () => {

  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);

    setForm({ name: "", email: "", password: "" })
    toast.success("Login Successful")
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border p-2"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginContext;
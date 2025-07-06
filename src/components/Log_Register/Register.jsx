import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { motion } from 'framer-motion';


const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Invalid email';
    if (form.password.length < 6) errs.password = 'Password too short';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) toast.success("Registration successfull!"); 
        else toast.error("Registration Failed!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="mb-3">
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label className="block text-sm mb-1">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div className="mb-3">
        <label className="block text-sm mb-1">Confirm Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full p-2 border rounded"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
        <label className="text-xs mt-1 inline-flex items-center">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Show Password
        </label>
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transform transition-transform duration-200 hover:scale-105">
        Login 
        </button>

    </form>
  );
};

export default Register;

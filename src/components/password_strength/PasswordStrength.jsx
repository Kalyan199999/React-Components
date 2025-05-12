import React, { useState } from 'react';

function PasswordStrength() {

   const [password, setPassword] = useState('');

  const conditions = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'Contains number', valid: /[0-9]/.test(password) },
    { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passedCount = conditions.filter(cond => cond.valid).length;

  const allValid = passedCount === conditions.length;

  const strengthLabel = ['Too Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500', 'bg-emerald-600'];
  const borderColor = ['border-red-500', 'border-orange-500', 'border-yellow-400', 'border-green-500', 'border-emerald-600'];
  const strengthWidth = ['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];

  const handleSubmit = () => {
    alert('Password is strong and submitted!');
    setPassword("")
  };

  return (
    
    <div className="max-w-md mx-auto mt-12 p-6 rounded-xl bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className={`w-full p-2 border ${borderColor[Math.min(passedCount, 4)]} rounded mb-4 focus:outline-none`}
      />

      {
        password && (
            <>
              <div className="w-full h-3 bg-gray-200 rounded mb-2">
                <div
                  className={`h-full rounded ${strengthColor[Math.min(passedCount, 4)]} ${strengthWidth[Math.min(passedCount, 4)]}`}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-2">{strengthLabel[Math.min(passedCount, 4)]}</p>
          
              <ul className="text-sm space-y-1 mb-4">
                {conditions.map((cond, index) => (
                  <li key={index} className={`flex items-center ${cond.valid ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{cond.valid ? '✅' : '❌'}</span> {cond.label}
                  </li>
                ))}
              </ul>
            </>
            )
        }          


      <button
        onClick={handleSubmit}
        disabled={!allValid}
        className={`w-full py-2 text-white font-semibold rounded ${
          allValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </div>
  );
}

export default PasswordStrength

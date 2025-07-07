import { useRef, useState } from 'react';

import { toast } from 'react-toastify';

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // stop browser default backspace behavior

      if (otp[index]) 
        {
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      } 
      else if (index > 0) 
        {
        inputRefs.current[index - 1]?.focus();
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === '123456') {
      // alert('✅ OTP Verified');
      toast.success('OTP Verified');
      setOtp(Array(6).fill(''))
    } else {
      // alert('❌ Invalid OTP');
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[340px]">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Enter OTP</h2>
      <div className="flex justify-between gap-1 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center border rounded-md text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpInput;
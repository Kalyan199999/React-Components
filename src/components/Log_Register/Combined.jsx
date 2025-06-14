import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Combined() {
    const [isLogin, setIsLogin] = useState(true);

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">

        {isLogin ? <Login /> : <Register />}

        <p className="mt-4 text-center text-sm">

          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-600 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
            
          </button>
        </p>
      </div>
    </div>
  );
 
}

export default Combined

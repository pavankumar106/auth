import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="h-[100vh] w-[100vw] bg-gray-800">
      <div className="flex flex-col items-center justify-center pt-[250px]">
        <div>
          <FaRegUserCircle size={50} />
          <p>Sign Up</p>
        </div>
        <div>
          <h2 className="text-white">Full Name</h2>
          <input type="text" />
        </div>
        <div>
          <h2 className="text-white">Email Address</h2>
          <input type="email" />
        </div>
        <div>
          <h2 className="text-white">Password</h2>
          <input type="text" />
        </div>
        <div>
          <button>Create Account</button>
        </div>
        <p>
          By clicking 'Create Account' you agree to Privacy Policy and Terms of
          service
        </p>
      </div>
    </div>
  );
};

export default SignUp;

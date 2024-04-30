import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1E2329] p-8 rounded-lg shadow-md text-white"
        >
          <h1 className="text-lg font-bold text-center mb-6">Sign in</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded text-black"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded text-black"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-xs ml-2">
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-xs hover:text-[#FCD535]"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-2 px-4 rounded"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <p className="text-xs">
              Don&apos;t have an account?
              <Link href="/auth/registration" className="hover:text-[#FCD535]">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="mt-4">
            {/* These buttons will need proper handlers for social media login */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Continue with Google
            </button>
            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded mt-2">
              Continue with Apple
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2">
              Continue with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

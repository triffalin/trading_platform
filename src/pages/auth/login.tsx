import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (response.ok) {
        localStorage.setItem('token', responseData.token); // Store token
        router.push('/dashboard');
      } else {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center px-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={80}
          className="mb-8"
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded bg-black text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded bg-black text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-xs">
              Remember me
            </label>
          </div>
          <Link href="/auth/forgot-password">
            <span className="text-xs hover:text-[#FCD535]">
              Forgot your password?
            </span>
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          Sign In
        </button>
        <div className="text-center mt-4">
          <p className="text-xs">
            Don’t have an account?{' '}
            <Link href="/auth/registration" className="hover:text-[#FCD535]">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="pt-4 text-center text-xs">
          <div className="border-t border-gray-700 pt-4">or</div>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Continue with Google
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded">
            Continue with Apple
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
  referralCode?: string;
};

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.status === 'success') {
        router.push('/dashboard');
      } else {
        console.error('Registration failed:', responseData.errorMessage);
      }
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    router.push(`/api/auth/${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center px-4">
      <Link href="/">
        <>
          <Image src="/logo.svg" alt="Platform Logo" width={80} height={80} />
        </>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            id="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded bg-black text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              }
            })}
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-black text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="referralCode" className="sr-only">
            Referral Code (optional)
          </label>
          <input
            {...register('referralCode')}
            id="referralCode"
            type="text"
            placeholder="Referral Code (optional)"
            className="w-full p-3 rounded bg-black text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          Sign Up
        </button>
        <div className="social-login-buttons">
          <button
            onClick={() => handleSocialLogin('google')}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full mb-2"
          >
            Sign up with Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
          >
            Sign up with Facebook
          </button>
        </div>
        <p className="text-center text-xs mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="hover:text-[#FCD535]">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

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
      if (responseData.status === 'success') {
        router.push('/dashboard');
      } else {
        console.error('Login failed:', responseData.errorMessage);
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
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
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
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
            {...register('password', { required: 'Password is required' })}
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-black text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          Sign In
        </button>
        <div className="text-center text-xs mt-2">
          <Link href="/auth/forgot-password" className="hover:text-[#FCD535]">
            Forgot your password?
          </Link>
        </div>
        <div className="social-login-buttons mt-4 space-y-2">
          <button
            onClick={() => handleSocialLogin('google')}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full mb-2"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
          >
            Continue with Facebook
          </button>
        </div>
        <p className="text-center text-xs mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/registration" className="hover:text-[#FCD535]">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

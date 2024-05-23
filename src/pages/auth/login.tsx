import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Inputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>();
  const [message, setMessage] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      console.log('Login form submitted with data:', data);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log('Login API response:', responseData);
      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        router.push('/dashboard');
      } else {
        setMessage(responseData.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    router.push(`/api/auth/${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center text-white px-4">
      <Link href="/" passHref aria-label="Home">
        <Image
          src="/logo.svg"
          alt="Platform Logo"
          width={80}
          height={80}
          priority
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg mt-4"
      >
        <fieldset>
          <legend className="text-2xl font-bold text-center mb=4">
            Sign In
          </legend>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              id="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded bg-black text-white"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              id="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-black text-white"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black font-semibold py-3 rounded transition-all duration-300"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </fieldset>
        {message && (
          <p className="mt-4 text-center text-sm text-[#FCD535]">{message}</p>
        )}
      </form>
      <div className="text-center mt-4">
        <Link href="/auth/forgot-password" className="hover:text-[#FCD535]">
          Forgot your password?
        </Link>
      </div>
      <div className="social-login-buttons mt-4 space-y-2">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
        >
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
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
    </div>
  );
};

export default LoginPage;

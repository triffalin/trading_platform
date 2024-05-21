import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Inputs {
  email: string;
  password: string;
  referralCode?: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    mode: 'onChange'
  });
  const [message, setMessage] = useState<string>('');

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
      if (response.ok) {
        router.push('/dashboard');
      } else {
        setMessage(
          responseData.errorMessage || 'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      console.error('Failed to register:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    router.push(`/api/auth/${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center text-white px-4">
      <Link href="/" passHref aria-label="Home">
        <>
          <Image
            src="/logo.svg"
            alt="Platform Logo"
            width={80}
            height={80}
            priority
          />
        </>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg mt-4"
      >
        <fieldset>
          <legend className="text-2xl font-bold text-center mb-4">
            Sign Up
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
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
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
            disabled={isSubmitting}
            className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black font-semibold py-3 rounded transition-all duration-300"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </fieldset>
        {message && (
          <p className="mt-4 text-center text-sm text-[#FCD535]">{message}</p>
        )}
      </form>
      <div className="social-login-buttons mt-4 space-y-2">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full mb-2"
        >
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
        >
          Sign up with Facebook
        </button>
      </div>
      <p className="text-center text-xs mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="hover:text-[#FCD535]">
          <>Sign In</>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

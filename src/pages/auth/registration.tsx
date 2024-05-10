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
    formState: { errors, isSubmitting }
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
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Entered value does not match email format'
              }
            })}
            id="email"
            type="email"
            placeholder="Email Address"
            className="input w-full p-3 rounded bg-black text-white"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-label="Enter your email address"
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
            className="input w-full p-3 rounded bg-black text-white"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-label="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <input
          {...register('referralCode')}
          id="referralCode"
          type="text"
          placeholder="Referral Code (optional)"
          className="input w-full p-3 rounded bg-black text-white"
          aria-invalid={errors.referralCode ? 'true' : 'false'}
          aria-label="Enter your referral code"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        <div className="social-login-buttons mt-4 space-y-2">
          <button
            onClick={() => handleSocialLogin('google')}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full mb-2"
            aria-label="Sign up with Google"
          >
            Sign up with Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
            aria-label="Sign up with Facebook"
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
      </form>
    </div>
  );
};

export default RegisterPage;

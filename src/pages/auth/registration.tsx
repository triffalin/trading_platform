import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
  referralCode: string;
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
        router.push('/auth/login');
      } else {
        console.error('Registration failed:', responseData.errorMessage);
      }
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center px-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <input
          {...register('email', { required: 'Email is required' })}
          id="email"
          type="email"
          placeholder="Email you want to confirm"
          className="w-full p-3 rounded bg-black text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: 8
          })}
          id="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <input
          {...register('referralCode')}
          id="referralCode"
          type="text"
          placeholder="Referral code (optional)"
          className="w-full p-3 rounded bg-black text-white"
        />

        <div className="flex items-center mb-4">
          <input type="checkbox" id="news" className="mr-2" />
          <label htmlFor="news" className="text-xs">
            Please send me news and offers from Qtrading
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          Sign Up
        </button>

        <div className="text-center mt-4">
          <p className="text-xs">
            Already have an account?
            <Link href="/auth/login" className="hover:text-[#FCD535]">
              Sign In
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

export default RegisterPage;

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

type Inputs = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (response.ok) {
        setMessage('Check your email for the reset link.');
      } else {
        setMessage('Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-center text-sm mb-4">
          Please enter the e-mail address associated with your User account.
        </p>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          {...register('email', { required: 'Email is required' })}
          id="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-black text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-xs" aria-live="assertive">
            {errors.email.message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          {loading ? 'Sending...' : 'Reset'}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-[#FCD535]">{message}</p>
        )}
        <div className="pt-4 text-center text-xs">
          <Link href="/auth/login" className="hover:text-[#FCD535]">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

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
  } = useForm<Inputs>({
    mode: 'onChange'
  });
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
        <fieldset>
          <legend className="text-2xl font-bold text-center mb-4">
            Forgot Password
          </legend>
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
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
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
          >
            {loading ? 'Sending...' : 'Reset'}
          </button>
        </fieldset>
        {message && (
          <p className="mt-4 text-center text-sm text-[#FCD535]">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

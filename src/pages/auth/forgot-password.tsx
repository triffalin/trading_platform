import React from 'react';
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

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('/auth/forgot-password', {
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
    <div className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center px-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={260} height={120} />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1E2329] p-12 rounded-lg shadow-lg text-white w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Forgot password</h1>
        <p className="text-center text-sm mb-4">
          Please enter the e-mail address associated with your User account
        </p>
        <input
          {...register('email', { required: 'Email is required' })}
          id="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-black text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-[#FCD535] hover:bg-[#F0B90B] text-black py-3 px-4 rounded font-semibold"
        >
          Reset
        </button>
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

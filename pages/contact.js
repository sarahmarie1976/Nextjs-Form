import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';

export default function Contact() {
  const router = useRouter();
  const schema = yup
    .object({
      firstName: yup.string().required().max(80),
      lastName: yup.string().required().max(100),
      Email: yup.string().required().email(),
      Message: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch('/api/formdata', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    alert(`is this your name: ${data.firstName}`);
    router.push('/thankyou');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      {console.log(errors)}
      <input
        type='text'
        name='firstName'
        id='first'
        placeholder='First Name'
        {...register('firstName')}
      />

      {errors.firstName?.message}

      <input
        type='text'
        name='lastName'
        id='last'
        placeholder='Last Name'
        {...register('lastName')}
      />

      {errors.lastName?.message}

      <input
        type='email'
        name='Email'
        id='email'
        placeholder='Email'
        {...register('Email')}
      />

      {errors.Email?.message}

      <input
        type='textarea'
        name='Message'
        id='message'
        placeholder='Message'
        {...register('Message')}
      />

      {errors.Message?.message}

      <button type='submit'>Submit</button>
    </form>
  );
}

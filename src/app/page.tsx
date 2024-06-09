"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const IndexPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return null;
};

export default IndexPage;

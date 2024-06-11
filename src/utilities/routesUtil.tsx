"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ProtectedRoute = (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;

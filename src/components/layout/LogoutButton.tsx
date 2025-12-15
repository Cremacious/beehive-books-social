'use client';
import { signOut } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log('logout clicked');
    await signOut();
    router.push('/sign-in');
  };

  return (
    <Button onClick={handleSignOut} variant={'beeDark'} type="submit">
      Logout
    </Button>
  );
};
export default LogoutButton;

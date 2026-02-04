'use client';
import { signOut } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter, usePathname } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDemo = pathname.startsWith('/demo');

  const handleSignOut = async () => {
    if (isDemo) {
      router.push('/');
    } else {
      await signOut();
      router.push('/sign-in');
    }
  };

  return (
    <Button onClick={handleSignOut} variant={'beeDark'} type="submit">
      {isDemo ? 'Exit Demo' : 'Logout'}
    </Button>
  );
};
export default LogoutButton;

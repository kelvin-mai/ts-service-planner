import { signOut } from '@/api/auth';
import { useAuth } from '@/hooks';

export const HomePage = () => {
  const auth = useAuth();
  console.log(auth);
  const handleClick = () => {
    console.log('clicked');
    signOut();
  };
  return (
    <>
      Hello World
      <button onClick={handleClick}>Sign out</button>
    </>
  );
};

import { useEffect } from 'react';
import { userService } from '../../services/user.service';
import { useRouter } from "next/router";

export { Layout };

function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (userService.userValue) {
      router.push('/');
    }
  }, []);

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      {children}
    </div>
  );
}

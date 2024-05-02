import { paths } from '@lib/constant';
import { publicPaths } from '@lib/constant/_publicPaths';
import { toolbox } from '@lib/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { checkAuth } from '../lib/utils';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        if (publicPaths.includes(router.pathname)) return setIsAuthenticated(true);
        const isAuthenticated = checkAuth();
        setIsAuthenticated(isAuthenticated);

        // Redirect to login page if user is not authenticated
        if (!isAuthenticated && typeof window !== 'undefined') {
          router.push({
            pathname: paths.auth.login,
            query: {
              redirectUrl: toolbox.pathToUrl(router.asPath),
            },
          });
        }
      };

      fetchData();
    }, [router]);

    // Render the wrapped component if the user is authenticated and on the client-side
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  // Set the display name for easier debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default WithAuth;

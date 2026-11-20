import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type PageRoute = '/' | '/about' | '/categories' | '/products' | '/contact';

export interface RouteState {
  path: PageRoute;
  params: Record<string, string>;
}

interface RouterContextValue {
  route: RouteState;
  navigate: (path: PageRoute, params?: Record<string, string>) => void;
}

const VALID_PATHS: PageRoute[] = ['/', '/about', '/categories', '/products', '/contact'];

function parseLocation(): RouteState {
  const rawHash = window.location.hash.replace(/^#/, '');
  const rawPath = rawHash || window.location.pathname || '/';
  const [pathnamePart, searchPart] = rawPath.split('?');

  const params: Record<string, string> = {};
  const queryString = searchPart ?? window.location.search.replace(/^\?/, '');
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  if (pathnamePart === '/brands') {
    return { path: '/about', params: { ...params, section: 'brands' } };
  }

  const normalizedPath = VALID_PATHS.includes(pathnamePart as PageRoute)
    ? (pathnamePart as PageRoute)
    : '/';

  return { path: normalizedPath, params };
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => parseLocation());

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(parseLocation());
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigate = useCallback((path: PageRoute, params?: Record<string, string>) => {
    const cleanParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v) cleanParams[k] = v;
      });
    }
    const qs = new URLSearchParams(cleanParams).toString();
    const targetHash = qs ? `#${path}?${qs}` : `#${path}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setRoute({ path, params: cleanParams });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}

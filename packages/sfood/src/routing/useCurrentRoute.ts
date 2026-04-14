import { useEffect, useState } from 'react';

import { getRouteByPath, type PagePath } from './routes';

const navigationEvent = 'sfood:navigation';

export function navigateTo(path: PagePath) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
  window.dispatchEvent(new Event(navigationEvent));
}

export function useCurrentRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', syncPathname);
    window.addEventListener(navigationEvent, syncPathname);

    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.removeEventListener(navigationEvent, syncPathname);
    };
  }, []);

  return {
    pathname,
    route: getRouteByPath(pathname),
  };
}

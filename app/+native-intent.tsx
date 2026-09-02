type RedirectSystemPathOptions = {
  initial: boolean;
  path: string;
};

export function redirectSystemPath({ path }: RedirectSystemPathOptions) {
  try {
    const url = new URL(path, 'pudding:///');

    if (
      url.protocol === 'pudding:' &&
      (url.hostname === 'tasks' || url.pathname === '/tasks')
    ) {
      return '/tasks';
    }

    if (path === 'tasks') {
      return '/tasks';
    }

    return path;
  } catch {
    return path;
  }
}

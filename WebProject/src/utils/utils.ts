import { L } from '../lib/abpUtility';

declare const abp: any;
class Utils {
  extend(...args: any[]) {
    let target = args[0] || {};
    let i = 1;
    let deep = false;
    const { length } = args;
    if (typeof target === 'boolean') {
      deep = target;
      target = args[i] || {};
      i += 1;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }
    if (i === length) {
      target = this;
      i -= 1;
    }
    for (; i < length; i += 1) {
      const options = args[i];
      if (options !== null) {
        Object.keys(options).forEach((name) => {
          const src = target[name];
          const copy = options[name];
          if (target !== copy) {
            const srcType = Array.isArray(src) ? 'array' : typeof src;
            let copyIsArray = Array.isArray(copy);
            if (deep && copy && (copyIsArray || typeof copy === 'object')) {
              let clone;
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && srcType === 'array' ? src : [];
              } else {
                clone = src && srcType === 'object' ? src : {};
              }
              target[name] = this.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        });
      }
    }

    return target;
  }

  getPageTitle = (pathname: string, userRouter: any, appRouters: any) => {
    const route = [...userRouter, ...appRouters].filter((r) => r.path === pathname);
    const localizedAppName = L('Common.AppName');
    if (!route || route.length === 0) {
      return localizedAppName;
    }

    return `${L(`Menu.${route[0].title}`)} | ${localizedAppName}`;
  };

  getRoute = (path: string, userRouter: any, appRouters: any): any => (
    [...userRouter, ...appRouters].filter((route) => route.path === path)[0]
  );

  setLocation = () => {
    if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
      const language = 'en'; // navigator.language;
      abp.utils.setCookieValue('Abp.Localization.CultureName', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
    }
  };

  // remove null, undefined
  makeGetRequestObject = (body: any) => {
    const result = { ...body };
    Object.keys(body).forEach((key) => {
      const keyValue = body[key];
      if (typeof keyValue === 'undefined' || keyValue === null || keyValue === '') {
        delete result[key];
      }
    });
    return result;
  };
}

export default new Utils();

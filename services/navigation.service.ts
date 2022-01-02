/**
 *
 *
 * @export
 * @enum {string}
 */
export enum PAGE_KIND {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  HOME = "HOME",
  DASHBOARD = "DASHBOARD",
}

/**
 *
 *
 * @param {PAGE_KIND} pageKind
 * @return {*} path to navigate
 */
export const getPathToNavigate = (pageKind: PAGE_KIND): string => {
  switch (pageKind) {
    case PAGE_KIND.REGISTER:
      return "/register";
    case PAGE_KIND.LOGIN:
      return "/login";
    case PAGE_KIND.DASHBOARD:
      return "/app";
    case PAGE_KIND.HOME:
    default:
      return "/";
  }
};

import type { IronSessionOptions } from "iron-session";
import type { User } from "../pages/api/user";

export const sessionOptions: IronSessionOptions = {
  password: "UiPgbeBvZMNs7HZppBgmGrZqgKzPjuM2",
  cookieName: "iron-session/examples/next.js",
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
};

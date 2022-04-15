import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next";
import type { User } from "./user";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(
  async (req, res: NextApiResponse<User>) => {
    req.session.destroy();
    res.json({ isLoggedIn: false, login: "", avatarUrl: "" });
  },
  sessionOptions,
)

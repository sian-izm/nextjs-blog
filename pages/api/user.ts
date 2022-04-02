import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  console.log("hoge");
  if (req.session.user) {
    console.log("have session");
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    console.log("No Session");

    res.json({
      isLoggedIn: false,
      login: "",
      avatarUrl: "",
    });
  }
}

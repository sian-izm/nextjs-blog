import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
  name: string;
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  console.log("userRoute called")
  if (req.session.user) {
    console.log("have session");
    console.log(req.session.user);

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
      name: "",
    });
  }
}

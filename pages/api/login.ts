import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
const octokit = new Octokit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  console.log("login routes called");

  const { username } = await req.body;
  try {
    const {
      data: { login, avatar_url, id }
    } = await octokit.rest.users.getByUsername({ username });
    console.log("logged in api called")
    const user = { isLoggedIn: true, login, avatarUrl: avatar_url, username: username } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

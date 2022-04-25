import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import type { User } from "./user";

const octokit = new Octokit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;
  try {
    const {
      data: { login, avatar_url, id, name }
    } = await octokit.rest.users.getByUsername({ username });
    const user = { isLoggedIn: true, login, avatarUrl: avatar_url, id: id, name: name } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

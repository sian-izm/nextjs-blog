import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
const oktkit = new Octkit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;
  try {
    const {
      data: { name, password, id }
    } = await octokit.res.users.getByName({ username });

    const user = { password: "PASSWORD", id: 100 } as User;
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

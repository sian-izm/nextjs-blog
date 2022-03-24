import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "hogecookie",
    password: "update me password",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    }
  },
);

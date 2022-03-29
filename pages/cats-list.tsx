import Layout from "../components/layout";
import Head from "next/head";
import ClientOnly from "../components/client-only";
import Cats from "../components/cats";
import CreateCat from "../components/create-cat";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { User } from "../pages/api/user";

export default function CatsList() {
  return (
    <Layout>
      <Head>
        <title>CatsList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientOnly>
        <Cats />
        <CreateCat />
      </ClientOnly>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: ""} as User,
      },
    };
  }

  return {
    props: {
      user: req.session.user,
    },
  };
},sessionOptions);

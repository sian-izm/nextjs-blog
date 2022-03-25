import Layout from "../components/layout";
import Head from "next/head";
import ClientOnly from "../components/client-only";
import Cats from "../components/cats";
import CreateCat from "../components/create-cat";
import { withIronSessionSsr } from "iron-session/next";

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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user.admin !== true ) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  {
    cookieName: "hogecookie",
    password: "update me password",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    }
  },
)

import Layout from "../components/layout";
import Head from "next/head";
import ClientOnly from "../components/client-only";
import Cats from "../components/cats";
import CreateCat from "../components/create-cat";

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

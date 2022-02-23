import Layout from "../components/layout";
import Head from "next/head";
import ClientOnly from "../components/client-only";
import Countries from "../components/countries";

export default function MyCountries() {
  return (
    <Layout>
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientOnly>
        <Countries />
      </ClientOnly>
    </Layout>
  );
}

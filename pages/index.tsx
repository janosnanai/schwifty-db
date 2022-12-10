import Head from "next/head";
import type { NextPage } from "next";

import LayoutMain from "../components/layout/layout-main";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>schwiftyDB - home</title>
        <meta
          name="description"
          content="The Rick and Morty series database."
        />
      </Head>
      <LayoutMain>
        <h1 className="font-heading text-2xl">
          Welcome to the Rick and Morty database!
        </h1>
        <p className="text-lg"></p>
      </LayoutMain>
    </>
  );
};

export default HomePage;

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
          content="The unofficial Rick and Morty series database."
        />
      </Head>
      <LayoutMain>
        <div className="container mx-auto mt-7">
          <h1 className="font-heading text-5xl text-center text-zinc-800 dark:text-zinc-200">
            Welcome to{" "}
            <strong className="text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-purple-500">
              schwiftyDB
            </strong>
          </h1>
          <h2 className="font-heading text-center mt-3 text-2xl text-zinc-700 dark:text-zinc-300">
            The unofficial Rick and Morty database
          </h2>
          <p className="text-lg text-center mt-9">
            Made by{" "}
            <a href="https://github.com/janosnanai" className="text-purple-500">
              János Nánai
            </a>
            .
          </p>
          <p className="text-lg text-center">
            Using{" "}
            <a href="https://rickandmortyapi.com/" className="text-purple-500">
              The Rick and Morty API
            </a>{" "}
            by Axel Fuhrmann.
          </p>
        </div>
      </LayoutMain>
    </>
  );
};

export default HomePage;

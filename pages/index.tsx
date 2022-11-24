import type { NextPage } from "next";

import LayoutMain from "../components/layout/layout-main";

const HomePage: NextPage = () => {
  return (
    <LayoutMain>
      <h1 className="font-heading text-2xl">
        Welcome to the Rick and Morty database!
      </h1>
      <p className="text-lg"></p>
    </LayoutMain>
  );
};

export default HomePage;

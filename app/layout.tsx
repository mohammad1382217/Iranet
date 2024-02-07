import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <section className="container min-h-screen">
      <Outlet/>
    </section>
  );
};

export default RootLayout;

import React from "react";
import ConfigProvider from "antd/es/config-provider/index";
import faIR from "antd/lib/locale/fa_IR";
import { Outlet, ScrollRestoration } from "react-router-dom/dist/index";

const RootLayout: React.FC = () => {
  return (
    <ConfigProvider locale={faIR} direction="rtl">
      <section className=" min-h-screen">
        <ScrollRestoration/>
        <Outlet />
      </section>
    </ConfigProvider>
  );
};

export default RootLayout;

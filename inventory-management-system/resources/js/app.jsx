import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import Layout from "./Layouts/Layout.jsx";
createInertiaApp({
  title: (title) => `${title} - Inventory Panel`,

  resolve: async (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx");
    const importPage = pages[`./Pages/${name}.jsx`];

    if (!importPage) {
      console.error(`❌ Page not found: ./Pages/${name}.jsx`);
      throw new Error(`Page not found: ${name}`);
    }

    const page = await importPage();

    // ✅ Conditionally add layout
    // Exclude Auth pages (Login, Register)
    const authPages = ["Auth/Login", "Auth/Register"];
    if (!authPages.includes(name)) {
      page.default.layout = page.default.layout || ((pageContent) => <Layout>{pageContent}</Layout>);
    } else {
      page.default.layout = page.default.layout || ((pageContent) => <>{pageContent}</>);
    }

    return page;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

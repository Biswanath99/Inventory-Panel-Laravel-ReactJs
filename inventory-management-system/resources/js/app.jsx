import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react"; // ✅ use this package, not @inertiajs/inertia-react
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

    // ✅ Add layout only if it doesn’t exist
    page.default.layout = page.default.layout || ((pageContent) => <Layout>{pageContent}</Layout>);

    return page;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

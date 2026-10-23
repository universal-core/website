import React from "react";
import Layout from "@theme/Layout";
import { TutorialVisitProvider } from "@site/src/context/tutorial-visit-context";

export default function TutorialPageLayout({ children }) {
  return (
    <Layout>
      <TutorialVisitProvider>{children}</TutorialVisitProvider>
    </Layout>
  );
}

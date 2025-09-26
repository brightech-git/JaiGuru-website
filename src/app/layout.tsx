"use client";

import "./globals.css";
import Provider from "@/providers/Provider";
import Layout from "@/component/layoutWrapper/LayoutWrapper";
// Google Fonts imports remain the same
import { Domine, Saira } from "next/font/google";

const domine = Domine({ subsets: ["latin"], weight: ["400", "500", "700"] });
const saira = Saira({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${domine.className} ${saira.className}`}>
      <body>
        {/* Wrap all children in the combined Provider */}
        <Provider>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}

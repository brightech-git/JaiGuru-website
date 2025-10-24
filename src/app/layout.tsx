"use client";

import "./globals.css";
import Provider from "@/providers/Provider";
import Layout from "@/component/layoutWrapper/LayoutWrapper";
import * as fonts from '@/lib/font'; // all fonts imported as object

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`
        ${fonts.domine.className} 
        ${fonts.saira.className} 
        ${fonts.creepster.className} 
        ${fonts.amaticSC.className} 
        ${fonts.parisienne.className} 
        ${fonts.poiretOne.className} 
        ${fonts.merriweather.className} 
        ${fonts.satisfy.className} 
        ${fonts.cinzel.className} 
        ${fonts.courgette.className}
      `}
    >
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}

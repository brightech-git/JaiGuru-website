'use client';

import React from "react";
import HomePage from "@/component/component/home/Home";
import AnimatedPage from "@/component/ui/AnimatedPage";

export default function App() {


  return (
    <AnimatedPage pageId="home-page">
      <HomePage />
    </AnimatedPage>
  );
}

"use client";

import RecipeForm from "./RecipeForm";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiagonalSection from "./components/DiagonalSection";
import SectionContainer from "./components/SectionContainer";
import ContentSection from "./components/ContentSection";
import Title from "./components/Title";

export default function Home() {
  const [expandDiagonal, setExpandDiagonal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setExpandDiagonal(false), 400);
    return () => clearTimeout(timeout);
  }, []);

  // This handler will be passed to RecipeForm
  const handleFormSubmit = (url: string) => {
    setExpandDiagonal(true);
    setTimeout(() => {
      router.push(url);
    }, 400); // Match the transition duration
  };

  return (
    <SectionContainer>
      <ContentSection>
        <Title>Recipe GPT Optimizer</Title>
        <p>By: Eric Nohara-LeClair</p>
        <RecipeForm onAnimatedSubmit={handleFormSubmit} />
      </ContentSection>
      <DiagonalSection $expand={expandDiagonal} />
    </SectionContainer>
  );
}

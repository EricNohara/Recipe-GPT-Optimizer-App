"use client";

import RecipeForm from "./RecipeForm";
import styled from "styled-components";
import { titleFont } from "./style/localFonts";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiagonalSection from "./components/DiagonalSection";

const SectionContainer = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: var(--fourth);
  overflow-x: hidden;
  position: relative;
`;

const ContentSection = styled.div`
  background-color: var(--background);
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
  padding: 2rem 4rem;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppTitle = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export default function Home() {
  const [expandDiagonal, setExpandDiagonal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setExpandDiagonal(false), 700);
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
        <AppTitle className={titleFont.className}>
          Recipe GPT Optimizer
        </AppTitle>
        <p>By: Eric Nohara-LeClair</p>
        <RecipeForm onAnimatedSubmit={handleFormSubmit} />
      </ContentSection>
      <DiagonalSection $expand={expandDiagonal} />
    </SectionContainer>
  );
}

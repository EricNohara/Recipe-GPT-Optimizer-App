"use client";

import RecipeForm from "./RecipeForm";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiagonalSection from "./components/DiagonalSection";
import SectionContainer from "./components/SectionContainer";
import ContentSection from "./components/ContentSection";
import Title from "./components/Title";
import styled from "styled-components";

const Footer = styled.footer`
  border-top: 3px solid black;
  margin-top: 4%;
  width: 60%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

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
        <Footer>
          &copy; 2025 Eric Nohara-LeClair | Contact: (636)-317-9533 | Source:
          <span>
            <a
              href="https://github.com/EricNohara/Recipe-GPT-Optimizer-App"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </span>
        </Footer>
      </ContentSection>
      <DiagonalSection $expand={expandDiagonal} />
    </SectionContainer>
  );
}

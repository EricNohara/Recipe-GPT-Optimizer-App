"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IRecipe from "../interfaces/IRecipe";
import RecipeCard from "./RecipeCard";
import DiagonalSection from "../components/DiagonalSection";
import styled from "styled-components";
import SectionContainer from "../components/SectionContainer";
import ContentSection from "../components/ContentSection";
import Title from "../components/Title";

const RecipeCardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
  padding: 2rem 6rem 2rem 2rem;
`;

const ReturnButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 999999999;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const dish = searchParams.get("dish");
  const maxLinks = searchParams.get("maxLinks");
  const sitename = searchParams.get("sitename");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [expandDiagonal, setExpandDiagonal] = useState(true);
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  // Entrance animation: shrink diagonal after mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpandDiagonal(false);
      setShowButton(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!dish) return;
    fetch(
      `/api/getRecipeData?dish=${dish}&maxLinks=${maxLinks}&sitename=${sitename}`
    )
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json.data);
      });
  }, [dish, maxLinks, sitename]);

  if (!dish) return <div>No dish specified.</div>;

  // Handle animated return
  const handleReturn = () => {
    setShowButton(false);
    setExpandDiagonal(true);
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  return (
    <SectionContainer style={{ height: "100%" }}>
      <DiagonalSection $expand={expandDiagonal} />
      {showButton && (
        <ReturnButton onClick={handleReturn}>← Return</ReturnButton>
      )}
      <ContentSection>
        <Title>{dish} Recipes</Title>
        <RecipeCardList>
          {recipes.map((recipe, idx) => (
            <RecipeCard key={idx} recipe={recipe} />
          ))}
        </RecipeCardList>
      </ContentSection>
    </SectionContainer>
  );
}

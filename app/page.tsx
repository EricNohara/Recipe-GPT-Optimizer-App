"use client";

import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import styled from "styled-components";
import IRecipe from "./interfaces/IRecipe";
import RecipeCard from "./components/RecipeCard";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Only set min-height for vertical centering */
`;

export default function Home() {
  const [recipeData, setRecipeData] = useState<IRecipe[]>([]);

  return (
    <SectionContainer>
      <RecipeForm onRecipesFetched={setRecipeData} />
      {recipeData.map((recipe, idx) => (
        <RecipeCard key={idx} recipe={recipe} />
      ))}
    </SectionContainer>
  );
}

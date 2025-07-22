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
import { CircularProgress } from "@mui/material";

const RecipeCardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
  padding: 2rem 5rem 2rem 5rem;
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

const PrintButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 2%;
`;

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dish = searchParams.get("dish");
  const maxLinks = searchParams.get("maxLinks");
  const sitename = searchParams.get("sitename");

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [expandDiagonal, setExpandDiagonal] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

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
  if (maxLinks && Number(maxLinks) <= 0) return <div>No recipes returned.</div>;

  // Handle animated return
  const handleReturn = () => {
    setShowButton(false);
    setExpandDiagonal(true);
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  const handleCheck = (idx: number, checked: boolean) => {
    setSelected((sel) => {
      const next = new Set(sel);
      if (checked) {
        next.add(idx);
      } else {
        next.delete(idx);
      }
      return next;
    });
  };

  const handleLogSelected = () => {
    const selectedRecipes = recipes.filter((_, idx) => selected.has(idx));
    console.log(selectedRecipes);
  };

  return (
    <SectionContainer style={{ height: "100%" }}>
      <DiagonalSection $expand={expandDiagonal} />
      {showButton && (
        <ReturnButton onClick={handleReturn}>← Return</ReturnButton>
      )}
      <ContentSection>
        <Title
          style={{ borderBottom: "4px solid black", paddingBottom: "1rem" }}
        >
          {dish} Recipes
        </Title>
        {recipes.length == 0 && (
          <CircularProgress
            size="4rem"
            color="inherit"
            sx={{ marginTop: "5%" }}
          />
        )}
        {recipes.length > 0 && (
          <PrintButton
            onClick={handleLogSelected}
            style={{ marginBottom: "1rem" }}
          >
            Print Selected
          </PrintButton>
        )}
        <div id="print-section">
          <RecipeCardList>
            {recipes.map((recipe, idx) => (
              <RecipeCard
                key={idx}
                recipe={recipe}
                checked={selected.has(idx)}
                onCheck={(checked) => handleCheck(idx, checked)}
              />
            ))}
          </RecipeCardList>
        </div>
      </ContentSection>
    </SectionContainer>
  );
}

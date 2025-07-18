"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IRecipe from "../interfaces/IRecipe";
import RecipeCard from "./RecipeCard";
import DiagonalSection from "../components/DiagonalSection";

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const dish = searchParams.get("dish");
  const maxLinks = searchParams.get("maxLinks");
  const sitename = searchParams.get("sitename");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [expandDiagonal, setExpandDiagonal] = useState(true);
  const router = useRouter();

  // Entrance animation: shrink diagonal after mount
  useEffect(() => {
    const timeout = setTimeout(() => setExpandDiagonal(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!dish) return;
    fetch(
      `/api/getRecipeData?dish=${dish}&maxLinks=${maxLinks}&sitename=${sitename}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.debug("Fetched recipes:", json.data); // Debug print
        setRecipes(json.data);
      });
  }, [dish, maxLinks, sitename]);

  if (!dish) return <div>No dish specified.</div>;

  // Handle animated return
  const handleReturn = () => {
    setExpandDiagonal(true);
    setTimeout(() => {
      router.push("/");
    }, 400); // Match the transition duration
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <DiagonalSection $expand={expandDiagonal} />
      <button
        onClick={handleReturn}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          zIndex: 10,
          padding: "0.75rem 1.5rem",
          background: "var(--first)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
      >
        ← Return
      </button>
      <h1>Recipes for {dish}</h1>
      {recipes.map((recipe, idx) => (
        <RecipeCard key={idx} recipe={recipe} />
      ))}
    </div>
  );
}

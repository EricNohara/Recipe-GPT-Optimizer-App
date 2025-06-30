import styled from "styled-components";
import IRecipe from "../interfaces/IRecipe";

interface RecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div>
      <p>{recipe.total_time}</p>
      <p>{recipe.rating}</p>
      <p>{recipe.servings}</p>
      <p>{recipe.ingredients.join(", ")}</p>
      <p>{recipe.directions.join(", ")}</p>
    </div>
  );
}

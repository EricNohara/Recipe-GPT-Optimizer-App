import styled from "styled-components";
import IRecipe from "../interfaces/IRecipe";

interface RecipeCardProps {
  recipe: IRecipe;
}

const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: grey;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
`;

const CardSubtitle = styled.h3`
  font-size: 1.75rem;
  text-align: center;
  font-style: italic;
`;

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <CardContainer>
      <CardTitle>
        {recipe.name}: {recipe.rating && `${recipe.rating} ⭐`}
      </CardTitle>
      <CardSubtitle>
        {recipe.total_time && `Prep Time: ${recipe.total_time}`}
        {"    |    "}
        {recipe.servings && `Servings: ${recipe.servings}`}
      </CardSubtitle>
      <p>{recipe.ingredients.join(", ")}</p>
      <p>{recipe.directions.join(", ")}</p>
    </CardContainer>
  );
}

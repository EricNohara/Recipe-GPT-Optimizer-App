import styled from "styled-components";
import IRecipe from "../interfaces/IRecipe";
import { titleFont } from "../style/localFonts";
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface RecipeCardProps {
  recipe: IRecipe;
}

const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: var(--first);
  gap: 0.5rem;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
`;

const CardSubtitle = styled.h3`
  font-size: 1.2rem;
  text-align: center;
  font-style: italic;
`;

const IngredientsAndDirectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 37.5% 57.5%;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  gap: 5%;
`

const RecipeCardList = styled.ol`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &>li::marker {
    font-weight: bold;
  }
`

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <CardContainer>
      <CardTitle className={titleFont.className}>
        {recipe.name}
      </CardTitle>
      {recipe.rating && <Rating name="rating" value={Number(recipe.rating)} readOnly precision={0.1} emptyIcon={<StarIcon fontSize="inherit" />} />}
      {recipe.total_time && <CardSubtitle>{`${recipe.total_time}`}</CardSubtitle>}
      {recipe.servings && <CardSubtitle>{`${recipe.servings} Servings`}</CardSubtitle>}
      <IngredientsAndDirectionsContainer>
        <RecipeCardList style={{ listStyle: "square" }}>
          {recipe.ingredients.map((ingredient, i) =>
            <li key={i}>{ingredient}</li>
          )}
        </RecipeCardList>
        <RecipeCardList>
          {recipe.directions.map((direction, i) =>
            <li key={i}>{direction}</li>
          )}
        </RecipeCardList>
      </IngredientsAndDirectionsContainer>
    </CardContainer>
  );
}

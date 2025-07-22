import styled from "styled-components";
import IRecipe from "../interfaces/IRecipe";
import { recipeTitleFont } from "../style/localFonts";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import React from "react";

interface RecipeCardProps {
  recipe: IRecipe;
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

const CardContainer = styled.li<{ $checked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  background-color: ${({ $checked }) =>
    $checked ? "var(--first-light)" : "var(--first)"};
  gap: 0.5rem;
  cursor: pointer;
  border: 4px solid ${({ $checked }) => ($checked ? "black" : "transparent")};
  position: relative;
  width: 100%;
`;

const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 2rem;
  height: 2rem;
  accent-color: black;
  cursor: pointer;
`;

const CustomLabel = styled.label`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
`;

const CardSubtitle = styled.h3`
  font-size: 1.2rem;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2%;
  width: 100%;
`;

const IngredientsAndDirectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 37.5% 57.5%;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  gap: 5%;
`;

const RecipeCardList = styled.ol`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > li::marker {
    font-weight: bold;
  }
`;

function RecipeCard({ recipe, checked, onCheck }: RecipeCardProps) {
  const handleCardClick = () => onCheck(!checked);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CardContainer $checked={checked} onClick={handleCardClick}>
      <CustomLabel style={{ alignSelf: "flex-end" }}>
        <CustomCheckbox
          checked={checked}
          onClick={handleCheckboxClick}
          onChange={(e) => onCheck(e.target.checked)}
        />
      </CustomLabel>
      <CardTitle className={recipeTitleFont.className}>{recipe.name}</CardTitle>
      {recipe.rating && (
        <Rating
          name="rating"
          value={Number(recipe.rating)}
          readOnly
          precision={0.1}
          emptyIcon={<StarIcon fontSize="inherit" />}
        />
      )}
      {recipe.total_time && (
        <CardSubtitle>
          <AccessTimeIcon />
          {recipe.total_time}
        </CardSubtitle>
      )}
      {recipe.servings && (
        <CardSubtitle>
          <RestaurantIcon />
          {`${recipe.servings} Servings`}
        </CardSubtitle>
      )}
      <IngredientsAndDirectionsContainer>
        <RecipeCardList style={{ listStyle: "square" }}>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </RecipeCardList>
        <RecipeCardList>
          {recipe.directions.map((direction, i) => (
            <li key={i}>{direction}</li>
          ))}
        </RecipeCardList>
      </IngredientsAndDirectionsContainer>
    </CardContainer>
  );
}

export default React.memo(RecipeCard);

"use client";

import styled from "styled-components";
import React from "react";
import IRecipe from "../interfaces/IRecipe";

const DishInputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: grey;
  gap: 1rem;
  padding: 1rem;
  width: 80%;
  border-radius: 10px;
`;

const DishInputLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DishTextInput = styled.input`
  padding: 1rem;
  width: 80%;
`;

const DishInputButton = styled.button`
  padding: 1rem;
  border-radius: 10px;
  background-color: black;
  color: white;
`;

interface RecipeFormProps {
  onRecipesFetched: (recipes: IRecipe[]) => void;
}

export default function RecipeForm({ onRecipesFetched }: RecipeFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dishRaw = formData.get("dish");
    const dish = typeof dishRaw === "string" ? dishRaw.trim() : "";
    const maxLinks = formData.get("max-links");

    if (dish == "") return;

    const res = await fetch(
      `/api/getRecipeData?dish=${dish}&maxLinks=${maxLinks}`
    );

    const json = await res.json();

    onRecipesFetched(json.data);
  };

  return (
    <DishInputForm onSubmit={handleSubmit}>
      <DishInputLabel>Dish Name:</DishInputLabel>
      <DishTextInput type="text" name="dish" required />
      <DishTextInput type="number" name="max-links" />
      <DishInputButton type="submit">Submit</DishInputButton>
    </DishInputForm>
  );
}

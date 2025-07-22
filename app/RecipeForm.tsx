"use client";

import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const DishInputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 90%;
  margin-top: 5%;
`;

const DishTextInput = styled.input`
  padding: 1rem;
  width: 80%;
  font-size: 1.1rem;
  border: 2px solid var(--first);
`;

const DishInputButton = styled.button`
  padding: 1rem;
  font-size: 1.1rem;
  background-color: black;
  color: white;
  width: 80%;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 80%;
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  background: white;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 1.1rem;
  border: 2px solid var(--first);
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const DropdownListItem = styled.li`
  padding: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:hover {
    background: var(--first);
    color: white;
  }
`;

const options = [
  { value: "all-recipes", label: "allrecipes.com" },
  { value: "simply-recipes", label: "simplyrecipes.com" },
  { value: "serious-eats", label: "seriouseats.com" },
];

function cleanInput(str: string) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RecipeForm({
  onAnimatedSubmit,
}: {
  onAnimatedSubmit: (url: string) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleDropdownClick = () => setDropdownOpen((open) => !open);

  const handleOptionClick = (option: (typeof options)[0]) => {
    setSelected(option);
    setDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dishRaw = formData.get("dish");
    const dish = typeof dishRaw === "string" ? cleanInput(dishRaw) : "";
    const maxLinksRaw = formData.get("max-links");
    const maxLinks = maxLinksRaw ? maxLinksRaw : "20";
    const sitename = selected.value;

    if (dish == "") return;

    const url = `/recipes?dish=${encodeURIComponent(
      dish
    )}&maxLinks=${maxLinks}&sitename=${encodeURIComponent(sitename)}`;
    onAnimatedSubmit(url);
  };

  return (
    <DishInputForm onSubmit={handleSubmit}>
      <DishTextInput type="text" name="dish" placeholder="Dish Name" required />
      <DishTextInput type="number" name="max-links" placeholder="Max Recipes" />
      <DropdownContainer ref={dropdownRef}>
        <DropdownHeader onClick={handleDropdownClick}>
          {selected.label}
        </DropdownHeader>
        {dropdownOpen && (
          <DropdownList>
            {options.map((option) => (
              <DropdownListItem
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
      <DishInputButton type="submit">Submit</DishInputButton>
    </DishInputForm>
  );
}

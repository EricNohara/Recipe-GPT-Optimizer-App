export default interface IRecipe {
  name: string | null;
  total_time: string | null;
  servings: string | null;
  rating: string | null;
  ingredients: string[];
  directions: string[];
}

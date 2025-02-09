
export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
}

export interface DetailedRecipe extends Recipe {
  instructions: string;
  extendedIngredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  original: string;
  amount: number;
  unit: string;
  name: string;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

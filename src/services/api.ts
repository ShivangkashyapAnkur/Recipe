
import { Recipe, DetailedRecipe, RecipeSearchResponse } from "@/types/recipe";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "";
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (query: string = "", offset: number = 0): Promise<RecipeSearchResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&offset=${offset}&number=12&addRecipeInformation=true`
    );
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id: number): Promise<DetailedRecipe> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch recipe details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};

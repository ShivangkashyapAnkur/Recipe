
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/services/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const recipeId = parseInt(id || "0");

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
  });

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load recipe"
        message="Please try again later"
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!recipe) {
    return <ErrorMessage title="Recipe not found" message="Please try another recipe" />;
  }

  return (
    <div className="min-h-screen animate-fade-in p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{recipe.title}</h1>
        </div>

        <Card className="overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-[400px] w-full object-cover"
          />
          
          <div className="p-6">
            <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>
              <ul className="list-inside list-disc space-y-2">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-muted-foreground">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
              <div
                className="prose prose-gray max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetails;

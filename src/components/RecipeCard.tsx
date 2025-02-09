
import { Recipe } from "@/types/recipe";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <Card className="recipe-card group">
        <div className="aspect-video overflow-hidden rounded-md">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {recipe.title}
          </h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{recipe.readyInMinutes} mins</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

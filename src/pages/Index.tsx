
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchRecipes } from "@/services/api";
import { RecipeCard } from "@/components/RecipeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: () => searchRecipes(searchQuery),
  });

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load recipes"
        message="Please try again later"
      />
    );
  }

  return (
    <div className="min-h-screen animate-fade-in p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Discover Delicious Recipes
          </h1>
          <p className="text-lg text-muted-foreground">
            Find your next culinary inspiration
          </p>
        </div>

        <div className="relative mx-auto mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search recipes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="recipe-grid">
            {data?.results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

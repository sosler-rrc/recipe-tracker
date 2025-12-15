import type { CreateUpdateRecipe } from "@/types/CreateUpdateRecipe";
import type { Recipe } from "../types/Recipe";
import type { RecipeType } from "../types/RecipeType";
import { v4 as uuidv4 } from "uuid";

export function getRecipesTypes() {
  return recipeTypeData;
}
export function getRecipes() {
  return [...recipeData];
}

export function getRecipeById(recipeId: string): Recipe {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  }

  return foundRecipe;
}

export async function createRecipe(recipe: CreateUpdateRecipe) {
  const data = {
    ...recipe,
    id: uuidv4(),
    updatedAt: new Date(),
    createdAt: new Date(),
    recipeSaved: true,
  };
  recipeData.push(data);
  return data;
}

export async function updateRecipe(recipe: CreateUpdateRecipe) {
  const foundRecipeIndex = recipeData.findIndex((t) => t.id === recipe.id);

  if (foundRecipeIndex === -1) {
    throw new Error(`Failed to update recipe with ${recipe.id}`);
  }

  recipeData[foundRecipeIndex] = {
    ...recipe,
    id: recipe.id ?? uuidv4(),
    updatedAt: new Date(),
    createdAt: new Date(),
    recipeSaved: false,
  };
  return recipeData[foundRecipeIndex];
}

export async function deleteRecipe(recipeId: string) {
  const foundRecipeIndex = recipeData.findIndex((t) => t.id === recipeId);

  if (foundRecipeIndex === -1) {
    throw new Error(`Failed to find recipe with ${recipeId}`);
  }

  return recipeData.splice(foundRecipeIndex, 1);
}

export async function updateSavedRecipe(recipeId: string) {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  } else {
    foundRecipe.recipeSaved = !foundRecipe.recipeSaved;
  }

  return foundRecipe;
}

export const RecipeTypes = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  DESSERT: "Dessert",
  APPETIZER: "Appetizer",
  SNACK: "Snack",
  BEVERAGE: "Beverage",
  SALAD: "Salad",
  SOUP: "Soup",
  SIDE_DISH: "Side Dish",
} as const;

export const recipeTypeData: RecipeType[] = Object.values(RecipeTypes).map((rt) => ({
  id: rt,
  name: rt,
  description: rt,
}));

const T = RecipeTypes;

export const recipeData: Recipe[] = [
  {
    id: uuidv4(),
    name: "Chocolate Chip Cookies",
    description: "The ultimate soft and chewy chocolate chip cookies.",
    recipeTypeId: T.DESSERT,
    ingredients: [
      "2¼ cups all-purpose flour",
      "1 cup softened butter",
      "¾ cup brown sugar",
      "¾ cup white sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "1 tsp baking soda",
      "1 tsp salt",
      "2 cups chocolate chips",
    ],
    steps: [
      "Preheat oven to 375°F (190°C).",
      "In a bowl, cream together butter and sugars.",
      "Add eggs and vanilla; mix until smooth.",
      "In another bowl, whisk flour, baking soda, and salt.",
      "Combine dry and wet ingredients; fold in chocolate chips.",
      "Drop spoonfuls onto a baking sheet.",
      "Bake for 8–10 minutes or until golden.",
    ],
    servings: 36,
    prepTime: 15,
    cookTime: 10,
    ovenTemp: 375,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Chicken Caesar Salad",
    description: "Restaurant-quality Caesar salad with juicy chicken.",
    recipeTypeId: T.LUNCH,
    ingredients: ["2 chicken breasts", "1 head romaine lettuce", "½ cup Caesar dressing", "¼ cup grated Parmesan", "1 cup croutons", "Salt and pepper"],
    steps: [
      "Season chicken with salt and pepper; grill 6–7 minutes per side.",
      "Chop romaine and place in large bowl.",
      "Slice chicken and add to salad.",
      "Top with croutons and Parmesan.",
      "Toss with Caesar dressing and serve.",
    ],
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Pancakes",
    description: "Light, fluffy buttermilk pancakes.",
    recipeTypeId: T.BREAKFAST,
    ingredients: ["1½ cups all-purpose flour", "3½ tsp baking powder", "1 tbsp sugar", "1 tsp salt", "1¼ cups milk", "1 egg", "3 tbsp melted butter"],
    steps: [
      "Mix flour, baking powder, sugar, and salt.",
      "Add milk, egg, and melted butter; whisk until smooth.",
      "Heat a greased pan over medium heat.",
      "Pour ¼ cup batter for each pancake.",
      "Cook until bubbles form, then flip.",
    ],
    servings: 4,
    prepTime: 5,
    cookTime: 15,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Spaghetti Bolognese",
    description: "Rich, slow-simmered Italian meat sauce.",
    recipeTypeId: T.DINNER,
    ingredients: [
      "1 lb ground beef",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 carrot, diced",
      "1 can crushed tomatoes",
      "2 tbsp tomato paste",
      "1 tsp salt",
      "½ tsp pepper",
      "1 tsp Italian seasoning",
      "Spaghetti noodles",
    ],
    steps: [
      "Brown beef in a large pot.",
      "Add onion, garlic, and carrot; sauté until soft.",
      "Stir in tomato paste and cook 1 minute.",
      "Pour in crushed tomatoes and seasonings.",
      "Simmer 30–45 minutes.",
      "Cook spaghetti according to package instructions.",
      "Serve sauce over pasta.",
    ],
    servings: 6,
    prepTime: 15,
    cookTime: 45,
    recipeSaved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Green Smoothie",
    description: "Nutrient-packed, refreshing smoothie.",
    recipeTypeId: T.BEVERAGE,
    ingredients: ["1 cup spinach", "1 banana", "½ cup pineapple", "1 cup almond milk", "1 tbsp honey"],
    steps: ["Add all ingredients to blender.", "Blend until smooth.", "Serve cold."],
    servings: 2,
    prepTime: 5,
    cookTime: 0,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Classic Beef Chili",
    description: "Perfectly spiced chili with tender beans.",
    recipeTypeId: T.DINNER,
    ingredients: [
      "1 lb ground beef",
      "1 onion, chopped",
      "1 green pepper, chopped",
      "2 cloves garlic, minced",
      "1 can diced tomatoes",
      "1 can kidney beans",
      "2 tbsp chili powder",
      "1 tsp cumin",
      "Salt and pepper",
    ],
    steps: ["Brown beef in a pot.", "Add onion, pepper, and garlic; sauté.", "Stir in tomatoes, beans, and seasonings.", "Simmer 45 minutes."],
    servings: 8,
    prepTime: 20,
    cookTime: 60,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Banana Bread",
    description: "Moist and sweet homemade banana bread.",
    recipeTypeId: T.DESSERT,
    ingredients: ["3 ripe bananas", "1½ cups flour", "1 tsp baking soda", "½ cup melted butter", "½ cup sugar", "2 eggs", "1 tsp vanilla", "Pinch of salt"],
    steps: [
      "Preheat oven to 350°F (175°C).",
      "Mash bananas in a bowl.",
      "Mix in melted butter and sugar.",
      "Add eggs and vanilla.",
      "Add flour, baking soda, and salt.",
      "Pour into greased loaf pan.",
      "Bake 55–60 minutes.",
    ],
    servings: 10,
    prepTime: 15,
    cookTime: 60,
    ovenTemp: 350,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Greek Salad",
    description: "Fresh Mediterranean classic.",
    recipeTypeId: T.SALAD,
    ingredients: [
      "2 tomatoes, chopped",
      "1 cucumber, diced",
      "1 red onion, sliced",
      "½ cup olives",
      "½ cup feta cheese",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper",
    ],
    steps: ["Combine vegetables in a bowl.", "Add olives and feta.", "Whisk oil, lemon juice, salt, and pepper.", "Pour dressing over salad and toss."],
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "French Toast",
    description: "Custardy, golden classic breakfast.",
    recipeTypeId: T.BREAKFAST,
    ingredients: ["4 slices thick bread", "2 eggs", "½ cup milk", "1 tsp vanilla", "1 tsp cinnamon", "Butter for frying"],
    steps: ["Whisk eggs, milk, vanilla, and cinnamon.", "Dip bread slices into mixture.", "Cook on buttered pan until golden."],
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Chicken Stir Fry",
    description: "Healthy, colorful weeknight dinner.",
    recipeTypeId: T.DINNER,
    ingredients: [
      "1 lb chicken breast, sliced",
      "1 bell pepper, sliced",
      "1 broccoli crown",
      "2 tbsp soy sauce",
      "1 tbsp honey",
      "1 tbsp oil",
      "1 clove garlic",
    ],
    steps: ["Heat oil in a pan.", "Cook chicken until browned.", "Add vegetables and sauté.", "Stir in soy sauce, honey, and garlic.", "Cook 5 more minutes."],
    servings: 4,
    prepTime: 15,
    cookTime: 12,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Chocolate Brownies",
    description: "Fudgy, rich brownies.",
    recipeTypeId: T.DESSERT,
    ingredients: ["1 cup melted butter", "2 cups sugar", "4 eggs", "1 cup flour", "1 cup cocoa powder", "1 tsp vanilla", "½ tsp salt"],
    steps: [
      "Preheat oven to 350°F (175°C).",
      "Mix butter and sugar.",
      "Add eggs and vanilla.",
      "Mix in flour, cocoa, and salt.",
      "Pour into pan and bake 30 minutes.",
    ],
    servings: 16,
    prepTime: 15,
    cookTime: 30,
    recipeSaved: false,
    ovenTemp: 350,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Caprese Salad",
    description: "Simple tomatoes, basil, and mozzarella.",
    recipeTypeId: T.SALAD,
    ingredients: ["3 tomatoes, sliced", "1 ball fresh mozzarella", "Fresh basil leaves", "2 tbsp olive oil", "1 tbsp balsamic glaze", "Salt and pepper"],
    steps: ["Layer tomatoes and mozzarella.", "Add basil.", "Drizzle with oil and balsamic.", "Season with salt and pepper."],
    servings: 4,
    prepTime: 20,
    cookTime: 0,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Chicken Noodle Soup",
    description: "Comforting classic soup.",
    recipeTypeId: T.SOUP,
    ingredients: [
      "2 chicken breasts",
      "2 carrots, sliced",
      "2 celery stalks, sliced",
      "1 onion, diced",
      "6 cups chicken broth",
      "2 cups egg noodles",
      "Salt and pepper",
    ],
    steps: [
      "Bring broth to a boil.",
      "Add chicken and vegetables.",
      "Simmer 45 minutes.",
      "Remove chicken, shred, and return.",
      "Add noodles and cook 8 minutes.",
    ],
    servings: 8,
    prepTime: 20,
    cookTime: 90,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Garlic Bread",
    description: "Crispy, buttery side dish.",
    recipeTypeId: T.SIDE_DISH,
    ingredients: ["1 loaf French bread", "½ cup softened butter", "3 cloves garlic, minced", "2 tbsp parsley", "Salt"],
    steps: ["Preheat oven to 425°F (218°C).", "Mix butter, garlic, parsley, and salt.", "Spread on sliced bread.", "Bake 10–12 minutes."],
    servings: 8,
    prepTime: 10,
    cookTime: 12,
    recipeSaved: false,
    ovenTemp: 425,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Beef Tacos",
    description: "Authentic seasoned beef tacos.",
    recipeTypeId: T.DINNER,
    ingredients: ["1 lb ground beef", "1 taco seasoning packet", "8 taco shells", "1 cup shredded cheese", "Lettuce", "Tomatoes"],
    steps: ["Cook ground beef and drain fat.", "Add seasoning and ¼ cup water.", "Simmer 5 minutes.", "Assemble tacos with toppings."],
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    recipeSaved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Apple Pie",
    description: "Classic American dessert.",
    recipeTypeId: T.DESSERT,
    ingredients: ["2 pie crusts", "6 apples, sliced", "½ cup sugar", "1 tsp cinnamon", "2 tbsp flour"],
    steps: [
      "Preheat oven to 425°F (218°C).",
      "Mix apples with sugar, flour, and cinnamon.",
      "Fill pie crust and top with second crust.",
      "Bake 50–55 minutes.",
    ],
    servings: 8,
    prepTime: 30,
    cookTime: 55,
    recipeSaved: false,
    ovenTemp: 425,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: uuidv4(),
    name: "Vegetable Soup",
    description: "Hearty and nutrient-rich.",
    recipeTypeId: T.SOUP,
    ingredients: [
      "1 onion, chopped",
      "2 carrots, sliced",
      "2 potatoes, cubed",
      "1 zucchini, chopped",
      "1 can diced tomatoes",
      "6 cups vegetable broth",
      "Salt and pepper",
    ],
    steps: ["Combine all ingredients in a pot.", "Bring to a boil.", "Simmer 40–45 minutes."],
    servings: 8,
    prepTime: 20,
    cookTime: 45,
    recipeSaved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

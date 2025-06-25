'use client'
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

const Page = () => {
  const params = useParams()
  const { id } = params 

    const { data , isLoading , error , isError} = useQuery({
      queryKey: ['recipes' , id ],
      queryFn: async () => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok' , error );
        }
        const data = await res.json();
        return data;
      }
    });

    const meal = data?.meals[0] 

   if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
      </div>
    );
  }

  return (
    <>
        <div className="max-w-7xl mx-auto px-4 py-4 ">
            <h1 className="text-2xl font-bold text-center py-2">{meal?.strMeal}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 shadow rounded-md '>
              <div className="relative w-full h-64 ">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  className="object-cover rounded-t-md sm:rounded-tr-none"
                />
              </div>
              <div className=' sm:row-span-3 px-4 py-2'>
                <h2 className="text-xl font-semibold mb-2">Category: {meal.strCategory}</h2>
                <h3 className="text-lg font-medium mb-4">Area: {meal.strArea}</h3>
                <p>{meal.strInstructions}</p>
              </div>
              <div className=' sm:row-span-2 px-4 py-2'>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                  const ingredient = meal[`strIngredient${index}`];
                  const measure = meal[`strMeasure${index}`];
                  return ingredient && ingredient.trim() !== '' ? (
                    <li key={index}>{measure} {ingredient}</li>
                  ) : null;
                })}
              </div> 
            </div>
        </div>
    </>
  )
}

export default Page
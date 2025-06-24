'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "./filter";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Body = () => {
  const router = useRouter()
  const [category, setCategory] = useState('Seafood');
  const [query, setQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recipes', category],
    queryFn: async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  });

  const inputChange = (e) => {
    setQuery(e.target.value)
    console.log('query value' , query , query.length)

  }

  const handleSearch = (e) => {
    e.preventDefault();
    // setSearchTerm(query);
    setQuery('')
  };
  const filteredMeals = query.length > 0
    ? data?.meals?.filter(meal => meal.strMeal.toLowerCase().includes(query.toLowerCase()))
    : data?.meals;

    return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6">
        <section className="w-full sm:w-auto">
          <Filter category={category} setCategory={setCategory} />    
        </section>
        <section className="w-full sm:w-72">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={inputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 placeholder-gray-400"
            />
            {query.length > 0 && (
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </form>
        </section>
      </div>
      
      {/* Recipe Grid */}
      <section className="pb-10">
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
            <p className="mt-2 text-lg">Loading recipes...</p>
          </div>
        )}
        
        {isError && (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">Failed to load recipes</p>
            <button 
              onClick={() => refetch()} 
              className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredMeals && filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <div 
                key={meal.idMeal} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    className=" transition-transform duration-500 hover:scale-110"
                  />
                </div>
        
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{meal.strMeal}</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{meal.strCategory}</span>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors" onClick={ () => router.push(`/${meal.idMeal}`)} >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : query ? (
            <div className="col-span-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-medium mt-4">No recipes found</h2>
              <p className="text-gray-600 mt-2">Try a different search term</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
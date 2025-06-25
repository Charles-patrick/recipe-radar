'use client'
import { useQuery } from "@tanstack/react-query";
export const Filter = ({category , setCategory}) => {
    
  const { data, refetch } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    }
  });

  return (
    <>
      <div>
        <section> 
            <div className="flex items-center gap-2 mb-4">
              <label htmlFor="category" className="font-medium">Category:</label>
              <select
                id="category"
                value={category}
                onChange={e => { refetch();  setCategory(e.target.value) }}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {data?.categories?.map((cat) => (
                  <option key={cat.idCategory} value={cat.strCategory}>
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
        </section>
      </div>
    </>
  );
}
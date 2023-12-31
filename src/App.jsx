import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  // const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching data...");
        }
        const data = await res.json();
        //console.log(data);
        if (!data.meals) {
          throw new Error("Meal not found");
        }
        setResults(data.meals);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (query.trim().length < 3) {
      setResults([]);
      setError("");
      return;
    }
    fetchData();
  }, [query]);

  return (
    <>
      <div className="  ">
        <nav className="fixed bg-gray-400 w-full z-20">
          <div className="container m-auto p-2 flex items-center justify-between gap-x-4">
            <a href="#" className="flex-col px-2 items-center justify-center ">
              <img
                src="./64cb73bddae4f2e5a04b6f9b_delivery-img.png"
                alt="logo"
                className=""
              />
              <span className="text-xl font-bold">DishDazzle</span>
            </a>
            <input
              type="text"
              value={query}
              className="border p-2 w-2/6"
              placeholder="Search any food items...eg(chocolate,sushi..."
              onChange={(e) => {
                const trimmedValue = e.target.value.trim();
                setQuery(trimmedValue);
                if (trimmedValue.length === 0) {
                  setResults([]);
                }
              }}
            />
            <div>
              <NumResults results={results} />
            </div>
          </div>
        </nav>
        <div className="bg-[#15616D] ">
          <div className=" container m-auto py-4">
            {!query ? (
              <>
                <div className="h-screen flex items-center justify-center">
                  <p className=" text-5xl text-gray-300 text-center mx-4 md:mx-20">
                    Hungry? 🍽️ Type in a dish or ingredient you're craving and
                    let our search find the perfect recipe for you!
                  </p>
                </div>
              </>
            ) : loading ? (
              <Loader />
            ) : results.length > 0 ? (
              <>
                <div className="h-max ">
                  {results.map((result) => (
                    <div
                      className="grid lg:grid-cols-2 gap-6 items-center justify-center py-16 lg:my-24 p-8"
                      key={result.idMeal}
                    >
                      <div className="lg:order-first">
                        <h2 className=" text-4xl md:text-7xl text-shadow-lg text-white font-bold">
                          {result.strMeal}
                        </h2>
                        <h2 className="text-xl text-gray-200 py-1">
                          <strong>Category:</strong>
                          {result.strCategory}
                        </h2>
                        <h2 className="text-xl text-gray-200 py-1">
                          <strong>Culinary Origin:</strong>
                          {result.strArea}
                        </h2>
                        <span className="text-xl text-gray-200 py-1">
                          <strong>Tags:</strong>
                          {result.strTags ? `${result.strTags}` : `Unknown`}
                        </span>
                        {/* <p className="">{result.strIngredient1}</p>*/}
                        <p className="text-gray-300 py-2 ">
                          <strong>Instructions:</strong>
                          {result.strInstructions}
                        </p>
                      </div>
                      <div className="order-first flex justify-center p-12 md:p-20">
                        <img
                          src={result.strMealThumb}
                          alt="meal-image"
                          className="  rounded-full shadow-2xl contrast-100  h-max "
                        />
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <Footer />
              </>
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="">
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <div className="bg-[#15616D] h-screen ">
        <div className="container m-auto flex justify-center items-center">
          <p className="">Food not found!</p>
        </div>
      </div>
    </>
  );
}

function NumResults({ results }) {
  const [nums, setNum] = useState(0);
  useEffect(() => {
    setNum(results ? results.length : 0);
  }, [results]);
  return (
    <p className="md:text-xl text-gray-900">
      Found <strong>{nums}</strong> results
    </p>
  );
}

function Footer() {
  return (
    <>
      <div className="container m-auto">
        <p className=" text-gray-300 text-center">
          &copy; Naresh Rajbanshi 2023. All rights reserved.{" "}
        </p>
      </div>
    </>
  );
}

export default App;

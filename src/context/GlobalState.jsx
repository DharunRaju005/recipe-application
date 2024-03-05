import React, { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`);

      const data = await response.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearch("");
        navigate("/");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index);
    }

    setFavoritesList(cpyFavoritesList);
  }

  if (loading) {
    return <h1>Please Wait!!!</h1>;
  }
  console.log(recipeList);
  return <GlobalContext.Provider value={{ search, setSearch, handleSubmit, recipeList, loading, recipeDetails, setRecipeDetails, handleAddToFavorite, favoritesList }}>{children}</GlobalContext.Provider>;
};

export default GlobalState;

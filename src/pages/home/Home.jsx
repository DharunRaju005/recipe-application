import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
import RecipeList from "../../components/recipe-item/RecipeItem"


const Home = () => {
  const {recipeList}=useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
    {
      recipeList && recipeList.length>0 ? recipeList.map((item)=> <RecipeList item={item} />):<div>
        <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Not Found!!!</p>
      </div>
    }
    </div>
  )
}

export default Home
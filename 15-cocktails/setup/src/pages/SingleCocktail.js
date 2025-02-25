import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)

  const getCocktail = useCallback( async () =>{
    try {
      const response = await fetch(url+id)
      const data = await response.json()
      if(data && data.drinks){
        const {strDrink:name, strDrinkThumb:image,
          strAlcoholic:info, strCategory:category,
          strGlass:glass, strInstructions:instructions,
          strIngredient1:ingredient1,strIngredient2:ingredient2,
          strIngredient3:ingredient3,strIngredient4:ingredient4,
          strIngredient5:ingredient5,
        } = data.drinks[0]
        const ingredients = [ingredient1,ingredient2,ingredient3,ingredient4,ingredient5]
        const newCocktail = {
          name,image,info,category,glass,instructions,ingredients
        }
        setCocktail(newCocktail)
      }
      else{
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  },[id])
  
  useEffect(()=>{
    setLoading(true)
    getCocktail()
    console.log();
  },[id,getCocktail])
  
  if(loading){
    return <Loading/>
  }
  if(!cocktail){
    return <h2>no cocktail to display</h2>
  }
  const {name,image,category,info,glass,instructions,ingredients} = cocktail
  return (
    <section className='section cocktail-section'>
      <Link to={'/'} className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.map((item,index) =>{
              return item? <span key={index}>{item}</span>: null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail

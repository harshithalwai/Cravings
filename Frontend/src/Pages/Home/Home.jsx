import React from 'react'
import "./Home.css"
import Header from '../../Component/Header/Header'
import ExploreMenu from '../../Component/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../Component/FoodDisplay/FoodDisplay'
const Home = () => {
  const [category, setCategory] = useState("all")
  return (
  <>
  <Header/>
  <ExploreMenu category={category} setCategory={setCategory}/>
  <FoodDisplay category={category} setCategory={setCategory}/>
  </>
  )
}

export default Home

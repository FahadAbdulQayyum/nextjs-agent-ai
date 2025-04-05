"use client"
import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetch('/api/fahad')
      const res = await data.json()
      console.log('...res...', res)
    }
    fetchData()
  }, [])
  
  return (
    <div className="flex flex-col md:flex-row bg-background py-5 px-4 sm:px-standardPadding space-y-3 sm:space-y-3 md:space-x-4">
      <p>Home Page Here...</p>
    </div>
  );
};

export default Home;

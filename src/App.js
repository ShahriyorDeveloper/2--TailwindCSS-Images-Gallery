import React, { useState, useEffect } from "react";
import ImagesCard from "./Components/imagesCards";
import ImagesSearch from "./Components/imagesSearch";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container max-auto">
    <ImagesSearch searchText={(text) => setTerm(text)}/>


    {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>}


      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>  : <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImagesCard key={image.id} image={image} />
          ))}
        </div>}
      {/* 
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <ImagesCard key={image.id} image={image} />
        ))}
      </div>
     */}
    </div>
  );
}

export default App;

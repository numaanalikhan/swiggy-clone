import React, { useState, useEffect } from "react";
import ShimmerEffect from './Components/ShimmerEffect';
import axios from "axios";

function Home({ cordinates, setCoordinates ,popularRest, setPopularRest}) {

  useEffect(() => {
    // if (cordinates?.lat && cordinates?.lng) {
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${cordinates.lat}&lng=${cordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        )
        .then((res) => {
          setPopularRest(
            res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
          );
        })
        .catch((err) => console.error(err));
    // }
  }, [cordinates]);

  return (
    <>
      <div className="text-center mt-3">
        <h1 className="text-2xl font text-center">
          Top Trending Restaurants in Hyderabad
        </h1>
        <input type="text" placeholder="Search for Popular Restaurants..." />
      </div>

      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          { popularRest.length === 0 ? <ShimmerEffect /> : ""}
          {
            popularRest.map((item) => (
              <div className="col" key={item.info.id}>
                <div className="card h-100">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                    className="card-img-top w-auto h-[150px]"
                    alt={item.info.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.info.name}</h5>
                    <p>
                      {item.info.avgRating >= 4.5 ? (
                        <i className="fa-solid fa-star text-green-400"></i>
                      ) : (
                        <i className="fa-solid fa-star text-yellow-400"></i>
                      )}{" "}
                      {item.info.avgRating}
                    </p>
                    <span>{item.info.locality}, {item.info.areaName}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;

import axios from "axios";
import React,{useState,useEffect} from "react";
function Location({setLocationName,locationName,searchLocation,setSearchLocation,cordinates,setCordinates,popularRest,setPopularRest}){

    const getCordinates =(place_id)=>{
    setPopularRest([])
    console.log(place_id);
    axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`)
    .then((res)=>{
        setCordinates(res.data.data[0].geometry.location);
        console.log(cordinates)
    })
    setSearchLocation("")
    
}
 useEffect(()=>{
    axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchLocation}&types=`)
    .then((res)=>{
        if(res?.data?.data){
            setLocationName(res?.data?.data)
        }
        // console.log(locationName)
    })
},[searchLocation])
    return(
        <>
        <input
        //controlled component
        onChange={(e)=>{
            // console.log("onchange metod is called")
            setSearchLocation(e.target.value)
            // console.log(searchLocation)
        }}
        value={searchLocation}
        className="w-[280px] placeholder:p-[20px]"
        placeholder="Search for area,street name..."
        type="text"
        />
        <ol>
        {
            searchLocation !== "" ?locationName.map((item,idx)=>{
                return(
                    <>
                    <li 
                    className="pointer-cursor"
                    onClick={
                        ()=>{ getCordinates(item.place_id)}
                    } 
                    >{item.description}</li>
                   
                    </>
                )
            }) :""
        }
        </ol>
        </>
    )
}
export default Location;
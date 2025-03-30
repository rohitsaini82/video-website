"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from 'react-player ' ;
import { Video_Uri } from "@/app/layout";
const Watch =  () => {
    const { slug } = useParams() || {}; // Ensure it doesn't crash

    const new_query = slug ? decodeURIComponent(slug) : ""; // Handle undefined
    console.log("Query:", slug, "Decoded:", new_query);
    const [videos, setVideos] = useState([]);    
    const [video_source, setVideo_source ] = useState("");
    useEffect(() => {
        const fetchVideos = async () => {
            if (!slug) return;
            try {
                const uri = `/api/proxy?query=${encodeURIComponent(new_query)}`;
                console.log("Fetching from:", uri);
                const response = await fetch(uri, { cache: "no-store" });
                const data = await response.json();
                setVideos(data);
                let temp = Video_Uri + data[0].video;
                setVideo_source(temp);
                // console.log(data[0]);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [slug]); // Re-fetch when the query changes

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center">
                <div className="flex bg-white border-2 border-pink-500 shadow-lg rounded-lg overflow-hidden p-2">
                    <p className="text-red-500 font-bold">Watch HD:</p>
                    <span className="ml-2 text-gray-700">{new_query}</span>
                </div>
            </div>
            <br />
            <hr />
            <div>
                
                        <ul>
                            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                                {
                                    videos.length>0?
                                    <div className="flex">
                                    

 <ReactPlayer src={video_source} url= controls={true} />





                                        <li className="mt-2 p-2 border-b">
                                            <img src={videos[0].image} alt={videos[0].title} />
                                            <p>{videos[0].title}</p>
                                            <p>{videos[0].duration}</p>
                                        </li>
                                    </div>
                                    :
                                    <div>
                                        <p className="text-gray-500">No Video found.</p>
                                    </div>
                                        
                                }
                            </div>
                        </ul>
                    
     
                  
                       
      
            </div>
        </div>
    );
};

export default Watch;
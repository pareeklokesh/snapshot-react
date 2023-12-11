import React from "react";
import { useState, useEffect } from "react";

const Gallery = () => {
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setselectedTag] = useState("mountain");
    const apikey = "636e1481b4f3c446d26b8eb6ebfe7127";

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${selectedTag}&per_page=24&format=json&nojsoncallback=1`);
                const data = await res.json();
                setImg(data.photos.photo);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(true);
            }
        };
        fetchdata();
        
    }, [selectedTag]);

    const handleButtonClick = (tag) => {
        setselectedTag(tag);
    }

    
    return (
        <>
        <div className="container-fluid">
            <div className="container">
                <div className="row justify-content-center my-3">
                    {["mountain", "beach", "bird", "food"].map((tag) => (
                        <div className="w-auto" key={tag}>
                            <button
                  type="button"
                  className={`btn btn-dark text-capitalize ${tag === selectedTag ? 'active' : ''}`}
                  onClick={() => handleButtonClick(tag)}
                >
                  {tag}
                </button>
                        </div>
                    ))}
                    
                </div>
                <div className="row">
                    {loading ? (
                        <div className=" position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      </div>
                    ) : (
                        img.map((photo) => (
                            <div className="col-md-3 p-0 overflow-hidden" key={photo.id} style={{height:'190px'}}>
                                <img className="w-100 h-100 object-fit-cover" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                        alt={photo.title} />
                            </div>
                        ))
                    )}
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Gallery;
import React, { useState, useEffect } from 'react'
import './MovieList.css'
import axios from '../axios'

const baseUrl = "https://image.tmdb.org/t/p/original";
function MovieList({ title , fetchUrl}) {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
      async function fetchData(){
       const request = await axios.get(fetchUrl);
       setMovies(request.data.results);
       return request;
      } fetchData();
      
    }, [fetchUrl]);

return (
    <>
        <div className="container">
            <h1>{title}</h1>
            <div className='movie_row'>
                {(movies?.map((movie) => {
                    return <div className="container">
                     <img src={`${baseUrl}${movie?.poster_path}`} alt={movie.name} className='card_img' />
                    <div className='card_body'>
                        <h5 className='card_title'>{movie.title?movie.original_title:movie?.name}</h5>
                       <div className="button"><a href="/">Wishlist</a></div>
                    </div>
                    </div>
                }))}
            </div>
        </div>
    </>
)
            }

export default MovieList;
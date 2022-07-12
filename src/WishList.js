import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchList from './Components/SearchList';
import MovieListHeading from './Components/MovieListHeading';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';
import './Components/Header.css';
import './Components/MovieList.css';
import MovieList from './Components/MovieList'
import Header from './Components/Header'
import api from './api'
import SearchBox from './Components/SearchBox'
import './WishList.css'


const WishList = ({handleLogout}) => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=2ec3bb99`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	},[searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
    
    return (
        <>
        <div className="navigation">
            <nav className="navbar">
                <ul>
                    <li><img className='logo' src="https://codewithsadee.github.io/filmlane/assets/images/logo.svg" alt="" /></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Movies</a></li>
                    <li><a href="/">Tv Shows</a></li>
                    <li><a href="/">Watchlist</a></li>

                </ul>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

                <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
            </nav>
        {searchValue?.length?(
            
         <div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center'>
				<MovieListHeading heading='Movies' />
			</div>
			<div className='row'>
				<SearchList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<SearchList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
         
        
        ):
        <>
        <Header />
    
        <MovieList  title="Trending now" fetchUrl={api.fetchTrending} />

        <MovieList   title="TV Shows" fetchUrl={api.fetchTVShows} />

        <MovieList   title="Top Rated Movies" fetchUrl={api.fetchTopRated} />

        <MovieList title="Romance" fetchUrl={api.fetchRomanceMovies} />
           
    
    </>  
    }
           

                   
        </div>
        </>
    );
}

export default WishList;
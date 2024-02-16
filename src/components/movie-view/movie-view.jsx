import React, { useState, useEffect } from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Container, Col, Row, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ user, addFav, removeFav, movies }) => {
  const { title } = useParams();

  const movie = movies.find((m) => m.Title === title);

  const similarMovies = movies.filter(
    (m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id
  );

  const isFav = user.FavoriteMovies.find((mId) => movie._id === mId);
  const handleAddFav = (movieId) => {
    addFav(movieId);
  };

  const handleRemoveFav = (movieId) => {
    removeFav(movieId);
  };

  return (
    <>
      {movie && (
        <div className="main-content-custom" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="movie-image"
              src={movie.ImagePath}
              alt={movie.Title}
            />
          </div>
          <div>
            {isFav ? (
              <HeartFill
                color="red"
                size={20}
                className="fav-button mt-2 me-2 top-0 end-0"
                onClick={() => handleRemoveFav(movie._id)}
              />
            ) : (
              <Heart
                color="red"
                size={20}
                className="fav-button mt-2 me-2 top-0 end-0"
                onClick={() => handleAddFav(movie._id)}
              />
            )}
          </div>
          <br />
          <div className="movie-view">
            <h1>{movie.Title}</h1>
            {/* Other movie view content */}
          </div>
          <div>
            <span>Year: </span>
            <span>
              <h1>{movie.Year}</h1>
            </span>
          </div>
          <div>
            <span>
              <iframe
                src={movie.TrailerPath.replace("watch?v=", "embed/")}
                title="Movie trailer"
                aria-label="trailer"
                allowFullScreen
                style={{ width: "100%", height: "500px" }}>
                Watch Trailer
              </iframe>
            </span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <br />
          <p style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span>{movie.Description}</span>
          </p>

          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "auto" }}>
              <h2>Similar movies</h2>
              <Container className="mb-3">
                <Row>
                  {similarMovies.map((movie) => (
                    <Col
                      md={3}
                      key={`${movie._id}-${isFav}`}
                      className="movie-card">
                      <MovieCard
                        movie={movie}
                        addFav={addFav}
                        removeFav={removeFav}
                        user={user}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MovieView.propTypes = {
  user: PropTypes.object.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};

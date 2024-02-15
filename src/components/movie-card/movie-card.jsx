import React from "react";
import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ user, movie, addFav, removeFav }) => {
  const isFav = user.FavoriteMovies.find((mId) => mId === movie._id);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <div>
          <Heart
            className={`heart ${isFav ? "filled" : ""}`}
            onClick={() => (isFav ? removeFav(movie._id) : addFav(movie._id))}
          />
        </div>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Title>{movie.Year}</Card.Title>
      </Card.Body>

      <Card.Footer>
        <Link to={`/movies/${movie.Title}`} className="open-button">
          Open
        </Link>
      </Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.number,
  }).isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
};

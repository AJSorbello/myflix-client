import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";

export function ProfileView({ movies, user, setUser, addFav, removeFav }) {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {user && (
                <UserInfo
                  username={user.Username}
                  email={user.Email}
                  birthday={user.Birthday}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
        <></>
        <h4>Favorite Movies</h4>
        {movies
          .filter((movie) => user.FavoriteMovies.includes(movie._id))
          .map((movie) => (
            <Col className="mb-4" key={movie._id} md={4}>
              <MovieCard
                movie={movie}
                addFav={addFav}
                removeFav={removeFav}
                user={user}
              />
            </Col>
          ))}
        {/* // ) : (
          // <div className="mb-4 primary" style={{ color: "white" }}>
          //   No Favorite Movies Added
          // </div>
        // )} */}
      </Row>
    </Container>
  );
}

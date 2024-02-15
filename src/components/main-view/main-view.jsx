import { useState, useEffect } from "react";
import "./main-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Col, Row, FormControl, Button } from "react-bootstrap";

export const MainView = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ready, setReady] = useState(false);

  const addFav = (movieId) => {
    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };
  const removeFav = (movieId) => {
    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
      });
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        const moviesFromApi = movies.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
            },
            Featured: movie.Featured,
            Actors: movie.Actors,
            Year: movie.Year,
            TrailerPath: movie.TrailerPath,
          };
        });

        setMovies(moviesFromApi);
        setReady(true);
      });
  }, [token]);
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/login" />
                  ) : (
                    <Col md={5}>
                      <SignupView
                        onSignup={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col></Col>
                  ) : (
                    <>
                      <Row className="justify-content-md-center">
                        <Col xs lg="4">
                          <Row>
                            <Col>
                              <FormControl
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control"
                              />
                            </Col>

                            <Col xs="auto">
                              <Button
                                variant="primary"
                                className="clear-button"
                                onClick={() => setSearchTerm("")}>
                                Clear
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {movies
                        .filter((movie) =>
                          movie.Title.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        )
                        .map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard
                              movie={movie}
                              user={user}
                              addFav={addFav}
                              removeFav={removeFav}
                            />
                          </Col>
                        ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path="/movies/:title"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : !ready ? (
                    <Col> Loading....</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        addFav={addFav}
                        removeFav={removeFav}
                        movies={movies}
                        user={user}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : !ready ? (
                    <Col> Loading...</Col>
                  ) : (
                    <Col md={8}>
                      <ProfileView
                        user={user}
                        setUser={setUser}
                        movies={movies}
                        addFav={addFav}
                        removeFav={removeFav}
                      />
                      //{" "}
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

import React, { useEffect, useState } from "react";
import "../css/Home.css";
import endImage from "../assets/Auth/images/end2.jpeg";
import middleImage from "../assets/Auth/images/middle9.jpeg";
import openImage from "../assets/Auth/images/open2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "./ClipLoader";
import { resetRegistrationStatus } from "../redux/slices/authSlice";
import { getAllArticles } from "../redux/slices/articleSlice";
import { getAllUser, getTopUser } from "../redux/slices/userSlice";
import { format } from "date-fns";
import { getAllLessons } from "../redux/slices/lessonSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CenteredLoader from "./CenteredLoader";
function Home() {
  const {
    isRegistered,
    isLoading,
    user: currentUser,
  } = useSelector((state) => state.auth);
  const { articles, isLoadingArticle } = useSelector((state) => state.article);
  const { lessons, isLoadingHomeLesson } = useSelector((store) => store.lesson);
  const { users, isLoadingHome } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    console.log(isRegistered, "home");
    if (isRegistered) {
      dispatch(resetRegistrationStatus());
      navigate("/userGuide");
    }
    dispatch(getAllArticles());
    dispatch(getTopUser());
    dispatch(getAllLessons());
  }, [isRegistered, navigate, dispatch]);

  const handleNavigation = () => {
    navigate("/articles");
  };
  const searchOptions = [
    ...articles.map((article) => ({
      type: "article",
      id: article._id,
      label: article.articleName,
      description: article.articleDesc,
    })),
    ...lessons.map((lesson) => ({
      type: "lesson",
      id: lesson._id,
      label: lesson.lessonName,
      description: lesson.lessonDesc,
    })),
  ];

  const handleSearchSelect = (event, value) => {
    if (value) {
      // Navigate based on the type of selected item
      if (value.type === "article") {
        navigate(`/articles/${value.id}`);
      } else if (value.type === "lesson") {
        navigate(`/lessons/${value.id}`);
      }
    }
  };
  console.log(isRegistered, "register status");
  if (isLoading || isLoadingArticle || isLoadingHome || isLoadingHomeLesson) {
    return <CenteredLoader />;
  }
  console.log(users, "nerde bunlar");
  console.log(currentUser.userId, "mevcut kullanıcı");
  return (
    <div>
      <section
        style={{ height: "200px" }}
        className="hero-section d-flex justify-content-center align-items-center"
        id="section_1"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h1
                style={{
                  fontSize: "50px",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                }}
                className="text-white text-center"
              >
                Learn, Play, Have Fun
              </h1>

              <h6
                style={{ fontStyle: "italic", fontWeight: "bold", color: "" }}
                className="text-center"
              >
                for those who want to step into the world of chess{" "}
              </h6>

              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "3px solid ",
                }}
                className="custom-form mt-4 pt-2 mb-lg-0 mb-5"
              >
                <Autocomplete
                  id="search-autocomplete"
                  options={searchOptions}
                  getOptionLabel={(option) => option.label}
                  style={{
                    width: "100%",
                  }}
                  value={searchValue}
                  onChange={handleSearchSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Lesson, Article..."
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <div>
                        <strong>{option.label}</strong>
                        <p style={{ fontSize: "0.8rem", color: "gray" }}>
                          {option.description.length > 50
                            ? option.description.substring(0, 50) + "..."
                            : option.description}
                        </p>
                      </div>
                    </li>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ marginTop: "0px", paddingTop: "50px" }}
        className="explore-section section-padding"
        id="section_2"
      >
        <div className="container">
          <div className="col-12 text-center">
            <h2 className="mb-4">Lessons</h2>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="design-tab-pane"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/beginner-lessons">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Beginner</h5>

                              <p className="mb-0">
                                Movement of the pieces and other basic
                                information{" "}
                              </p>
                            </div>

                            <span className="badge bg-design rounded-pill ms-auto">
                              3
                            </span>
                          </div>

                          <img
                            style={{ paddingTop: "25px" }}
                            src={openImage}
                            className="custom-block-image img-fluid"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/middle-lessons">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Intermediate</h5>

                              <p className="mb-0">
                                Openings, traps, and middlegame strategies
                              </p>
                            </div>

                            <span className="badge bg-design rounded-pill ms-auto">
                              2
                            </span>
                          </div>

                          <img
                            src={middleImage}
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/advanced-lessons">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Advanced</h5>

                              <p className="mb-0">
                                Endgame strategies, types of checkmates, and
                                more
                              </p>
                            </div>

                            <span className="badge bg-design rounded-pill ms-auto">
                              1
                            </span>
                          </div>

                          <img
                            src={endImage}
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "0px",
          paddingTop: "10px",
        }}
        className="explore-section section-padding"
        id="section_2"
      >
        <div className="container">
          <div className="col-12 text-center">
            <h2 className="mb-4">Articles</h2>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="design-tab-pane"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    {articles
                      .slice()
                      .reverse() // Listeyi ters çevir
                      .slice(-3) // İlk 3 makaleyi al
                      .map((article) => (
                        <div
                          key={article._id}
                          className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0"
                        >
                          <div className="custom-block bg-white shadow-lg">
                            <Link to={`/articles/${article._id}`}>
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2">
                                    {article.articleName}
                                  </h5>
                                  <p className="mb-0">
                                    {article.articleDesc.length > 50
                                      ? article.articleDesc.substring(0, 40) +
                                        "..."
                                      : article.articleDesc}
                                  </p>
                                </div>
                              </div>
                              <img
                                style={{ paddingTop: "25px" }}
                                src={article.articleImage}
                                className="custom-block-image img-fluid"
                                alt={article.articleName}
                              />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(240,248,255)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "10px",
                  }}
                >
                  <button onClick={handleNavigation} className="more-btn">
                    and more..
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

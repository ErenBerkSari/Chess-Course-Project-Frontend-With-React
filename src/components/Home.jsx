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
function Home() {
  const {
    isRegistered,
    isLoading,
    user: currentUser,
  } = useSelector((state) => state.auth);
  const { articles, isLoadingArticle } = useSelector((state) => state.article);
  const { users, isLoadingHome } = useSelector((store) => store.user);
  const { lessons, isLoadingHomeLesson } = useSelector((store) => store.lesson);
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
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ClipLoader color="#4caf50" loading={true} size={50} />
        <div>Yükleniyor, lütfen bekleyin...</div>
      </div>
    );
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
                Öğren, Oyna, Eğlen
              </h1>

              <h6
                style={{ fontStyle: "italic", fontWeight: "bold", color: "" }}
                className="text-center"
              >
                satranç dünyasına adım atmak isteyenler için
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
                      label="Ders, Makale Ara..."
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
            <h2 className="mb-4">Dersler</h2>
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
                              <h5 className="mb-2">Başlangıç Seviye</h5>

                              <p className="mb-0">
                                Taşların hareketi ve diğer temel bilgiler
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
                              <h5 className="mb-2">Orta Seviye</h5>

                              <p className="mb-0">
                                Açılışlar, tuzaklar ve oyun ortası stratejileri
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
                              <h5 className="mb-2">İleri Seviye</h5>

                              <p className="mb-0">
                                Oyun sonu stratejileri, matl türleri ve daha
                                fazlası
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

                <div
                  className="tab-pane fade"
                  id="marketing-tab-pane"
                  role="tabpanel"
                  aria-labelledby="marketing-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Advertising</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-advertising rounded-pill ms-auto">
                              30
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_online_ad_re_ol62.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Video Content</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-advertising rounded-pill ms-auto">
                              65
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Group_video_re_btu7.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Viral Tweet</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-advertising rounded-pill ms-auto">
                              50
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_viral_tweet_gndb.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="finance-tab-pane"
                  role="tabpanel"
                  aria-labelledby="finance-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Investment</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-finance rounded-pill ms-auto">
                              30
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Finance_re_gnv2.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="custom-block custom-block-overlay">
                        <div className="d-flex flex-column h-100">
                          <img
                            src="images/businesswoman-using-tablet-analysis-graph-company-finance-strategy-statistics-success-concept-planning-future-office-room.jpg"
                            className="custom-block-image img-fluid"
                            alt=""
                          />

                          <div className="custom-block-overlay-text d-flex">
                            <div>
                              <h5 className="text-white mb-2">Finance</h5>

                              <p className="text-white">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Sint animi necessitatibus
                                aperiam repudiandae nam omnis
                              </p>

                              <a
                                href="topics-detail.html"
                                className="btn custom-btn mt-2 mt-lg-3"
                              >
                                Learn More
                              </a>
                            </div>

                            <span className="badge bg-finance rounded-pill ms-auto">
                              25
                            </span>
                          </div>

                          <div className="social-share d-flex">
                            <p className="text-white me-4">Share:</p>

                            <ul className="social-icon">
                              <li className="social-icon-item">
                                <a
                                  href="#"
                                  className="social-icon-link bi-twitter"
                                ></a>
                              </li>

                              <li className="social-icon-item">
                                <a
                                  href="#"
                                  className="social-icon-link bi-facebook"
                                ></a>
                              </li>

                              <li className="social-icon-item">
                                <a
                                  href="#"
                                  className="social-icon-link bi-pinterest"
                                ></a>
                              </li>
                            </ul>

                            <a
                              href="#"
                              className="custom-icon bi-bookmark ms-auto"
                            ></a>
                          </div>

                          <div className="section-overlay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="music-tab-pane"
                  role="tabpanel"
                  aria-labelledby="music-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Composing Song</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-music rounded-pill ms-auto">
                              45
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Compose_music_re_wpiw.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Online Music</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-music rounded-pill ms-auto">
                              45
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_happy_music_g6wc.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Podcast</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-music rounded-pill ms-auto">
                              20
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Podcast_audience_re_4i5q.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="education-tab-pane"
                  role="tabpanel"
                  aria-labelledby="education-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-3">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Graduation</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-education rounded-pill ms-auto">
                              80
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Graduation_re_gthn.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <a href="topics-detail.html">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Educator</h5>

                              <p className="mb-0">
                                Lorem Ipsum dolor sit amet consectetur
                              </p>
                            </div>

                            <span className="badge bg-education rounded-pill ms-auto">
                              75
                            </span>
                          </div>

                          <img
                            src="images/topics/undraw_Educator_re_ju47.png"
                            className="custom-block-image img-fluid"
                            alt=""
                          />
                        </a>
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
            <h2 className="mb-4">Makaleler</h2>
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
                    Daha Fazla..
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-lg">
        <div
          style={{ overflow: "hidden", marginBottom: "110px" }}
          className="table-responsive"
        >
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Liderlik <b>Tablosu</b>
                  </h2>
                </div>
                <div className="col-sm-6"></div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: "22%" }}>Kullanıcı Adı</th>
                  <th style={{ width: "22%" }}>Kayıt Tarihi</th>
                  <th style={{ width: "22%" }}>Seviye</th>
                  <th style={{ width: "22%" }}>Genel İlerleme</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={
                          user.profileImage
                            ? `http://localhost:3000${user.profileImage}`
                            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        }
                        width={25}
                        style={{ borderRadius: "15px" }}
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                    <td>{user.userLevel}</td>
                    <td>
                      {user.progressInUser?.overallProgress !== undefined &&
                      user.progressInUser?.overallProgress !== null
                        ? user.progressInUser.overallProgress.toFixed(2)
                        : "Veri yok"}
                    </td>
                    {/* İlerleme yüzdesi */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "../ClipLoader";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../redux/slices/articleSlice";

function ArticleList() {
  const { articles, isLoadingArticle } = useSelector((state) => state.article);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  if (isLoadingArticle) {
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
  return (
    <div>
      <section
        style={{ marginTop: "0px", paddingTop: "10px" }}
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
                  <div
                    style={{ backgroundColor: "rgb(240,248,255)" }}
                    className="row"
                  >
                    {articles.map((article) => (
                      <div
                        style={{ padding: "15px" }}
                        key={article._id}
                        className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0"
                      >
                        <div className="custom-block bg-white shadow-lg">
                          <Link to={`/articles/${article._id}`}>
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">{article.articleName}</h5>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticleList;

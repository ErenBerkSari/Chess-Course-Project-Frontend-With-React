import React, { useEffect } from "react";
import "../../css/ArticleDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getArticle, clearArticleState } from "../../redux/slices/articleSlice";
import { useParams } from "react-router-dom";
import ClipLoader from "../ClipLoader";
import CenteredLoader from "../CenteredLoader";

function ArticleDetail() {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const { article, isLoadingArticle } = useSelector((state) => state.article);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticle(articleId));
    }
    return () => {
      dispatch(clearArticleState());
      console.log("Article state cleared");
    };
  }, [dispatch, articleId]);

  if (isLoadingArticle) {
    return <CenteredLoader />;
  }

  if (!article || !article.articleContent?.sections) {
    return <div>Article not found</div>; // If data is missing
  }
  console.log(article);
  return (
    <div>
      <header
        style={{
          height: "250px",
          padding: "75px",
        }}
        className="site-header d-flex flex-column justify-content-center align-items-center"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <h2
              style={{
                fontSize: "60px",
                width: "800px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "95px",
              }}
              className="text-white"
            >
              {article.articleName}
            </h2>
          </div>
        </div>
      </header>
      <section
        className="article-detail-section section-padding"
        id="article-detail"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 m-auto">
              <h3 className="mb-4">{article.articleName}</h3>
              <p>{article.articleDesc}</p>

              {/* Dynamic Content */}
              {article.articleContent.sections.map((section, index) => {
                switch (section.type) {
                  case "text":
                    return <p key={index}>{section.content || section.text}</p>;
                  case "image":
                    return (
                      <div className="my-4" key={index}>
                        <img
                          src={section.url}
                          alt="Article Visual"
                          style={{
                            width: "750px",
                            height: "650px",
                            marginBottom: "10px",
                          }}
                        />
                        {section.text && <p>{section.text}</p>}
                      </div>
                    );
                  case "image-text":
                    return (
                      <div className="my-4" key={index}>
                        <img
                          src={section.url}
                          alt="Article Image with Text"
                          style={{
                            width: "750px",
                            height: "650px",
                            marginBottom: "10px",
                          }}
                        />
                        <p>{section.text}</p>
                      </div>
                    );
                  default:
                    return (
                      <p key={index}>Unknown content type: {section.type}</p>
                    );
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticleDetail;

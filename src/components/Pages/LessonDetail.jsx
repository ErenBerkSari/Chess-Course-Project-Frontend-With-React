import React, { useEffect } from "react";
import "../../css/LessonDetail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLessonState,
  getLesson,
  lessonIsCompleted,
} from "../../redux/slices/lessonSlice";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "../ClipLoader";
import CenteredLoader from "../CenteredLoader";

function LessonDetail() {
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const { lesson, isLoading, isCompleted } = useSelector(
    (state) => state.lesson
  );

  useEffect(() => {
    if (lessonId) {
      dispatch(getLesson(lessonId));
      dispatch(lessonIsCompleted(lessonId));
    }
    return () => {
      dispatch(clearLessonState());
      console.log("Cleared");
    };
  }, [dispatch, lessonId]);
  if (isLoading || isCompleted == null) {
    return <CenteredLoader />;
  }

  if (!lesson || !lesson.lessonContent?.sections) {
    return <div>Lesson not found</div>; // If data is missing
  }

  return (
    <div>
      <header
        style={{
          height: "max-content",
          padding: "75px",
        }}
        className="site-header d-flex flex-column justify-content-center align-items-center"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <h2
              style={{
                fontSize: "60px",
                width: "700px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="text-white"
            >
              {lesson.lessonName}
            </h2>
          </div>
        </div>
      </header>
      <section
        className="topics-detail-section section-padding"
        id="topics-detail"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 m-auto">
              <h3 className="mb-4">{lesson.lessonName}</h3>
              <p style={{ textAlign: "justify" }}>{lesson.lessonDesc}</p>

              {/* Dynamic Content */}
              {lesson.lessonContent.sections.map((section, index) => {
                switch (section.type) {
                  case "text":
                    return (
                      <p style={{ textAlign: "justify" }} key={index}>
                        {section.content || section.text}
                      </p>
                    );
                  case "image":
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="my-4"
                        key={index}
                      >
                        <img
                          src={section.url}
                          alt="Lesson Visual"
                          style={{
                            width: "750px",
                            height: "500px",
                            marginBottom: "10px",
                          }}
                        />
                        {section.text && <p>{section.text}</p>}
                      </div>
                    );
                  case "image-text":
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="my-4"
                        key={index}
                      >
                        <img
                          src={section.url}
                          alt="Lesson Image with Text"
                          style={{
                            width: "700px",
                            height: "500px",
                          }}
                        />
                        <p style={{ textAlign: "justify" }}>{section.text}</p>
                      </div>
                    );
                  default:
                    return (
                      <p style={{ textAlign: "justify" }} key={index}>
                        Unknown content type: {section.type}
                      </p>
                    );
                }
              })}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isCompleted ? (
                  <div class="alert alert-success" role="alert">
                    Lesson completed! You can continue reviewing the content.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      If you think you have completed this lesson, you can take
                      the test.
                    </div>
                    <Link to="lessonTest">
                      <button style={{ marginTop: "10px" }} id="test-button">
                        Start Test
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LessonDetail;

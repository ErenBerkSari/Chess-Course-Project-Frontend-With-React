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
      console.log("Temizlendi");
    };
  }, [dispatch, lessonId]);
  if (isLoading || isCompleted == null) {
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

  if (!lesson || !lesson.lessonContent?.sections) {
    return <div>Ders bulunamadı</div>; // Veri eksikse
  }

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
              <p>{lesson.lessonDesc}</p>

              {/* Dinamik İçerik */}
              {lesson.lessonContent.sections.map((section, index) => {
                switch (section.type) {
                  case "text":
                    return <p key={index}>{section.content || section.text}</p>;
                  case "image":
                    return (
                      <div className="my-4" key={index}>
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
                      <div className="my-4" key={index}>
                        <img
                          src={section.url}
                          alt="Lesson Image with Text"
                          style={{
                            width: "750px",
                            height: "750px",
                            marginBottom: "10px",
                          }}
                        />
                        <p>{section.text}</p>
                      </div>
                    );
                  default:
                    return (
                      <p key={index}>Bilinmeyen içerik türü: {section.type}</p>
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
                    Ders tamamlandı! İçeriği incelemeye devam edebilirsiniz.
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
                      Bu dersi tamamladığını düşünüyorsan testi çözebilirsin
                    </div>
                    <Link to="lessonTest">
                      <button style={{ marginTop: "10px" }} id="test-button">
                        Teste Geç
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

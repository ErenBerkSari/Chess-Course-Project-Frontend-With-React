import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLessonState,
  getLessonsToLevel,
  lessonIsCompleted,
} from "../../redux/slices/lessonSlice";
import completed from "../../assets/Auth/images/logos/completed3.png";
import ClipLoader from "../ClipLoader";
import CenteredLoader from "../CenteredLoader";

function MyLesson() {
  const { lessons } = useSelector((store) => store.lesson);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.lesson);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  useEffect(() => {
    dispatch(getLessonsToLevel("Beginner"));
    return () => {
      dispatch(clearLessonState());
    };
  }, [dispatch]);

  useEffect(() => {
    // Tamamlanan derslerin ID'lerini topla
    const checkCompletedLessons = async () => {
      const completedIds = await Promise.all(
        lessons.map(async (lesson) => {
          const isCompleted = await dispatch(lessonIsCompleted(lesson._id));
          return isCompleted.payload ? lesson._id : null;
        })
      );

      // Null olanları filtrele
      const validCompletedIds = completedIds.filter((id) => id !== null);
      setCompletedLessonIds(validCompletedIds);
    };

    if (lessons.length > 0) {
      checkCompletedLessons();
    }
    return () => {
      dispatch(clearLessonState());
    };
  }, [lessons, dispatch]);

  if (isLoading || lessons.length == 0) {
    return <CenteredLoader />;
  }
  return (
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
                style={{ backgroundColor: "rgb(238, 243, 253)" }}
                className="row"
              >
                {completedLessonIds.length === 0 ? (
                  // Tamamlanmış ders yoksa gösterilecek mesaj
                  <div className="col-12">
                    <p className="text-center text-muted mt-4">
                      You have no completed lessons.
                    </p>
                  </div>
                ) : (
                  // Tamamlanmış dersler varsa onları listele
                  lessons.map((lesson) =>
                    completedLessonIds.includes(lesson._id) ? (
                      <div
                        key={lesson._id}
                        className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0"
                      >
                        <div className="custom-block bg-white shadow-lg">
                          <Link to={`/lessons/${lesson._id}`}>
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">{lesson.lessonName}</h5>
                                <p className="mb-0">
                                  {lesson.lessonDesc.length > 50
                                    ? lesson.lessonDesc.substring(0, 40) + "..."
                                    : lesson.lessonDesc}
                                </p>
                              </div>
                              <span>
                                <img
                                  style={{
                                    position: "absolute",
                                    right: "18px",
                                    top: "22px",
                                  }}
                                  src={completed}
                                  width={100}
                                  alt="Tamamlandı!"
                                />
                              </span>
                            </div>
                            {lesson.lessonImage && (
                              <img
                                src={lesson.lessonImage}
                                style={{
                                  width: "300px",
                                  height: "200px",
                                }}
                                className="custom-block-image img-fluid"
                                alt={lesson.lessonName}
                              />
                            )}
                          </Link>
                        </div>
                      </div>
                    ) : null
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLesson;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearLessonState,
  completeLesson,
  getLesson,
  lessonIsCompleted,
} from "../../redux/slices/lessonSlice";
import "../../css/LessonTest.css";
import { updateUserProgress } from "../../redux/slices/userSlice";
import ClipLoader from "../ClipLoader";

function LessonTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { lesson, isLoading, isCompleted } = useSelector(
    (state) => state.lesson
  );
  const { user } = useSelector((state) => state.auth);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  console.log(isCompleted);
  const handleOptionChange = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.lessonTest.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    const totalQuestions = lesson.lessonTest.length;
    let correctAnswersCount = 0;

    for (let i = 0; i < totalQuestions; i++) {
      if (lesson.lessonTest[i].correctAnswer === selectedOptions[i]) {
        correctAnswersCount++;
      }
    }

    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;

    if (correctPercentage >= 65) {
      dispatch(completeLesson(lessonId));
      alert(
        `Tebrikler! Testi %${correctPercentage.toFixed(
          2
        )} doğruluk oranıyla geçtin!`
      );
      dispatch(updateUserProgress(user.userId));
      navigate("/beginner-lessons");
    } else {
      alert(
        `Üzgünüm, testi geçemedin. Skorun %${correctPercentage.toFixed(
          2
        )}. Geçmek için en az %65'e ihtiyacın var.`
      );
    }
  };

  useEffect(() => {
    if (lessonId) {
      dispatch(getLesson(lessonId));
      dispatch(lessonIsCompleted(lessonId));
    }

    return () => {
      dispatch(clearLessonState());
    };
  }, [dispatch, lessonId]);

  // Simplified rendering logic
  if (isLoading || isCompleted === null) {
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

  if (!lesson.lessonTest || !lesson.lessonTest.length) {
    return <div>Test verisi bulunamadı.</div>;
  }

  if (!lesson.lessonTest[currentQuestionIndex]) {
    return <div>Geçerli soru bulunamadı.</div>;
  }

  const currentQuestion = lesson.lessonTest[currentQuestionIndex];

  return (
    <div>
      {isCompleted ? (
        <div>Ders tamamlandı! İçeriği incelemeye devam edebilirsiniz.</div>
      ) : (
        <div className="quiz-container">
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "5px",
            }}
          >
            {lesson.lessonName}
          </h2>

          <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="options">
              {currentQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`q${currentQuestionIndex}o${optionIndex}`}
                    name={`question${currentQuestionIndex}`}
                    value={option}
                    checked={selectedOptions[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label htmlFor={`q${currentQuestionIndex}o${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <button
              id="pn-button"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Önceki Soru
            </button>

            <div>
              Soru {currentQuestionIndex + 1} / {lesson.lessonTest.length}
            </div>

            <button
              id="pn-button"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === lesson.lessonTest.length - 1}
            >
              Sonraki Soru
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {currentQuestionIndex === lesson.lessonTest.length - 1 && (
              <button
                className="submit-btn"
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
              >
                Testi Bitir
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonTest;

import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
const Home = React.lazy(() => import("../components/Home"));
// import Home from "../components/Home";
const GamePage = React.lazy(() => import("../components/Pages/GamePage"));
import MyLesson from "../components/Pages/MyLesson";
import UserGuide from "../components/Pages/UserGuide";
import Profile from "../components/Pages/Profile";
import BeginnerPage from "../components/Pages/BeginnerPage";
import MiddlePage from "../components/Pages/MiddlePage";
import AdvancedPage from "../components/Pages/AdvancedPage";
import LessonDetail from "../components/Pages/LessonDetail";
import LessonTest from "../components/Pages/LessonTest";
const AdminDashboard = React.lazy(() =>
  import("../components/Pages/AdminDashboard")
);
const AdminDashboardUser = React.lazy(() =>
  import("../components/Pages/AdminDashboardUser")
);
const AdminDashboardLesson = React.lazy(() =>
  import("../components/Pages/AdminDashboardLesson")
);
const TeacherDashboard = React.lazy(() =>
  import("../components/Pages/TeacherDashboard")
);
const TeacherDashboardArticle = React.lazy(() =>
  import("../components/Pages/TeacherDashboardArticle")
);
const TeacherDashboardLesson = React.lazy(() =>
  import("../components/Pages/TeacherDashboardLesson")
);
// import AdminDashboard from "../components/Pages/AdminDashboard";
// import AdminDashboardUser from "../components/Pages/AdminDashboardUser";
// import AdminDashboardLesson from "../components/Pages/AdminDashboardLesson";
// import TeacherDashboard from "../components/Pages/TeacherDashboard";
// import TeacherDashboardArticle from "../components/Pages/TeacherDashboardArticle";
// import TeacherDashboardLesson from "../components/Pages/TeacherDashboardLesson";
import ArticleList from "../components/Pages/ArticleList";
import ArticleDetail from "../components/Pages/ArticleDetail";
import ClipLoader from "../components/ClipLoader";

function RouterConfig() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Suspense
        fallback={<ClipLoader size={50} color={"#123abc"} loading={true} />}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/myLessons" element={<MyLesson />} />
              <Route path="/userGuide" element={<UserGuide />} />
              <Route path="/articles" element={<ArticleList />} />
              <Route path="/articles/:articleId" element={<ArticleDetail />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/beginner-lessons" element={<BeginnerPage />} />
              <Route path="/middle-lessons" element={<MiddlePage />} />
              <Route path="/advanced-lessons" element={<AdvancedPage />} />
              <Route path="/lessons/:lessonId" element={<LessonDetail />} />
              <Route
                path="/lessons/:lessonId/lessonTest"
                element={<LessonTest />}
              />

              {user.role === "admin" ? (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/dashboard/user"
                    element={<AdminDashboardUser />}
                  />
                  <Route
                    path="/dashboard/lesson"
                    element={<AdminDashboardLesson />}
                  />
                </>
              ) : user.role === "teacher" ? (
                <>
                  <Route
                    path="/teacherDashboard"
                    element={<TeacherDashboard />}
                  />
                  <Route
                    path="/teacherDashboard/article"
                    element={<TeacherDashboardArticle />}
                  />
                  <Route
                    path="/teacherDashboard/lesson"
                    element={<TeacherDashboardLesson />}
                  />
                </>
              ) : (
                // Student rolü için default route
                <Route path="*" element={<Home />} />
              )}
            </>
          ) : (
            <>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default RouterConfig;

// function RouterConfig() {
//   const { isLoggedIn, user } = useSelector((state) => state.auth);

//   return (
//     <div>
//       <Suspense fallback={ClipLoader}>
//         <Routes>
//           {isLoggedIn ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/game" element={<GamePage />} />
//               <Route path="/myLessons" element={<MyLesson />} />
//               <Route path="/userGuide" element={<UserGuide />} />
//               <Route path="/articles" element={<ArticleList />} />
//               <Route path="/articles/:articleId" element={<ArticleDetail />} />
//               <Route path="/profile/:userId" element={<Profile />} />
//               <Route path="/beginner-lessons" element={<BeginnerPage />} />
//               <Route path="/middle-lessons" element={<MiddlePage />} />
//               <Route path="/advanced-lessons" element={<AdvancedPage />} />
//               <Route path="/lessons/:lessonId" element={<LessonDetail />} />
//               <Route
//                 path="/lessons/:lessonId/lessonTest"
//                 element={<LessonTest />}
//               />

//               {user.role === "admin" ? (
//                 <>
//                   <Route path="/dashboard" element={<AdminDashboard />} />
//                   <Route
//                     path="/dashboard/user"
//                     element={<AdminDashboardUser />}
//                   />
//                   <Route
//                     path="/dashboard/lesson"
//                     element={<AdminDashboardLesson />}
//                   />
//                 </>
//               ) : user.role === "teacher" ? (
//                 <>
//                   <Route
//                     path="/teacherDashboard"
//                     element={<TeacherDashboard />}
//                   />
//                   <Route
//                     path="/teacherDashboard/article"
//                     element={<TeacherDashboardArticle />}
//                   />
//                   <Route
//                     path="/teacherDashboard/lesson"
//                     element={<TeacherDashboardLesson />}
//                   />
//                 </>
//               ) : (
//                 <Route path="*" element={<Home />} />
//               )}
//             </>
//           ) : (
//             <>
//               <Route path="/auth/login" element={<Login />} />
//               <Route path="/auth/register" element={<Register />} />
//               <Route path="*" element={<Login />} />
//             </>
//           )}
//         </Routes>
//       </Suspense>
//     </div>
//   );
// }

// export default RouterConfig;

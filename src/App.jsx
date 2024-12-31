import RouterConfig from "./config/RouterConfig";
import "../src/App.css";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import MyLesson from "./components/Pages/MyLesson";
import GamePage from "./components/Pages/GamePage";
import About from "./components/Pages/About";
import UserGuide from "./components/Pages/UserGuide";
import Profile from "./components/Pages/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "../src/assets/Auth/css/styles.min.css";
import { checkAuth } from "./redux/slices/authSlice";
import { useEffect } from "react";
import ClipLoader from "../src/components/ClipLoader";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);
  console.log("isLoggedIn: ", isLoggedIn);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ClipLoader color="#4caf50" loading={true} size={50} />
        <div>Loading, please wait...</div>
      </div>
    );
  }
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header />
          <RouterConfig />
        </>
      ) : (
        <>
          <RouterConfig />
        </>
      )}
    </div>
  );
}

export default App;

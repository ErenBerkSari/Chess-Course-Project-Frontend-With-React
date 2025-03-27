import React, { useEffect, useState } from "react";
import darkLogo from "../../assets/Auth/images/logos/chess2.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import "../../css/Login.css";
import ClipLoader from "../ClipLoader";
import CenteredLoader from "../CenteredLoader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const errorMessage = useSelector((state) => state.auth.error);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    try {
      console.log("Login işlemi başlatılıyor..");
      const result = await dispatch(
        login({ email: loginEmail, password: loginPassword })
      );
      if (login.fulfilled.match(result)) {
        console.log("Giriş başarılı: ", result);
        await new Promise((resolve) => setTimeout(resolve, 100));

        navigate("/");
      } else {
        console.log("Giriş başarısız: ", result);
        alert(
          result.payload || "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Login işlemi sırasında hata: ", error);
      alert("An error occurred during the login process. Please try again.");
    }
  };

  if (isLoading) {
    return <CenteredLoader />;
  }
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div
              style={{ width: "500px" }}
              className="col-md-8 col-lg-6 col-xxl-3"
            >
              <div className="card mb-0">
                <div className="card-body">
                  <a className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src={darkLogo} width="50" alt="" />
                  </a>
                  <p className="text-center">Chess101</p>
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">
                        Don't you have an account?
                      </p>
                      <Link
                        to={"/auth/register"}
                        className="text-primary fw-bold ms-2"
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

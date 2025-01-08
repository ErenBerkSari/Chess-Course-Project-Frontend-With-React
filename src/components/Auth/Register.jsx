import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import darkLogo from "../../assets/Auth/images/logos/chess2.png";
import { register } from "../../redux/slices/authSlice";
import ClipLoader from "../ClipLoader";
import "../../css/Register.css";

function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("student");
  const [isCSSLoaded, setIsCSSLoaded] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    import("../../assets/Auth/css/styles.min.css").then(() => {
      setIsCSSLoaded(true);
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    try {
      const result = await dispatch(
        register({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          role: registerRole,
        })
      );

      if (register.fulfilled.match(result)) {
        navigate("/userGuide");
      } else {
        alert(result.payload || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Kayıt işlemi sırasında hata: ", error);
      alert(
        "An error occurred during the registration process. Please try again."
      );
    }
  };

  if (isLoading || !isCSSLoaded) {
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="col-md-8 col-lg-6 col-xxl-0"
            >
              <div
                className="card mb-0"
                style={{
                  width: "450px", // Genişliği 400px olarak ayarlayın
                  height: "auto", // Yüksekliği otomatik ayarlayın
                }}
              >
                <div
                  style={{ padding: "10px 30px 22px 30px" }}
                  className="card-body"
                >
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img src={darkLogo} width="50" alt="Logo" />{" "}
                    {/* Logonun boyutunu küçült */}
                  </a>
                  <p className="text-center">Chess101</p>
                  <form>
                    <div className="mb-2">
                      <label htmlFor="exampleInputtext1" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputtext1"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
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
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
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
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="exampleInputRole1" className="form-label">
                        User Role
                      </label>
                      <select
                        className="form-control"
                        id="exampleInputRole1"
                        value={registerRole}
                        onChange={(e) => setRegisterRole(e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary w-100 py-2 fs-5 mb-3 rounded-2"
                    >
                      Kaydol
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-5 mb-0 fw-bold">
                        Do you already have an account?
                      </p>
                      <Link
                        to={"/auth/login"}
                        className="text-primary fw-bold ms-2"
                      >
                        Login
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

export default Register;

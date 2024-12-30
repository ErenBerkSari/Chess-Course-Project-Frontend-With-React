import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Header.css";
import { logout } from "../redux/slices/authSlice";
import ClipLoader from "./ClipLoader";
import admin from "../assets/Auth/images/logos/admin2.png";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.auth);
  const handleLogout = async () => {
    console.log("handleLogout fonksiyonu çağrıldı");
    await dispatch(logout());
    console.log("Logout işlemi dispatch edildi");
    navigate("/auth/login");
  };
  if (user === null || isLoading) {
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
  console.log("neci bu", user.role);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div className="header-container">
        <Link to="/" className="header-navbar-brand">
          <span>C</span>hess101
        </Link>

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            {user.role == "student" ? (
              <ul className="navbar-nav nav ml-auto">
                <li className="header-nav-item">
                  <Link to="/" className="nav-link">
                    <span>Anasayfa</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to="/myLessons" className="nav-link">
                    <span>Derslerim</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to="/game" className="nav-link">
                    <span>Oyna</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to="/userGuide" className="nav-link">
                    <span>Kullanıcı Kılavuzu</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to={`/profile/${user.userId}`} className="nav-link">
                    <span>Profil</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    <span onClick={handleLogout}>Çıkış Yap</span>
                  </a>
                </li>
              </ul>
            ) : (
              <span></span>
            )}

            {user.role == "admin" ? (
              <>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "290px",
                  }}
                  className="header-nav-item"
                >
                  <Link to="/" className="nav-link">
                    <span>Anasayfa</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to={`/dashboard`} className="nav-link">
                    <div
                      style={{
                        marginLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Admin Paneli</span>
                      <img
                        style={{
                          paddingBottom: "3px",
                        }}
                        src={admin}
                        width={35}
                      />
                    </div>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <a
                    style={{ cursor: "pointer", marginTop: "6px" }}
                    className="nav-link"
                  >
                    <span onClick={handleLogout}>Çıkış Yap</span>
                  </a>
                </li>
              </>
            ) : (
              <span></span>
            )}
            {user.role == "teacher" ? (
              <>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "290px",
                    marginTop: "4px",
                  }}
                  className="header-nav-item"
                >
                  <Link to="/" className="nav-link">
                    <span>Anasayfa</span>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <Link to={`/teacherDashboard`} className="nav-link">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "5px",
                      }}
                    >
                      <span>Öğretmen Paneli</span>
                    </div>
                  </Link>
                </li>
                <li className="header-nav-item">
                  <a
                    style={{ cursor: "pointer", marginTop: "5px" }}
                    className="nav-link"
                  >
                    <span onClick={handleLogout}>Çıkış Yap</span>
                  </a>
                </li>
              </>
            ) : (
              <span></span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
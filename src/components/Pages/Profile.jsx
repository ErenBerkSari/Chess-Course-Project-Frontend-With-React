import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearUserState,
  getUser,
  getUserProgress,
  updateUserProfileImage,
} from "../../redux/slices/userSlice";
import ClipLoader from "../ClipLoader";
import printer from "../../assets/Auth/images/logos/printer.png";
function Profile() {
  const { userId } = useParams();
  const { user, progresses, isLoading, profileImage } = useSelector(
    (state) => state.user
  );
  const {
    overallProgress,
    beginnerProgress,
    middleProgress,
    advancedProgress,
  } = progresses || {};
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
      dispatch(getUserProgress(userId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch, userId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      dispatch(updateUserProfileImage({ userId, formData }));
    }
  };
  const handlePrint = () => {
    window.print();
  };

  if (isLoading || user === null || progresses == null) {
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
  return (
    <div className="profile-container">
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div
                style={{
                  height: "536px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: "48px",
                }}
                className="card mb-4"
              >
                <div className="card-body text-center">
                  <img
                    src={
                      profileImage
                        ? `https://chess-course-project-backend-with-node-js.onrender.com${profileImage}`
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "240px", height: "240px" }}
                    onError={(e) => {
                      console.error("Tam Hata Detayı:", e);
                      e.target.src =
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"; // Hata durumunda default resim
                    }}
                  />
                  <h5 className="my-3">{user.username}</h5>
                  <div>
                    <label htmlFor="file-upload" id="custom-file-upload">
                      Profil Resmini Seç
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        onClick={handleUpload}
                        className="btn btn-outline-primary ms-1"
                        disabled={!selectedFile}
                        id="profile-updated"
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {[
                    { label: "Kullanıcı Adı", value: `${user.username}` },
                    { label: "Email", value: `${user.email}` },
                    { label: "Seviye", value: `${user.userLevel}` },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{item.label}</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{item.value}</p>
                        </div>
                      </div>
                      {index < 2 && <hr />}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: "1520px" }} className="row">
                {[...Array(1)].map((_, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            Kullanıcı İlerlemeleri
                          </span>
                        </p>

                        {[
                          {
                            task: `Genel İlerleme`,
                            progress: overallProgress,
                          },

                          {
                            task: "Başlangıç Seviye Dersler",
                            progress: beginnerProgress,
                          },
                          {
                            task: "Orta Seviye Dersler",
                            progress: middleProgress,
                          },
                          {
                            task: "İleri Seviye Dersler",
                            progress: advancedProgress,
                          },
                        ].map((item, i) => (
                          <div key={i}>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              {item.task + " "}(
                              {item.progress !== null &&
                              item.progress !== undefined
                                ? `${item.progress.toFixed(2)}%`
                                : "Bilinmiyor"}
                              )
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: "5px" }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${item.progress}%` }}
                                aria-valuenow={item.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            onClick={handlePrint}
            id="print-btn"
            className="btn btn-outline-primary"
          >
            <img width={50} src={printer}></img>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;

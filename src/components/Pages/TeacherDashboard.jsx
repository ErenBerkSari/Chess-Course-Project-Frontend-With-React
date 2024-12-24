import React from "react";
import "../../css/TeacherDashboard.css";
import { Link } from "react-router-dom";
function TeacherDashboard() {
  return (
    <div className="teacher-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link className="link-teacher" to="article">
          <div id="boxv1" className="teacher-box"></div>
        </Link>
        <div style={{ fontSize: "20px" }}>Makale Ekle</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link className="link-teacher" to="lesson">
          <div id="boxv2" className="teacher-box"></div>
        </Link>
        <div style={{ fontSize: "20px" }}>Ders Ekle</div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

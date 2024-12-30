import React from "react";
import { Link } from "react-router-dom";
import "../../css/AdminDashboard.css";
function AdminDashboard() {
  return (
    <div className="admin-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link className="link-admin" to="user">
          <div id="box1" className="admin-box"></div>
        </Link>
        <div style={{ fontSize: "20px" }}>User Operations</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link className="link-admin" to="lesson">
          <div id="box2" className="admin-box"></div>
        </Link>
        <div style={{ fontSize: "20px" }}>Lesson Operations</div>
      </div>
    </div>
  );
}

export default AdminDashboard;

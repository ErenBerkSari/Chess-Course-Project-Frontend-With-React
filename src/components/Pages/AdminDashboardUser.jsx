import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

import "../../css/AdminDashboardUser.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUsersListState,
  deleteUser,
  getAllUser,
  getUserProgress,
} from "../../redux/slices/userSlice";
import ClipLoader from "../ClipLoader";
import { format } from "date-fns";

function AdminDashboardUser() {
  const { users, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());

    return () => {
      dispatch(clearUsersListState());
    };
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  // Arama fonksiyonu
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Arama terimine göre filtreleme
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm)
  );

  const handleDelete = async (userId) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        const result = await dispatch(deleteUser(userId)).unwrap();

        // Optional: Show a success toast
        toast.success("Kullanıcı başarıyla silindi");
      } catch (error) {
        // Optional: Show an error toast
        toast.error("Kullanıcı silinirken bir hata oluştu");
        console.error("Delete user error:", error);
      }
    }
  };

  if (isLoading) {
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
    <div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Kullanıcı <b>Detayları</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        id="search"
                        className="form-control"
                        placeholder="Kullanıcı adı.."
                        onChange={handleSearch}
                        value={searchTerm}
                      />
                      <span className="input-group-addon">
                        <i className="material-icons">&#xE8B6;</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: "22%" }}>Kullanıcı Adı</th>
                  <th style={{ width: "22%" }}>Email</th>
                  <th>Kayıt Tarihi</th>
                  <th>Seviye</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={
                          user.profileImage
                            ? `http://localhost:3000${user.profileImage}`
                            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        }
                        width={25}
                        style={{ borderRadius: "15px" }}
                      />
                    </td>

                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                    <td>{user.userLevel}</td>
                    <td>{user.role}</td>
                    <td>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        onClick={() => handleDelete(user._id)} // Silme fonksiyonu
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardUser;

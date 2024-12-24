import React, { useEffect, useState } from "react";
import "../../css/UserGuide.css";
import faq from "../../assets/Auth/images/backgrounds/faq_graphic.jpg";
import pawn from "../../assets/Auth/images/logos/pawn.png";
import crown from "../../assets/Auth/images/logos/crown.png";
import king from "../../assets/Auth/images/logos/king.png";
import back from "../../assets/Auth/images/middle7.jpeg";
import "../../assets/Auth/images/logos/characterKing.jpeg";

import "../../assets/Auth/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from "react-redux";
import { resetCharacterStatus } from "../../redux/slices/authSlice.jsx";
import ClipLoader from "../ClipLoader";

function UserGuide() {
  const { characterIsVisible, isLoading } = useSelector((state) => state.auth);
  console.log(characterIsVisible, "chara");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetCharacterStatus());
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
    <div
      style={{
        backgroundColor: "#fff",
      }}
    >
      {characterIsVisible && (
        <div className="character">
          <div className="speech-bubble">
            <p className="character-text">
              Merhaba aramıza hoşgeldin! Bu sayfada aklına takılan soruların
              cevabını bulabilirsin.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button id="character-btn" onClick={handleClick}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <section
        style={{ paddingTop: "50px", backgroundImage: { back } }}
        className="timeline-section section-padding"
        id="section_3"
      >
        <div className="section-overlay"></div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white mb-4">Nasıl Çalışır?</h2>
            </div>

            <div className="col-lg-10 col-12 mx-auto">
              <div className="timeline-container">
                <ul
                  style={{ height: "600px" }}
                  className="vertical-scrollable-timeline"
                  id="vertical-scrollable-timeline"
                >
                  <div className="list-progress">
                    <div className="inner"></div>
                  </div>

                  <li>
                    <h4 className="text-white mb-3">
                      Seviyelere Göre Dersleri Tamamlayın
                    </h4>

                    <p className="text-white">
                      Uygulamamızda başlangıç, orta ve ileri seviye dersler
                      bulunmaktadır. Anasayfadan bu derslere erişebilir ve
                      dersleri tamamlamaya başlayabilirsiniz.
                    </p>

                    <div className="icon-holder">
                      <img
                        src={pawn}
                        width={40}
                        height={35}
                        style={{ paddingLeft: "2px" }}
                        className="bi-search"
                      ></img>
                    </div>
                  </li>

                  <li>
                    <h4 className="text-white mb-3">
                      Bilgisayara Karşı Satranç Oynayın
                    </h4>

                    <p className="text-white">
                      Header bölümünde bulunan "Oyna" kısmına tıklıyarak oyun
                      sayfasına erişebilirsiniz. Bu sayfada istediğiniz seviyede
                      bilgisayara karşı satranç oynayabilirsiniz.
                    </p>

                    <div className="icon-holder">
                      <img
                        src={crown}
                        width={40}
                        height={40}
                        style={{ paddingLeft: "2px", color: "white" }}
                        className="bi-search"
                      ></img>
                    </div>
                  </li>

                  <li>
                    <h4 className="text-white mb-3">
                      Makale, Oyuncu ve Dersleri Aratın, İlerlemenizi Takip Edin
                    </h4>

                    <p className="text-white">
                      Anasayfadan istediğiniz içeriğe aratarak ulaşabilirsiniz
                      ve profil sekmesinden ilerlemenizi takip edebilirsiniz.
                    </p>

                    <div className="icon-holder">
                      <img
                        src={king}
                        width={40}
                        height={40}
                        className="bi-search"
                      ></img>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section section-padding" id="section_4">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            className="row"
          >
            <div className="col-lg-6 col-12">
              <h2
                style={{
                  marginLeft: "40px",
                  fontSize: "35px",
                  fontWeight: "bolder",
                }}
                className="mb-4"
              >
                Sıkça Sorulan Sorular
              </h2>
            </div>

            <div className="clearfix"></div>

            <div className="col-lg-5 col-12">
              <img src={faq} className="img-fluid" alt="FAQs" />
            </div>

            <div className="col-lg-6 col-12 m-auto">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Nasıl Satranç Oynayabilirim?
                    </button>
                  </h2>

                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Header bölümünde bulunan "Oyna" linkine tıklayarak oyun
                      sayfasına erişebilirsiniz.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Bir Konuyu Nasıl Bulurum?
                    </button>
                  </h2>

                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Anasayfada bulunan arama çubuğuna ilgi alanınıza uygun
                      anahtar kelimeler yazarak konuları kolayca bulabilirsiniz.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Kullanım Ücretli Mi?
                    </button>
                  </h2>

                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Hayır, uygulamamız tamamen ücretsizdir. Tüm içeriklere
                      kolayca erişebilirsiniz.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserGuide;

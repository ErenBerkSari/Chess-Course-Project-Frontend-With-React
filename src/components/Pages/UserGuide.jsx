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
import CenteredLoader from "../CenteredLoader.jsx";

function UserGuide() {
  const { characterIsVisible, isLoading } = useSelector((state) => state.auth);
  console.log(characterIsVisible, "chara");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetCharacterStatus());
  };
  if (isLoading) {
    return <CenteredLoader />;
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
              Hello, welcome! You can find answers to any questions you may have
              on this page.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button id="character-btn" onClick={handleClick}>
                Close
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
              <h2 className="text-white mb-4">How Does It Work?</h2>
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
                      Complete Lessons by Levels
                    </h4>

                    <p className="text-white">
                      Our app offers beginner, intermediate, and advanced level
                      lessons. You can access these lessons from the homepage
                      and start completing them.
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
                      Play Chess Against the Computer
                    </h4>

                    <p className="text-white">
                      You can access the game page by clicking the "Play"
                      section in the header. On this page, you can play chess
                      against the computer at any level you choose.
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
                      Search for Articles, Players, and Lessons, Track Your
                      Progress
                    </h4>

                    <p className="text-white">
                      You can search for any content from the homepage, and you
                      can track your progress from the profile section.
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
                Frequently Asked Questions
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
                      How Can I Play Chess?
                    </button>
                  </h2>

                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can access the game page by clicking the "Play" link
                      in the header section.
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
                      How Can I Find a Topic?
                    </button>
                  </h2>

                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can easily find topics by typing keywords related to
                      your interests in the search bar on the homepage.
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
                      Is There a Fee for Usage?
                    </button>
                  </h2>

                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      No, our app is completely free. You can access all content
                      without any charges.
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

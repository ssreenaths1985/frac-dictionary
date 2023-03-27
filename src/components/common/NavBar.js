import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

const NavBar = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "KarmayogiBharat_Logo_Horizontal.svg" }) {
        publicURL
      }
    }
  `);

  function openSlider() {
    document.getElementById("slider").style.width = "65%";
    document.getElementById("mainSection").style.opacity = "0.325";
  }

  function closeSlider() {
    document.getElementById("slider").style.width = "0";
    document.getElementById("mainSection").style.opacity = "1";
  }

  return (
    <nav className="navbar custom-nav-bar">
      <div className="container-fluid">
        <div className="row pt-2 ml-0 ml-xs-3 ml-sm-3 ml-md-0 ml-lg-5">
          {/*For smaller screens*/}
          <div
            role="button"
            aria-hidden="true"
            className="d-block d-sm-none menu-icon"
            onClick={() => {
              openSlider();
            }}
            onKeyDown={() => {
              openSlider();
            }}
          >
            <span className="material-icons">menu</span>
          </div>

          {/* For tab screens */}
          <div
            role="button"
            aria-hidden="true"
            className="d-none d-md-block d-lg-none menu-icon-2"
            onClick={() => {
              openSlider();
            }}
            onKeyDown={() => {
              openSlider();
            }}
          >
            <span className="material-icons">menu</span>
          </div>

          {/* Slider section */}
          <div
            id="slider"
            className="custom-slider d-block d-sm-block d-md-block d-lg-none"
          >
            <button
              className="slider-close-btn"
              onClick={() => closeSlider()}
              onKeyDown={() => closeSlider()}
            >
              &times;
            </button>
            {location && location.pathname && (
              <div className="">
                <Link to="/overview/">
                  <div
                    className={`d-flex cursor-pointer dictionary-link pl-6 ${
                      location.pathname === "/" ||
                      location.pathname === "/overview/" ||
                      location.pathname === "/search/"
                        ? "active-link"
                        : "side-navigation"
                    }`}
                  >
                    Dictionary
                  </div>
                </Link>
                <Link to="/positions/">
                  <div
                    className={`d-flex cursor-pointer positions-link pl-6 ${
                      location.pathname === "/positions/"
                        ? "active-link"
                        : "side-navigation"
                    }`}
                  >
                    Positions
                  </div>
                </Link>
                <Link to="/roles/">
                  <div
                    className={`cursor-pointer role-link pl-6 ${
                      location.pathname === "/roles/"
                        ? "active-link"
                        : "side-navigation"
                    }`}
                  >
                    Roles
                  </div>
                </Link>
                <Link to="/activities/">
                  <div
                    className={`d-flex cursor-pointer activities-link pl-6 ${
                      location.pathname === "/activities/"
                        ? "active-link"
                        : "side-navigation"
                    }`}
                  >
                    Activities
                  </div>
                </Link>
                <Link to="/competencies/">
                  <div
                    className={`d-flex cursor-pointer competencies-link pl-6 ${
                      location.pathname === "/competencies/" ||
                      location.pathname.includes("/competencyDetail/")
                        ? "active-link"
                        : "side-navigation"
                    }`}
                  >
                    Competencies
                  </div>
                </Link>
                <hr />
              </div>
            )}
            {/* About Section */}
            <div className="push-bottom about-section pl-3 pb-3 d-block d-sm-block d-md-block d-lg-none">
              {/* <Link to="/about/">
                <p>About us</p>
              </Link>
              <Link to="/privacy/">
                {" "}
                <p>Privacy Policy</p>
              </Link>  */}
              <p>© Copyright 2020 - 2022</p>
            </div>
          </div>

          {/* Logo section */}
          <div className="brand-logo mr-3">
          <Link to="/">
            <img
              src={data.placeholderImage.publicURL}
              alt="brand"
              width="95%"
              height="95%"
            />
            </Link>
          </div>
          <div className="vl mr-3"></div>
          <h1 className="navbar-heading pt-1">FRAC Dictionary</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

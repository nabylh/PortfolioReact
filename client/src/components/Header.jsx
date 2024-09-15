import React from "react";
import exportImage from "/assets/images/export.png";

function Header() {
  return (
    <>
      <header>
        <nav>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 115.13 117.42"
          >
            <defs>
              <style>
                {`
                  .cls-1,.cls-4,.cls-6{fill:none;}
                  .cls-2{fill:#b3b6bb;}
                  .cls-3{clip-path:url(#clip-path);}
                  .cls-4{stroke:#1d1d1b;stroke-width:0.68px;}
                  .cls-5{fill:#e3e5e5;}
                  .cls-6{stroke:#38404a;stroke-width:1.35px;}
                  .cls-7{fill:#fff;}
                  .cls-8,.cls-9{font-size:22.95px;fill:#1d1d1b;}
                  .cls-8{font-family:Roboto-Black, Roboto;font-weight:800;}
                  .cls-9{font-family:Roboto-Thin, Roboto;font-weight:200;}
                `}
              </style>
              <clipPath id="clip-path" transform="translate(0 0)">
                <rect className="cls-1" width="115.13" height="117.42" />
              </clipPath>
            </defs>
            <title>Fichier 1</title>
            <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <rect
                  className="cls-2"
                  x="16.43"
                  y="20.25"
                  width="82.26"
                  height="79.2"
                  transform="translate(-25.46 58.23) rotate(-45)"
                />
                <g className="cls-3">
                  <rect
                    className="cls-4"
                    x="16.43"
                    y="20.25"
                    width="82.26"
                    height="79.2"
                    transform="translate(-25.46 58.23) rotate(-45)"
                  />
                </g>
                <rect
                  className="cls-5"
                  x="23.63"
                  y="14.91"
                  width="70.68"
                  height="75.37"
                  transform="translate(-19.92 57.1) rotate(-45)"
                />
                <g className="cls-3">
                  <rect
                    className="cls-6"
                    x="23.63"
                    y="14.91"
                    width="70.68"
                    height="75.37"
                    transform="translate(-19.92 57.1) rotate(-45)"
                  />
                </g>
                <rect
                  className="cls-7"
                  x="25.6"
                  y="25.76"
                  width="68.3"
                  height="72.1"
                  transform="translate(-26.21 60.35) rotate(-45)"
                />
                <rect
                  className="cls-6"
                  x="25.6"
                  y="25.76"
                  width="68.3"
                  height="72.1"
                  transform="translate(-26.21 60.35) rotate(-45)"
                />
                <text className="cls-8" transform="translate(49.1 61.69)">
                  N
                </text>
                <text className="cls-9" transform="translate(65.21 61.69)">
                  _
                </text>
              </g>
            </g>
          </svg>

          <ul>
            <li>
              <a href="#apropos">A propos</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#mycv">Mon CV</a>
            </li>
            <li>
              <a href="#articles">Articles</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <div className="search-barre">
            <input
              type="text"
              placeholder="Rechercher d'Articles..."
              className="search-input"
            />
            <button className="search-button">
              <svg
                width="10"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>
        </nav>
        <img
        // src={exportImage}
        // alt="Capture d'écran du site"
        // className="capture2 "
        />
      </header>
    </>
  );
}

export default Header;

import { Link } from "react-router-dom";

export default function SectionThree() {
  return (
    <section className="help">
      <div className="help__container g-container">
        <div className="help__info to-top">
          <span className="help__subtitle to-image">
            Technology meets service
          </span>
          <h2 className="help__title">We're here to help</h2>
          <p className="help__description">
            Bella, our smart bot, can guide you to your perfect policy. There’s
            also human help whenever you need it.
          </p>
          <Link className="help__button" to="#">
            get help
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.296"
              height="14.884"
              viewBox="0 0 30.296 14.884"
            >
              <path
                id="Shape"
                d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z"
                transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)"
                fill="#007188"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="help__images">
          <img
            className="help__image"
            src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/dots.svg"
            alt="dots"
          />
          <picture className="help__picture">
            <img
              className="help__picture-image to-image"
              src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/help-image.png"
              alt="help"
            />
          </picture>
          <span className="help__bubble g-bubble to-right">
            There's also human help 👋
          </span>
        </div>
      </div>
    </section>
  );
}

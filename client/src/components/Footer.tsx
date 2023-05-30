import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container g-container">
        <div className="footer__left">
          <div className="footer__info">
            <img className="footer__img" src="/official_logo.png" alt="logo" />
            {/* <p className="footer__description">
              3aweni vous invite à vous inscrire à notre Newsletter.
            </p> */}
          </div>
          {/* <form className="footer__form">
            <input
              className="footer__form-input"
              placeholder="Votre adresse email"
            />
            <button className="footer__form-submit g-button g-button--submit">
              {" "}
              S'abonner
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
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
          </form> */}
          <div className="footer__social">
            <Link className="footer__social-link" target="_blank" to="https://www.facebook.com/3awenitn">
              <img
                className="footer__social-icon"
                src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/facebook.svg"
                alt="icon"
              />
            </Link>
            <Link className="footer__social-link" target="_blank" to="https://www.instagram.com/3aweni.tn/">
              <img
                className="footer__social-icon"
                src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/instagram.svg"
                alt="icon"
              />
            </Link>
          </div>
        </div>
        <div className="footer__right">
          <div className="footer__links">
            <ul className="footer__links-list">
              <h4 className="footer__links-title">Liens</h4>
              <Link className="footer__links-item" to="/create/category">
                Lancer un 3aweni
              </Link>
              <Link className="footer__links-item" to="/search">
                Recherche
              </Link>
              <Link className="footer__links-item" to="#">
                Aide
              </Link>
            </ul>
            <ul className="footer__links-list">
              <h4 className="footer__links-title">Resources</h4>
              <Link className="footer__links-item" to="#">
                Contact
              </Link>
              <Link className="footer__links-item" to="#">
                FAQs
              </Link>
              <Link className="footer__links-item" to="#">
                Tarification
              </Link>
              <Link className="footer__links-item" to="#">
                Privacy & terms
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__terms">
        <p className="footer__terms-link">
          3aweni © Tunisie, 2023. Tous les droits sont réservés.
        </p>
      </div>
    </footer>
  );
}

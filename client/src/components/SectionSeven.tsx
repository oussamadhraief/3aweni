import { Link } from 'react-router-dom'

export default function SectionSeven() {
  return (
    <section className="cards">
      <div className="card__swiper swiper-container">
        <ul className="card__slider swiper-wrapper">
          <li className="card__item card__item--cyan swiper-slide">
            <h3 className="card__title">Calculator</h3>
            <p className="card__description">How much life insurance do I need?</p><Link className="card__link" to="#">Calculate Coverage
              <svg xmlns="http://www.w3.org/2000/svg" width="30.296" height="14.884" viewBox="0 0 30.296 14.884">
                <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#6FB0E1"></path>
              </svg></Link>
          </li>
          <li className="card__item card__item--orange swiper-slide">
            <h3 className="card__title">Term vs. perm</h3>
            <p className="card__description">Term vs. whole life insurance. Which is best for you?</p><Link className="card__link" to="#">See the winner
              <svg xmlns="http://www.w3.org/2000/svg" width="30.296" height="14.884" viewBox="0 0 30.296 14.884">
                <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#F49440"></path>
              </svg></Link>
          </li>
          <li className="card__item card__item--red swiper-slide">
            <h3 className="card__title">Pricing</h3>
            <p className="card__description">How much does life insurance cost?</p><Link className="card__link" to="#">Tell Me More
              <svg xmlns="http://www.w3.org/2000/svg" width="30.296" height="14.884" viewBox="0 0 30.296 14.884">
                <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#FF4032"></path>
              </svg></Link>
          </li>
          <li className="card__item card__item--blue swiper-slide">
            <h3 className="card__title">Insurance 101</h3>
            <p className="card__description">The ultimate guide to life insurance.</p><Link className="card__link" to="#">Become an expert
              <svg xmlns="http://www.w3.org/2000/svg" width="30.296" height="14.884" viewBox="0 0 30.296 14.884">
                <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#017289"></path>
              </svg></Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

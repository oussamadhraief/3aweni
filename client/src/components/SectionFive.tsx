import React from 'react'

export default function SectionFive() {
  return (
    <section className="works">
      <div className="works__container g-container">
        <div className="works__info to-top"><span className="works__subtitle">Comment ça fonctionne</span>
          <h2 className="works__title">Lancez un 3aweni en quelques minutes</h2>
          <p className="works__description">Définissez votre objectif, ajoutez des photos et des vidéos, insérez les informations nécessaires et partagez le lien.</p>
        </div>
        <div className="works-cards"><img className="works-card__line" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/works-line.svg" alt="imagen"/>
          <div className="works-card__item to-right">
            <picture className="works-card__picture"><img className="works-card__image" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/works-1.png" alt="imagen"/><span className="works-card__dot works-card__dot--1"></span></picture>
            <h3 className="works-card__title">Saisissez vos informations</h3><span className="works-card__description">Choose the amount that you would like to be covered for and we’ll give you a quote.</span>
          </div>
          <div className="works-card__item to-right2">
            <picture className="works-card__picture"><img className="works-card__image" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/works-2.png" alt="imagen"/><span className="works-card__dot works-card__dot--2"></span></picture>
            <h3 className="works-card__title">Ajoutez des photos et des vidéos</h3><span className="works-card__description">Answer a few questions and get your final price.</span>
          </div>
          <div className="works-card__item to-right3">
            <picture className="works-card__picture"><img className="works-card__image" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/works-3.png" alt="imagen"/><span className="works-card__dot works-card__dot--3"></span></picture>
            <h3 className="works-card__title">Définissez votre objectif</h3><span className="works-card__description">Congratulations on securing your loved ones financial future!</span>
          </div>
        </div>
        <div className="work__bottom to-top">
          <button className="work__button g-button g-button--cta">Lancez un 3aweni
            <svg xmlns="http://www.w3.org/2000/svg" width="30.296" height="14.884" viewBox="0 0 30.296 14.884">
              <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#ffffff"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

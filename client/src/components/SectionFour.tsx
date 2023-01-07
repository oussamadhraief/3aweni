import React from 'react'

export default function SectionFour() {
  return (
    <section className="hands">
      <div className="hands__container g-container">
        <picture className="hands__picture-top to-top"><img className="hands__picture-image" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-top.png" alt="hands"/></picture>
        <div className="hands__info to-top"><span className="hands__subtitle">Top-Rated Term Life Insurance</span>
          <h2 className="hands__title">You’re in safe hands</h2>
          <p className="hands__description">We've partnered with, [insert underwriter], one of the world’s largest, most trusted insurance companies. This means we can ensure reliability in paying Claims.</p>
        </div>
        <div className="hands-cards">
          <div className="hands-card__item to-right">
            <video className="hands-card__video" autoPlay muted loop>
              <source className="hands-card__source" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-video1.webm" type="video/webm"/>
            </video>
            <div className="hands-card__info">
              <h4 className="hands-card__title">Top Rated</h4>
              <p className="hands-card__description">A+ Financial Strength Rating by A.M. Best.</p>
            </div>
          </div>
          <div className="hands-card__item to-right2">
            <video className="hands-card__video" autoPlay muted loop>
              <source className="hands-card__source" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-video2.webm" type="video/webm"/>
            </video>
            <div className="hands-card__info">
              <h4 className="hands-card__title">Expert Guidance</h4>
              <p className="hands-card__description">We've placed millions of dollars in coverage people nationwide.</p>
            </div>
          </div>
          <div className="hands-card__item to-right3">
            <video className="hands-card__video" autoPlay muted loop>
              <source className="hands-card__source" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-video3.webm" type="video/webm"/>
            </video>
            <div className="hands-card__info">
              <h4 className="hands-card__title">We care</h4>
              <p className="hands-card__description">We care about you. We’re a 5 star insurance company. Well… Close enough!</p>
            </div>
          </div>
        </div>
        <picture className="hands__picture-bottom to-left"><img className="hands__picture-image" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-bottom.png" alt="hands"/></picture>
      </div>
    </section>
  )
}

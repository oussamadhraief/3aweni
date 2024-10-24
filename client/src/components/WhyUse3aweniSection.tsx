export default function WhyUse3aweniSection() {
  return (
    <section className="hands bg-white" id="why-3aweni">
      <div className="hands__container g-container">
        <picture className="hands__picture-top to-top">
          <img
            className="hands__picture-image"
            src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-top.png"
            alt="hands"
          />
        </picture>
        <div className="hands__info to-top">
          <span className="hands__subtitle">Bénéficiez de nos services</span>
          <h2 className="hands__title">Pourquoi utiliser 3aweni ?</h2>
          <p className="hands__description">
            Nos développeurs ont fait un énorme effort pour créer une solution
            simple et optimisée pour les personnes qui souhaitent faire un don.
          </p>
        </div>
        <div className="hands-cards flex flex-wrap justify-center items-center gap-5 lg:gap-[2.5%] px-5">
          <div className="w-8/12 sm:w-1/2 lg:w-[30%] max-h-[430px] max-w-[340px] lg:max-w-sm hands-card__item to-right">
            <lottie-player
              className="hands-card__video"
              src="https://assets2.lottiefiles.com/private_files/lf30_7mp95dwr.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", aspectRatio: "1" }}
              loop
              autoplay
            ></lottie-player>
            <div className="hands-card__info">
              <h4 className="hands-card__title">Lancement rapide</h4>
              <p className="hands-card__description">
                Créez un 3aweni en quelques minutes.
              </p>
            </div>
          </div>
          <div className="w-8/12 sm:w-1/2 lg:w-[30%] max-h-[430px] max-w-[340px] lg:max-w-sm hands-card__item to-right2">
            <lottie-player
              className="hands-card__video"
              src="https://assets8.lottiefiles.com/packages/lf20_fT3BtogoiM.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", aspectRatio: "1" }}
              loop
              autoplay
            ></lottie-player>
            <div className="hands-card__info">
              <h4 className="hands-card__title">Aide des experts</h4>
              <p className="hands-card__description">
                Nos experts sont disponibles 24/7 pour vous aider.
              </p>
            </div>
          </div>
          <div className="w-8/12 sm:w-1/2 lg:w-[30%] max-h-[430px] max-w-[340px] lg:max-w-sm hands-card__item to-right3">
            <lottie-player
              className="hands-card__video"
              src="https://assets7.lottiefiles.com/packages/lf20_msdmfngy.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", aspectRatio: "1" }}
              loop
              autoplay
            ></lottie-player>
            <div className="hands-card__info">
              <h4 className="hands-card__title">Paiement sécurisés</h4>
              <p className="hands-card__description">
                Vos paiement sont 100% sécurisés.
              </p>
            </div>
          </div>
        </div>
        <picture className="hands__picture-bottom to-left">
          <img
            className="hands__picture-image"
            src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/hands-bottom.png"
            alt="hands"
          />
        </picture>
      </div>
    </section>
  );
}

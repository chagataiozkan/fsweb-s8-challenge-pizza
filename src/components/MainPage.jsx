import "./MainPage.css";

export default function MainPage() {
  return (
    <>
      <header>
        <section className="mp-header-container">
          <div className="mp-header-banner">
            <img src="images/iteration-1-images/home-banner.png" alt="banner"/>
          </div>
          <div className="mp-header-contents">
            <img src="images/iteration-1-images/logo.svg" alt="logo" />
            <div className="mp-header-items">
              <p className="mp-text-1">fırsatı kaçırma</p>
              <p className="mp-text-2">KOD ACIKTIRIR</p>
              <p className="mp-text-2">PIZZA, DOYURUR</p>
              <a>ACIKTIM</a>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}
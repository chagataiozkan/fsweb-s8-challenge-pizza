import "./MainPage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <>
      <header>
        <section className="mp-header-container">
          <div className="mp-header-banner">
            <img src="images/iteration-1-images/home-banner.png" />
          </div>
          <div className="mp-header-contents">
            <img src="images/iteration-1-images/logo.svg" />
            <div className="mp-header-items">
              <p className="text-1">fırsatı kaçırma</p>
              <p className="text-2">KOD ACIKTIRIR</p>
              <p className="text-2">PIZZA, DOYURUR</p>
              <Link to="/order" className="mp-cta-link">
                ACIKTIM
              </Link>
            </div>
          </div>
        </section>
      </header>

      <section className="below-header-list">
        <ul className="list-contents">
          <li className="list-content">
            <img src="images/iteration-2-images/icons/1.svg" />
            <p>YENİ! Kore</p>
          </li>
          <li className="list-content">
            <img src="images/iteration-2-images/icons/2.svg" />
            <p>Pizza</p>
          </li>
          <li className="list-content">
            <img src="images/iteration-2-images/icons/3.svg" />
            <p>Burger</p>
          </li>
          <li className="list-content">
            <img src="images/iteration-2-images/icons/4.svg" />
            <p>Kızartmalar</p>
          </li>
          <li className="list-content">
            <img src="images/iteration-2-images/icons/5.svg" />
            <p>Fast Food</p>
          </li>
          <li className="list-content">
            <img src="images/iteration-2-images/icons/6.svg" />
            <p>Gazlı İçecek</p>
          </li>
        </ul>
      </section>

      <section className="cta-contents">
        <div className="cta-card-1 cta-card-left">
          <img src="images/iteration-2-images/cta/kart-1.png" />
          <p>Özel</p>
          <p>Lezzetus</p>
          <p>Position:Absolute Acı Burger</p>
          <Link to="/order" className="cta-link">
            SİPARİŞ VER
          </Link>
        </div>
        <div className="cta-card-right">
          <div className="cta-card-2">
            <img src="images/iteration-2-images/cta/kart-2.png" />
            <p>Hackathlon</p>
            <p>Burger Menü</p>
            <Link to="/order" className="cta-link">
              SİPARİŞ VER
            </Link>
          </div>
          <div className="cta-card-3">
            <img src="images/iteration-2-images/cta/kart-3.png" />
            <p>
              <span style={{ color: "red" }}>Çoooook</span> hızlı
            </p>
            <p>npm gibi kurye</p>
            <Link to="/order" className="cta-link">
              SİPARİŞ VER
            </Link>
          </div>
        </div>
      </section>  

      <div className="middle-text">
        <p className="upper-middle-text">en çok paketlenen menüler</p>
        <p className="bottom-middle-text">
          Acıktıran Kodlara Doyuran Lezzetler
        </p>
      </div>

      <section className="button-list">
        <button className="button-content">
          <img src="images/iteration-2-images/icons/1.svg" />
          <p>Ramen</p>
        </button>
        <button className="button-content">
          <img src="images/iteration-2-images/icons/2.svg" />
          <p>Pizza</p>
        </button>
        <button className="button-content">
          <img src="images/iteration-2-images/icons/3.svg" />
          <p>Burger</p>
        </button>
        <button className="button-content">
          <img src="images/iteration-2-images/icons/4.svg" />
          <p>French Fries</p>
        </button>
        <button className="button-content">
          <img src="images/iteration-2-images/icons/5.svg" />
          <p>Fast Food</p>
        </button>
        <button className="button-content">
          <img src="images/iteration-2-images/icons/6.svg" />
          <p>Soft Drinks</p>
        </button>
      </section>

      <section className="priced-contents">
        <div>
          <img src="images/iteration-2-images/pictures/food-1.png" />
          <div className="priced-text">
            <p>Terminal Pizza</p>
            <div className="priced-info">
              <p>4.9</p>
              <p>(200)</p>
              <p>60₺</p>
            </div>
          </div>
        </div>
        <div>
          <img src="images/iteration-2-images/pictures/food-2.png" />
          <div className="priced-text">
            <p>Position Absolute Acı Pizza</p>
            <div className="priced-info">
              <p>4.9</p>
              <p>(200)</p>
              <p>60₺</p>
            </div>
          </div>
        </div>
        <div>
          <img src="images/iteration-2-images/pictures/food-3.png" />
          <div className="priced-text">
            <p>useEffect Tavuklu Burger</p>
            <div className="priced-info">
              <p>4.9</p>
              <p>(200)</p>
              <p>60₺</p>
            </div>
          </div>
        </div>
      </section>

    <Footer />
    </>
  );
}

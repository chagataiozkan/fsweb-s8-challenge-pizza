import './Footer.css'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="main-footer-section">
          <div className="footer-left">
            <div className="footer-left-img">
              <img src="images/iteration-2-images/footer/logo-footer.svg" />
            </div>
            <div className="footer-left-list">
              <ul>
                <li>
                  <img src="images/iteration-2-images/footer/icons/icon-1.png" />
                  <div className="left-list">
                    <p>341 Londonderry Road,</p>
                    <p>Istanbul Türkiye</p>
                  </div>
                </li>
                <li>
                  <img src="images/iteration-2-images/footer/icons/icon-2.png" />
                  <p>aciktim@teknolojikyemekler.com</p>
                </li>
                <li>
                  <img src="images/iteration-2-images/footer/icons/icon-3.png" />
                  <p>+90 216 123 45 67</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-middle">
            <p className="footer-middle-header">Hot Menu</p>
            <ul className="footer-middle-list">
              <li>
                <p>Terminal Pizza</p>
              </li>
              <li>
                <p>5 Kişilik Hackathlon Pizza</p>
              </li>
              <li>
                <p>useEffect Tavuklu Pizza</p>
              </li>
              <li>
                <p>Beyaz Console Frosty</p>
              </li>
              <li>
                <p>Testler Geçti Mutlu Burger</p>
              </li>
              <li>
                <p>Position Absolute Acı Burger</p>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <p className="footer-right-header">Instagram</p>
            <ul className="footer-right-img-list">
              <li>
                <img src="images/iteration-2-images/footer/insta/li-0.png" />
              </li>
              <li>
                <img src="images/iteration-2-images/footer/insta/li-1.png" />
              </li>
              <li>
                <img src="images/iteration-2-images/footer/insta/li-2.png" />
              </li>
              <li>
                <img src="images/iteration-2-images/footer/insta/li-3.png" />
              </li>
              <li>
                <img src="images/iteration-2-images/footer/insta/li-4.png" />
              </li>
              <li>
                <img src="images/iteration-2-images/footer/insta/li-5.png" />
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-section">
          <p>© 2023 Teknolojik Yemekler.</p>
          <i className="fa-brands fa-twitter"></i>
        </div>
      </footer>
    </>
  );
}

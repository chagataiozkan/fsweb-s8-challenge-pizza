import "./Success.css";
import Footer from "./Footer";

export default function Success({ order }) {
  const pizzaName = "Position Absolute Acı Pizza";

  function translateIngredient(value) {
    if (value === "pepperoni") return "Pepperoni";
    else if (value === "sosis") return "Sosis";
    else if (value === "jambon") return "Kanada Jambonu";
    else if (value === "tavuk") return "Tavuk Izgara";
    else if (value === "sogan") return "Soğan";
    else if (value === "domates") return "Domates";
    else if (value === "misir") return "Mısır";
    else if (value === "sucuk") return "Sucuk";
    else if (value === "jalepeno") return "Jalepeno";
    else if (value === "sarimsak") return "Sarımsak";
    else if (value === "biber") return "Biber";
    else if (value === "salam") return "Salam";
    else if (value === "ananas") return "Ananas";
    else if (value === "kabak") return "Kabak";
    return value;
  }

  const ingredientLabels = (order.malzemeler || []).map(translateIngredient);

  let sizeLabel = "-";

  if (order.boyut === "kucuk") sizeLabel = "Küçük";
  else if (order.boyut === "orta") sizeLabel = "Orta";
  else if (order.boyut === "buyuk") sizeLabel = "Büyük";

  let doughLabel = "-";

  if (order.hamur === "ince") doughLabel = "İnce";
  else if (order.hamur === "kalın") doughLabel = "Kalın";

  return (
    <>
      <header className="success-header">
        <section className="success-container">
          <img src="images/iteration-1-images/logo.svg" />
          <div className="success-header-items">
            <p className="success-text-2">lezzetin yolda</p>
            <p className="success-text">SİPARİŞ ALINDI</p>
            <p className="success-pizza-name">{pizzaName}</p>
            <div className="success-summary">
              <p>
                Boyut: <span className="success-bold">{sizeLabel}</span>
              </p>
              <p>
                Hamur: <span className="success-bold">{doughLabel}</span>
              </p>
              <p className="ingredients-line">
                Ek Malzemeler:{" "}
                <span className="success-bold">
                  {ingredientLabels.join(", ")}
                </span>
              </p>
            </div>
            <div className="price-summary">
              <p className="price-title success-bold">Sipariş Toplamı</p>
              <p className="price-row">
                <span className="success-bold">Seçimler</span>
                <span className="success-bold">{order.secimler}₺</span>
              </p>

              <p className="price-row">
                <span className="success-bold">Toplam</span>
                <span className="success-bold">{order.toplam}₺</span>
              </p>
            </div>
          </div>
        </section>
      </header>
      <Footer />
    </>
  );
}

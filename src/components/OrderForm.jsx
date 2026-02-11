import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "./OrderForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function OrderForm({ setOrder }) {
  const ingredients = [
    { label: "Pepperoni", value: "pepperoni" },
    { label: "Sosis", value: "sosis" },
    { label: "Kanada Jambonu", value: "jambon" },
    { label: "Tavuk Izgara", value: "tavuk" },
    { label: "Soğan", value: "sogan" },
    { label: "Domates", value: "domates" },
    { label: "Mısır", value: "misir" },
    { label: "Sucuk", value: "sucuk" },
    { label: "Jalepeno", value: "jalepeno" },
    { label: "Sarımsak", value: "sarimsak" },
    { label: "Biber", value: "biber" },
    { label: "Salam", value: "salam" },
    { label: "Ananas", value: "ananas" },
    { label: "Kabak", value: "kabak" },
  ];

  const [formData, setFormData] = useState({
    userName: "",
    pizzaSize: "",
    doughSize: "",
    ingredients: [],
    quantity: 1,
    orderNote: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const ingredientsPrice = 5 * formData.ingredients.length;
  const basePizzaPrice = 85.5;
  const totalPrice = (basePizzaPrice + ingredientsPrice) * formData.quantity;

  function handleIngredients(event) {
    const { value, checked } = event.target;

    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          ingredients: [...prev.ingredients, value],
        };
      } else {
        return {
          ...prev,
          ingredients: prev.ingredients.filter((item) => item !== value),
        };
      }
    });
  }

  function handleQuantityChange(event) {
    let value = Number(event.target.value);
    if (value < 1) {
      value = 1;
    }
    setFormData((prev) => ({ ...prev, quantity: value }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) return;

    const payload = {
      isim: formData.userName,
      boyut: formData.pizzaSize,
      hamur: formData.doughSize,
      malzemeler: formData.ingredients,
      adet: formData.quantity,
      not: formData.orderNote,
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_REQRES_API_KEY,
          },
        },
      );

      console.log("Sipariş özeti: ", response.data);

      setOrder({
        ...response.data,
        secimler: ingredientsPrice * formData.quantity,
        toplam: totalPrice,
      });
      history.push("/success");
    } catch (err) {
      console.log(err);
    }
  }

  function increase() {
    setFormData((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }

  function decrease() {
    setFormData((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  }

  function validate(data) {
    const errorMessages = {};

    if (data.userName.trim().length < 3) {
      errorMessages.userName = "En az 3 karakterden oluşan bir isim giriniz";
    }

    if (!data.pizzaSize) {
      errorMessages.pizzaSize = "Boyut seçiniz";
    }

    if (!data.doughSize) {
      errorMessages.doughSize = "Hamur seçiniz";
    }

    if (data.ingredients.length < 4 || data.ingredients.length > 10) {
      errorMessages.ingredients = "Lütfen en az 4, en fazla 10 malzeme seçiniz";
    }

    return errorMessages;
  }

  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  return (
    <>
      <header className="header-orderform">
        <div className="header-inner">
          <img
            data-cy="logo"
            src="images/iteration-1-images/logo.svg"
            alt="logo"
          />
          <nav className="header-navmenu">
            <a href="/" data-cy="nav-home">
              Anasayfa
            </a>
            <span> - </span>
            <span>Sipariş Oluştur</span>
          </nav>
        </div>
      </header>

      <main>
        <div className="content-wrapper">
          <div className="priced-text">
            <p>Position Absolute Acı Pizza</p>
            <div className="priced-info">
              <p>4.9</p>
              <p>(200)</p>
              <p>85.50₺</p>
            </div>
          </div>
          <div className="product-description">
            <p>
              Frontent Dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen
              pizzetta denir.
            </p>
          </div>
        </div>

        <Form className="order-form" onSubmit={handleSubmit}>
          <FormGroup className="pizza-size-dough-wrapper">
            <FormGroup tag="fieldset">
              <legend>Boyut Seç</legend>
              <FormGroup check>
                <Input
                  data-cy="size-kucuk"
                  name="pizzaSize"
                  type="radio"
                  value="kucuk"
                  id="kucuk"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "kucuk"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label for="kucuk" check>
                  Küçük
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  data-cy="size-orta"
                  name="pizzaSize"
                  type="radio"
                  value="orta"
                  id="orta"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "orta"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label for="orta" check>
                  Orta
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  data-cy="size-buyuk"
                  name="pizzaSize"
                  type="radio"
                  value="buyuk"
                  id="buyuk"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "buyuk"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label for="buyuk" check>
                  Büyük
                </Label>
              </FormGroup>
              {errors.pizzaSize && (
                <FormFeedback data-cy="error-size" className="form-error">
                  {errors.pizzaSize}
                </FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="doughSize">Hamur Seç</Label>
              <Input
                data-cy="dough-select"
                id="doughSize"
                name="doughSize"
                type="select"
                value={formData.doughSize}
                onChange={handleChange}
                invalid={!!errors.doughSize}
              >
                <option value="">Hamur Kalınlığı</option>
                <option value="kalın">Kalın</option>
                <option value="ince">İnce</option>
              </Input>
              {errors.doughSize && (
                <FormFeedback data-cy="error-dough" className="form-error">
                  {errors.doughSize}
                </FormFeedback>
              )}
            </FormGroup>
          </FormGroup>

          <div className="ingredients-uppertext-wrapper">
            <h4>Ek Malzemeler</h4>
            <p>En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</p>
          </div>

          <FormGroup
            className="ingredients-wrapper"
            data-cy="ingredients-group"
          >
            {ingredients.map((item) => (
              <FormGroup check key={item.value}>
                <Input
                  data-cy={`ingredient-${item.value}`}
                  type="checkbox"
                  name="ingredients"
                  value={item.value}
                  id={item.value}
                  onChange={handleIngredients}
                  checked={formData.ingredients.includes(item.value)}
                />
                <Label check htmlFor={item.value}>
                  {item.label}
                </Label>
              </FormGroup>
            ))}

            {errors.ingredients && (
              <FormFeedback data-cy="error-ingredients" className="form-error">
                {errors.ingredients}
              </FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="userName">İsim</Label>
            <Input
              data-cy="username-input"
              id="userName"
              name="userName"
              placeholder="İsminizi giriniz"
              type="text"
              onChange={handleChange}
              value={formData.userName}
              invalid={!!errors.userName}
            />
            <FormFeedback className="form-error" data-cy="error-username">
              {errors.userName}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="order-note-group" row>
            <Label for="orderNote" sm={2}>
              Sipariş Notu
            </Label>
            <Col sm={10}>
              <Input
                data-cy="order-note"
                id="orderNote"
                name="orderNote"
                type="textarea"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
                value={formData.orderNote}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>

          <div className="divider-line" />

          <FormGroup>
            <div className="checkoutWrapper">
              <div className="quantityWrapper">
                <Button
                  data-cy="decrease-button"
                  type="button"
                  color="warning"
                  size="lg"
                  onClick={decrease}
                >
                  -
                </Button>
                <Input
                  className="quantity-input"
                  type="number"
                  value={formData.quantity}
                  onChange={handleQuantityChange}
                  min="1"
                ></Input>
                <Button
                  data-cy="increase-button"
                  type="button"
                  color="warning"
                  size="lg"
                  onClick={increase}
                >
                  +
                </Button>
              </div>
              <div className="totalPriceWrapper">
                <h4 className="topTPW">Sipariş Toplamı</h4>
                <div className="midTPW">
                  <p>Seçimler</p>
                  <p>{ingredientsPrice * formData.quantity}</p>
                </div>
                <div className="bottomTPW">
                  <p>Toplam</p>
                  <p>{totalPrice}</p>
                </div>
                <Button
                  data-cy="submit-button"
                  className="submit-button"
                  type="submit"
                  color="warning"
                  disabled={!isValid}
                  block
                >
                  SİPARİŞ VER
                </Button>
              </div>
            </div>
          </FormGroup>
        </Form>
      </main>
    </>
  );
}

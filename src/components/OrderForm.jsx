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

export default function OrderForm() {

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
    const response = await axios.post("https://reqres.in/api/pizza", payload, {
      headers: {
        "x-api-key": "reqres_18bda22631d9441a9d24ab6a24735154", // 401 hatasından dolayı kendi api key'imi alıp kullanmak zorunda kaldım
      },
    });

    console.log("Sipariş özeti: ", response.data);

    history.push("/success");
  } catch (err) {
      console.log(err);
  }}

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
          <img src="images/iteration-1-images/logo.svg" alt="logo" />
          <nav className="header-navmenu">
            <a href="/">Anasayfa</a>
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
                  name="pizzaSize"
                  type="radio"
                  value="kucuk"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "kucuk"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label check>Küçük</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="pizzaSize"
                  type="radio"
                  value="orta"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "orta"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label check>Orta</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="pizzaSize"
                  type="radio"
                  value="buyuk"
                  onChange={handleChange}
                  checked={formData.pizzaSize === "buyuk"}
                  invalid={!!errors.pizzaSize}
                />{" "}
                <Label check>Büyük</Label>
              </FormGroup>
              {errors.pizzaSize && (
                <FormFeedback className="form-error">
                  {errors.pizzaSize}
                </FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="doughSize">Hamur Seç</Label>
              <Input
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
                <FormFeedback className="form-error">
                  {errors.doughSize}
                </FormFeedback>
              )}
            </FormGroup>
          </FormGroup>

          <div className="ingredients-uppertext-wrapper">
            <h4>Ek Malzemeler</h4>
            <p>En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</p>
          </div>

          <FormGroup className="ingredients-wrapper">
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="pepperoni"
                id="pepperoni"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("pepperoni")}
              />
              <Label check for="pepperoni">
                Pepperoni
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="sosis"
                id="sosis"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("sosis")}
              />
              <Label check for="sosis">
                Sosis
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="jambon"
                id="jambon"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("jambon")}
              />
              <Label check for="jambon">
                Kanada Jambonu
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="tavuk"
                id="tavuk"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("tavuk")}
              />
              <Label check for="tavuk">
                Tavuk Izgara
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="sogan"
                id="sogan"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("sogan")}
              />
              <Label check for="sogan">
                Soğan
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="domates"
                id="domates"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("domates")}
              />
              <Label check for="domates">
                Domates
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="mısır"
                id="mısır"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("mısır")}
              />
              <Label check for="mısır">
                Mısır
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="sucuk"
                id="sucuk"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("sucuk")}
              />
              <Label check for="sucuk">
                Sucuk
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="jalepeno"
                id="jalepeno"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("jalepeno")}
              />
              <Label check for="jalepeno">
                Jalepeno
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="sarımsak"
                id="sarımsak"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("sarımsak")}
              />
              <Label check for="sarımsak">
                Sarımsak
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="biber"
                id="biber"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("biber")}
              />
              <Label check for="biber">
                Biber
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="salam"
                id="salam"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("salam")}
              />
              <Label check for="salam">
                Salam
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="ananas"
                id="ananas"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("ananas")}
              />
              <Label check for="ananas">
                Ananas
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="ingredients"
                value="kabak"
                id="kabak"
                onChange={handleIngredients}
                checked={formData.ingredients.includes("kabak")}
              />
              <Label check for="kabak">
                Kabak
              </Label>
            </FormGroup>
            {errors.ingredients && (
              <FormFeedback className="form-error">
                {errors.ingredients}
              </FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="userName">İsim</Label>
            <Input
              id="userName"
              name="userName"
              placeholder="İsminizi giriniz"
              type="text"
              onChange={handleChange}
              value={formData.userName}
              invalid={!!errors.userName}
            />
            <FormFeedback className="form-error">{errors.userName}</FormFeedback>
          </FormGroup>

          <FormGroup className="order-note-group" row>
            <Label for="orderNote" sm={2}>
              Sipariş Notu
            </Label>
            <Col sm={10}>
              <Input
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
                <Button className="submit-button" type="submit" color="warning" disabled={!isValid} block>
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

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import creditcardutils from "creditcardutils";
import luhn from "fast-luhn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardType: "",
      cardNumber: "",
      cardValid: 0,
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
      focus: "",
      valid: 0
    };
    this.re = /^[0-9\b]+$/;
  }

  cardChange = e => {
    let card = e.target.value.replace(/ /g, "");
    if (card.length > 16 || !(card === "" || this.re.test(card))) return false;
    let cardType = "";
    let cardValid = false;
    if (card[0] === "4") {
      cardType = "Visa";
      if (card.length >= 13 && card.length <= 16) cardValid = true;
    } else if (card[0] === "5") {
      cardType = "Mastercard";
      if (card.length === 16) cardValid = true;
    } else if (card[0] === "3") {
      if (card.length > 1) {
        if (card.length > 15) return false;
        if (card[1] === "4" || card[1] === "7") {
          cardType = "American Express";
          if (card.length === 15) cardValid = true;
        } else {
          cardType = "?";
          cardValid = false;
        }
      } else {
        cardType = "American Express";
        cardValid = false;
      }
    } else {
      card.length ? (cardType = "?") : (cardType = "");
    }
    card = creditcardutils.formatCardNumber(card);
    if (cardValid) {
      let check = luhn(card.replace(/ /g, ""));
      //let check = creditcardutils.validateCardNumber(card);
      check ? (check = 1) : (check = 2);
      this.setState({
        valid: check,
        cardType: cardType,
        cardNumber: card,
        cardValid: cardValid,
        focus: "number"
      });
    } else
      this.setState({
        cardType: cardType,
        cardNumber: card,
        cardValid: cardValid,
        focus: "number",
        valid: 0
      });
  };

  expireKeyDown = e => {
    if (!this.re.test(e.key) && e.which !== 8) return false;
    else if (
      e.which === 8 &&
      this.state.cardExpiry.length === 3 &&
      this.state.cardExpiry[2] === "/"
    )
      this.setState({ cardExpiry: this.state.cardExpiry.replace("/", "") });
  };

  expireChange = e => {
    let expire = e.target.value;
    if (
      expire.length > 5 ||
      !(e.target.value === "" || this.re.test(e.target.value.replace("/", "")))
    )
      return false;

    if (expire.length === 2) {
      if (expire.indexOf("/") === -1) {
        expire += "/";
      }
    }
    this.setState({
      cardExpiry: expire,
      focus: "expiry",
      valid: 0
    });
  };

  cvvChange = e => {
    let cvv = e.target.value;
    if (
      e.target.value.length >= 4 ||
      !(e.target.value === "" || this.re.test(e.target.value))
    )
      return false;
    this.setState({
      cardCvv: cvv,
      focus: "cvc",
      valid: 0
    });
  };

  nameChange = e => {
    this.setState({
      cardName: e.target.value,
      focus: "name",
      valid: 0
    });
  };

  luhnValidate = e => {
    if (this.state.cardValid) {
      let check = luhn(this.state.cardNumber.replace(/ /g, ""));
      check ? (check = 1) : (check = 2);
      this.setState({
        valid: check
      });
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="page-header">
            <h1>Order now</h1>
          </div>

          <div className="panel">
            <div className="panel-body">
              <Cards
                number={this.state.cardNumber}
                name={this.state.cardName}
                expiry={this.state.cardExpiry}
                cvc={this.state.cardCvv}
                focused={this.state.focus}
              />
              <br />
              <form>
                <div className="form-group">
                  <label>Credit card number:</label>
                  <div className="input-group">
                    <input
                      onChange={this.cardChange}
                      type="text"
                      className="form-control"
                      id="card"
                      value={this.state.cardNumber}
                    />
                    <div className="input-group-addon" id="type">
                      {this.state.valid !== 2 ? (
                        this.state.cardType
                      ) : (
                        <span>
                          <span className="glyphicon glyphicon-remove text-danger" />
                          &nbsp;
                          <span>Invalid</span>
                        </span>
                      )}
                      &nbsp;
                      {this.state.cardValid && this.state.valid !== 2 ? (
                        <span className="glyphicon glyphicon-ok text-success" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Name on card:</label>
                  <input
                    value={this.state.cardName}
                    onChange={this.nameChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="clearfix">
                  <div className="form-group form-group-mini">
                    <label>Expiry date:</label>
                    <input
                      value={this.state.cardExpiry}
                      onChange={this.expireChange}
                      onKeyDown={this.expireKeyDown}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group form-group-mini">
                    <label>CVV:</label>
                    <input
                      value={this.state.cardCvv}
                      onChange={this.cvvChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <br />
                <p>
                  <button
                    onClick={this.luhnValidate}
                    className="btn btn-primary"
                  >
                    Validate using Luhn Algorithm
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

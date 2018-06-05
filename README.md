# Front-end Developer Test

> This is a Front-end Developer Test of **www.mashupgarage.com**
> to validate credit cards (manually & automatically) made in **React** `create-react-app`

[Demo](https://sl1mpshady.github.io/devtest/index.html)

### Install

```
npm install
```

### Author

**Siegfred Pagador** [sl1mpshady](https://github.com/sl1mpshady)

### Built with

* [React](https://reactjs.org/)
* [react-credit-cards](https://github.com/amarofashion/react-credit-cards) for the credit card component

  ```jsx
  import Cards from 'react-credit-cards';
  ...

  <Cards
     number={input.number.value}
     name={input.name.value}
     expiry={input.expiry.value}
     cvc={input.cvc.value}
     focused={state.focused}
   />
  ```

* [creditcardutils](https://www.npmjs.com/package/creditcardutils) for the formatting

  ````jsx
  import creditcardutils from "creditcardutils";
  ...

  creditcardutils.formatCardNumber(cardNumber);```
  ````

- [fast-luhn](https://www.npmjs.com/package/fast-luhn) for the validation

  ````jsx
  import creditcardutils from "creditcardutils";
  ...

  luhn(cardNumber); ```
  ````

### [Problem](https://github.com/rstacruz/frontend-exercises/tree/master/order-form)

![Loading...](http://cdn.rawgit.com/rstacruz/frontend-exercises/2235733d/order-form/validation.gif)

**[Download template ▸](https://github.com/rstacruz/frontend-exercises/tree/master/order-form/index.html)**

---

## Credit card validation

## The problem

Our shopping website has customers abandoning their purchase in the order form.
Our research shows that they drop out because they make typos in their credit
card numbers. We can do something about this.

## Solution

Implement validation for the credit card number to catch our users mistakes, and
provide them helpful feedback.

* It should tell me the credit card type (Mastercard / Visa / American Express)
  as soon as it knows it.
* It should show a green check mark as soon as the valid.
* If the card type isn't known, show a question mark.

## Your mission

* Get [index.html](index.html) and work on it in your machine.
* Use whatever tool or library you want. (jQuery, Angular, Backbone, etc)
* Keep the code clean and reviewable.
* When you're done, upload it somewhere where it can be viewable by the world.
* Have fun!

## How?

* _Visa_ cards start with `4`.
* _Mastercard_ cards start with `5`.
* _American Express_ cards start with `3`. The 2nd digit is either `4` or `7`.

Also:

* _Visa_ cards are valid if they have 13 to 16 digits.
* _Mastercard_ cards are valid if it has 16 digits.
* _American Express_ cards are valid if it has 15 digits.

---

## Bonus round

There's a published algorithm used to check the validity of credit card numbers.
Find out what it is and implement it.

Also, show an `✕ Invalid` message for credit card numbers that match the correct
length of digits, but fails validation.

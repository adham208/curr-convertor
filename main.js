const addCurrencyBtn = document.querySelector(".add-currency-btn");
const addCurrencyList = document.querySelector(".add-currency-list");
const currenciesList = document.querySelector(".currencies");

const dataURL = "https://api.exchangeratesapi.io/latest";



const initiallyDisplayedCurrencies = ["USD","EUR","GPB","EGP"];
let baseCurrency;
let baseCurrencyAmount;

let currencies = [
  {
    name:"US Dollar",
    abbreviation:"USD",
    symbol:"$",
    flagURL:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png"
  },
  {
    name:"Euro",
    abbreviation:"EUR",
    symbol:"€",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/125px-Flag_of_Europe.svg.png"
  },
  {
    name:"English Pound",
    abbreviation:"GBP",
    symbol:"\u00A3",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/130px-Flag_of_England.svg.png"
  },
  {
    name:"Egyptian Pound",
    abbreviation:"EGP",
    symbol:"\u00A3",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/125px-Flag_of_Egypt.svg.png"
  },
  {
    name:"Canadian Dollar",
    abbreviation:"CAD",
    symbol:"\u0024",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png"
  },
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/125px-Flag_of_Turkey.svg.png"
  },
  {
    name: "Argentine Peso",
    abbreviation: "ARS",
    symbol:"\u20B1",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png"
  },
  {
    name: "Argentine Peso",
    abbreviation: "ARS",
    symbol:"\u20B1",
    flagURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png"
  },
  {
    name: "Danish Krone",
    abbreviation: "DKK",
    symbol: "\u006B\u0072",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/125px-Flag_of_Russia.svg.png"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png"
  },
  {
    name: "Swiss Franc",
    abbreviation: "CHF",
    symbol: "\u0043\u0048\u0046",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/95px-Flag_of_Switzerland.svg.png"
  },
  {
    name: "South Korean Won",
    abbreviation: "KRW",
    symbol: "\u20A9",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png"
  },
  {
    name: "Indian Rupee",
    abbreviation: "INR",
    symbol: "\u20B9",
    flagURL: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/125px-Flag_of_India.svg.png"
  },
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png"
  },
  {
    name: "Brazilian Real",
    abbreviation: "BRL",
    symbol: "\u0052\u0024",
    flagURL: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png"
  },
  {
   name: "New Zealand Dollar",
   abbreviation: "NZD",
   symbol: "\u0024",
   flagURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/125px-Flag_of_New_Zealand.svg.png"
 },

]
addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

function addCurrencyBtnClick(event) {
  addCurrencyBtn.classList.toggle("open");
}

addCurrencyList.addEventListener("click", addCurrencyListClick);

function addCurrencyListClick(event) {
  const clickedListItem = event.target.closest("li");
  if(!clickedListItem.classList.contains("disabled")) {
    const newCurrency = currencies.find(c => c.abbreviation===clickedListItem.getAttribute("data-currency"));
    if(newCurrency) newCurrenciesListItem(newCurrency);
  }
}

currenciesList.addEventListener("click", currenciesListClick);

function currenciesListClick(event) {
  if(event.target.classList.contains("close")) {
    const parentNode = event.target.parentNode;
    parentNode.remove();
    addCurrencyList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove("disabled");
    if(parentNode.classList.contains("base-currency")) {
      const newBaseCurrencyLI = currenciesList.querySelector(".currency");
      if(newBaseCurrencyLI) {
        setNewBaseCurrency(newBaseCurrencyLI);
        baseCurrencyAmount = Number(newBaseCurrencyLI.querySelector(".input input").value);
      }
    }
  }
}

function setNewBaseCurrency(newBaseCurrencyLI) {
  newBaseCurrencyLI.classList.add("base-currency");
  baseCurrency = newBaseCurrencyLI.id;
  const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
  currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
    const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
    const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
    currencyLI.querySelector(".base-currency-rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
  });
}

currenciesList.addEventListener("input", currenciesListInputChange);

function currenciesListInputChange(event) {
  const isNewBaseCurrency = event.target.closest("li").id!==baseCurrency;
  if(isNewBaseCurrency) {
    currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
    setNewBaseCurrency(event.target.closest("li"));
  }
  const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
  if(baseCurrencyAmount!==newBaseCurrencyAmount || isNewBaseCurrency) {
    baseCurrencyAmount = newBaseCurrencyAmount;
    const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
    currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
      if(currencyLI.id!==baseCurrency) {
        const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
        const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
        currencyLI.querySelector(".input input").value = exchangeRate*baseCurrencyAmount!==0 ? (exchangeRate*baseCurrencyAmount).toFixed(4) : "";
      }
    });
  }
}

currenciesList.addEventListener("focusout", currenciesListFocusOut);

function currenciesListFocusOut(event) {
  const inputValue = event.target.value;
  if(isNaN(inputValue) || Number(inputValue)===0) event.target.value="";
  else event.target.value = Number(inputValue).toFixed(4);
}

currenciesList.addEventListener("keydown", currenciesListKeyDown);

function currenciesListKeyDown(event) {
  if(event.key==="Enter") event.target.blur();
}

// Auxiliary Functions

function populateAddCyrrencyList() {
  for(let i=0; i<currencies.length; i++) {
    addCurrencyList.insertAdjacentHTML(
      "beforeend",
      `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
      </li>`
    );
  }
}

function populateCurrenciesList() {
  for(let i=0; i<initiallyDisplayedCurrencies.length; i++) {
    const currency = currencies.find(c => c.abbreviation===initiallyDisplayedCurrencies[i]);
    if(currency) newCurrenciesListItem(currency);
  }
}

function newCurrenciesListItem(currency) {
  if(currenciesList.childElementCount===0) {
    baseCurrency = currency.abbreviation;
    baseCurrencyAmount = 0;
  }
  addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}]`).classList.add("disabled");
  const baseCurrencyRate = currencies.find(c => c.abbreviation===baseCurrency).rate;
  const exchangeRate = currency.abbreviation===baseCurrency ? 1 : (currency.rate/baseCurrencyRate).toFixed(4);
  const inputValue = baseCurrencyAmount ? (baseCurrencyAmount*exchangeRate).toFixed(4) : "";

  currenciesList.insertAdjacentHTML(
    "beforeend",
    `<li class="currency ${currency.abbreviation===baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="info">
        <p class="input"><span class="currency-symbol">${currency.symbol}</span><input placeholder="0.0000" value=${inputValue}></p>
        <p class="currency-name">${currency.abbreviation} - ${currency.name}</p>
        <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <span class="close">&times;</span>
    </li>`
  );
}

fetch(dataURL)
  .then(res => res.json())
  .then(data => {
    document.querySelector(".date").textContent = data.date;
    data.rates["EUR"] = 1;
    currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
    currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
    populateAddCyrrencyList();
    populateCurrenciesList();
  })
  .catch(err => console.log(err));

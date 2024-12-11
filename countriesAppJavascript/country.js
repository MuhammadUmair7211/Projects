const countryName = new URLSearchParams(window.location.search).get("name");
let flagImage = document.querySelector("#flag-image");
let countryList = document.querySelector("#country-name");
let nativeName = document.querySelector("#native-name");
let population = document.querySelector("#population");
let region = document.querySelector("#region");
let subRegion = document.querySelector("#sub-region");
let capital = document.querySelector("#capital");
let domain = document.querySelector("#domain");
let currency = document.querySelector("#currency");
let languages = document.querySelector("#languages");
let symbol = document.querySelector("#symbol");
let goBack = document.getElementById("go-back");
let mode = document.getElementById("mode");
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
let borderCountries = document.querySelector(".border-countries");
goBack.addEventListener("click", () => {
  window.history.back();
});
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImage.src = country.flags.svg;
    countryList.innerHTML = country.name.common;
    nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    population.innerHTML = country.population.toLocaleString();
    region.innerHTML = country.region;
    subRegion.innerHTML = country.subregion;
    capital.innerHTML = country?.capital[0];
    domain.innerHTML = country.tld.join(", ");
    currency.innerHTML = Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
    symbol.innerHTML = Object.values(country.currencies)[0].symbol;
    languages.innerHTML = Object.values(country.languages);

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => {
            console.log(data.name.common);
            const countryTag = document.createElement("a");
            countryTag.href = `/country.html?name=${data.name.common}`;
            countryTag.classList.add(
              "shadow",
              "text-decoration-none",
              "px-2",
              "py-2",
              "text-dark"
            );
            countryTag.innerHTML = data.name.common;
            borderCountries.appendChild(countryTag);
          });
      });
    }
  });

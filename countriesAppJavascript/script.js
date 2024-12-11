let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    data.forEach((country) => {
      let anchor = document.createElement("a");
      anchor.classList.add("text-decoration-none");
      anchor.href = `/country.html?name=${country.name.common}`;
      anchor.innerHTML = `
      <div class="container">
      <div class="row">
      <div className="col-md-4 col-lg-3">
      <div class="card shadow mb-4">
                <img src= "${country.flags.svg}" class="img-fluid" alt="">
                <div class="card-body">
                    <div class="card-title">
                        <h2 class="mt-3">${country.name.common}</h2>
                    </div>
                    <div class="card-text">
                        <p class="m-0 mt-3"><b>Population:</b> ${country.population.toLocaleString()}</p>
                        <p class="m-0 mt-2"><b>Region:</b> ${country.region}</p>
                        <p class="m-0 mt-2"><b>Capital:</b> ${
                          country.capital
                        }</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
      </div>
      `;
      let countriesList = document.querySelector(".countries-container");
      countriesList.appendChild(anchor);
    });
  });

let searchInput = document.querySelector(".input-container input");
searchInput.addEventListener("input", (e) => {
  const allFilteredCountry = allCountriesData.filter((countryData) =>
    countryData.name.common.includes(e.target.value)
  );
  console.log(allFilteredCountry);
});

let formSelect = document.querySelector(".form-select");
formSelect.addEventListener("change", (e) => {
  let countriesList = document.querySelector(".countries-container");
  fetch(`https://restcountries.com/v3.1/region/${formSelect.value}`)
    .then((res) => res.json())
    .then((data) => {
      countriesList.innerHTML = "";
      data.forEach((country) => {
        let anchor = document.createElement("a");
        anchor.classList.add("text-decoration-none");
        anchor.href = `/country.html?name=${country.name.common}`;
        anchor.innerHTML = `
      <div class="container">
      <div class="row">
      <div className="col-md-4 col-lg-3">
      <div class="card shadow mb-4">
                <img src= "${country.flags.svg}" class="img-fluid" alt="">
                <div class="card-body">
                    <div class="card-title">
                        <h2 class="mt-3">${country.name.common}</h2>
                    </div>
                    <div class="card-text">
                        <p class="m-0 mt-3"><b>Population:</b> ${country.population.toLocaleString()}</p>
                        <p class="m-0 mt-2"><b>Region:</b> ${country.region}</p>
                        <p class="m-0 mt-2"><b>Capital:</b> ${
                          country.capital
                        }</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
      </div>
      `;
        countriesList.appendChild(anchor);
      });
    });
});
let modeText = document.getElementById("mode-text");
let mode = document.getElementById("mode");
let icon = document.getElementById("icon");
console.log(icon);
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    modeText.innerHTML = "Light Mode";
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
  } else {
    modeText.innerHTML = "Dark Mode";
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun");
  }
});

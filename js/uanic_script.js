country_list = [
  { cz: "CZECHIA" },
  { ee: "ESTONIA" },
  { lv: "LATVIA" },
  { lt: "LITHUANIA" },
  { nl: "NETHERLANDS" },
  { pl: "POLAND" },
  { sk: "SLOVAKIA" },
  { ua: "UKRAINE" },
  { uk: "UNITED KINGDOM" },
  { us: "UNITED STATES" },
];
country_select = document.getElementById("country");

country_list.forEach((country) => {
  var opt = document.createElement("option");
  opt_value = Object.keys(country)[0];
  opt_text = Object.values(country)[0];
  opt.value = opt_value;
  opt.innerHTML = opt_text;
  if (opt_value == "ua") {
    opt.selected = true;
  }
  country_select.appendChild(opt);
});

function uanicSubmit() {
  formElem = document.querySelector("#uanic_form");
  formElem = addEventListener("submit", function (event) {
    event.preventDefault();
  });
  formDataLang = document.getElementById("datalang");
  formDataLangValue = formDataLang.value;
  formSurname = document.getElementById("surname");
  formSurnameValue = formSurname.value;
  formName = document.getElementById("name");
  formNameValue = formName.value;
  if (formDataLangValue == "uk") {
    if (
      formSurnameValue.match("^[А-ЯҐЄІЇ][а-яґєії'-]*[А-ЯҐЄІЇ]?[а-яґєії'-]*[а-яґєії]+$") &&
      formNameValue.match("^[А-ЯҐЄІЇ][а-яґєії'-]*[А-ЯҐЄІЇ]?[а-яґєії'-]*[а-яґєії]+$")
    )
      alert("Дані валідні");
    else alert("Введіть дані тією мовою, яку Ви обрали!");
  } else {
    if (
      formSurnameValue.match("^[A-Z][a-z]*$") &&
      formNameValue.match("^[A-Z][a-z]*$")
    )
      alert("The data are valid");
    else alert("Please enter the data in the language you have chosen!");
  }
}

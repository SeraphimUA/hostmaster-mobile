function translit_func() {
  const translitElem = document.getElementById("untranslit_text");
  const translitResult = document.getElementById("translit_result");
  let formElem = document.querySelector("#translit_form");
  formElem = addEventListener("submit", function (event) {
    event.preventDefault();
  });

  let kabminTranslitResult = "";
  let ukrLatinResult = "";

  if (translitElem) {
    let translitText = translitElem.value;

    for (let i = 0; i < translitText.length; i++) {
      if (translitText[i] == "г") {
        if (kabminTranslitResult.slice(-1) == "z")
          kabminTranslitResult = kabminTranslitResult.concat(
            kabminTranslit[translitText[i]][1]
          );
        else kabminTranslitResult.concat(kabminTranslit[translitText[i]][0]);
      } else if (translitText[i] == "'" || translitText[i] == "ь")
        kabminTranslitResult = kabminTranslitResult.concat("");
      else
        kabminTranslitResult = kabminTranslitResult.concat(
          kabminTranslit[translitText[i]]
        );

      
    }

    const resultLabel = document.createElement("p");
    resultLabel.innerText = "Результати";
    translitResult.appendChild(resultLabel);

    const resultTable = document.createElement("ul");
    resultTable.classList.add("list-group", "list-group-flush");

    const kabminTranslitElem = document.createElement("li");
    kabminTranslitElem.classList.add("list-group-item");
    kabminTranslitElem.innerText = kabminTranslitResult;
    resultTable.appendChild(kabminTranslitElem);

    translitResult.appendChild(resultTable);
  }
}

function whois_domain_func() {
  domainElem = document.getElementById("whois_domain");
  whoisResult = document.getElementById("new_whois_result");
  domain = "";
  if (domainElem) {
    domain = domainElem.value;
    console.log(domain);
    url = "https://www.hostmaster.ua/whois/whois.php?_domain_=" + domain;
    whois_request = new Request(url);
    fetch(whois_request)
      .then((response) => {
        return response.text();
      })
      .then((page) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(page, "text/html");
        result = doc.getElementById("whois_result");
        console.log(result);
        table_code = document.createElement("pre");
        table_code.appendChild(result);
        if (whoisResult.hasChildNodes()) {
          whoisResult.removeChild(document.querySelector("pre"));
        }
        whoisResult.appendChild(table_code);
        images = table_code.querySelectorAll("img");
        console.log(images);
      });
  }
}

function whois_nichandle_func() {
  uanicElem = document.getElementById("whois_nichandle");
  whoisResult = document.getElementById("new_whois_result");
  domain = "";
  if (uanicElem) {
    uanic = domainElem.value;
    console.log(uanic);
    url = "https://www.hostmaster.ua/whois/whois.php?_nichandle_=" + uanic;
    whois_request = new Request(url);
    fetch(whois_request)
      .then((response) => {
        return response.text();
      })
      .then((page) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(page, "text/html");
        result = doc.getElementById("whois_result");
        console.log(result);
        table_code = document.createElement("pre");
        table_code.appendChild(result);
        if (whoisResult.hasChildNodes()) {
          whoisResult.removeChild(document.querySelector("pre"));
        }
        whoisResult.appendChild(table_code);
        images = table_code.querySelectorAll("img");
        console.log(images);
      });
  }
}

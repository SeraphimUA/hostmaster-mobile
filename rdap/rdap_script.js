function rdap_domain_func() {
  formElem = document.querySelector("#rdap_form");
  formElem = addEventListener("submit", function (event) {
    event.preventDefault();
  });
  domainElem = document.getElementById("rdap_domain");
  rdapResult = document.getElementById("rdap_result");
  domain = "";
  if (domainElem) {
    domain = domainElem.value;
    url = `https://rdap.hostmaster.ua/domain/${domain}`;
    rdap_request = new Request(url);
    fetch(rdap_request)
      .then((response) => {
        return response.json();
      })
      .then((rdap_json) => {
        console.log(rdap_json);
        result_code = document.createElement("pre");
        result_code.innerHTML += `domain: ${rdap_json["handle"]}\n`;

        if (rdap_json["ua_license"]) {
          result_code.innerHTML += `license: ${rdap_json["ua_license"]}\n`;
        }

        result_code.innerHTML += `domain: ${rdap_json["entities"][0]["handle"]}\n`;

        nameservers = rdap_json["nameservers"];
        nameservers.forEach((ns) => {
          result_code.innerHTML += `domain: ${ns["ldhName"]}\n`;
        });

        if (rdap_json["secureDNS"]["dsData"]) {
          dsdata_object = rdap_json["secureDNS"]["dsData"][0];
          dsdata = `${dsdata_object["keyTag"]} ${dsdata_object["algorithm"]} ${dsdata_object["digestType"]} ${dsdata_object["digest"]}`;
          result_code.innerHTML += `ds-rdata: ${dsdata}\n`;
        }

        result_code.innerHTML += `status: ${rdap_json["status"]}\n`;

        events = rdap_json["events"];

        created_time = new Date(events[0]["eventDate"]);
        timezone = created_time.getTimezoneOffset() / -60;
        created_time_text = `${created_time.getFullYear()}-${String(
          created_time.getMonth() + 1
        ).padStart(2, "0")}-${String(created_time.getDay()).padStart(
          2,
          "0"
        )} ${created_time.getHours()}:${created_time.getMinutes()}:${created_time.getSeconds()}${
          timezone >= 0 ? "+" : "-"
        }${String(timezone).padStart(2, "0")}`;
        result_code.innerHTML += `modified: ${created_time_text}\n`;

        modified_time = new Date(events[1]["eventDate"]);
        timezone = modified_time.getTimezoneOffset() / -60;
        modified_time_text = `${modified_time.getFullYear()}-${String(
          modified_time.getMonth() + 1
        ).padStart(2, "0")}-${String(modified_time.getDay()).padStart(
          2,
          "0"
        )} ${modified_time.getHours()}:${modified_time.getMinutes()}:${modified_time.getSeconds()}${
          timezone >= 0 ? "+" : "-"
        }${String(timezone).padStart(2, "0")}`;
        result_code.innerHTML += `modified: ${modified_time_text}\n`;

        expires_value = document.createElement("p");
        expires_time = new Date(events[2]["eventDate"]);
        timezone = expires_time.getTimezoneOffset() / -60;
        expires_time_text = `${expires_time.getFullYear()}-${String(
          expires_time.getMonth() + 1
        ).padStart(2, "0")}-${String(expires_time.getDay()).padStart(
          2,
          "0"
        )} ${expires_time.getHours()}:${expires_time.getMinutes()}:${expires_time.getSeconds()}${
          timezone >= 0 ? "+" : "-"
        }${String(timezone).padStart(2, "0")}`;
        result_code.innerHTML += `expires: ${expires_time_text}\n`;

        if (rdapResult.hasChildNodes()) {
          rdapResult.removeChild(document.querySelector("pre"));
        }
        rdapResult.appendChild(result_code);
      }).catch((err) => {
        console.log(err);
      })
  }
}

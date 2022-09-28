const newsSector = document.getElementById("news-sector");
console.dir(newsSector);

fetch("https://api.hostmaster.ua/news.api/")
  .then((result) => result.json())
  .then((output) => {
    let news = output["news"];
    console.log(news);
    news.forEach((oneNews) => {
      const newsCard = document.createElement("article");
      newsCard.classList.add("news");
      newsCard.classList.add("d-flex");
      newsCard.classList.add("flex-column");

      let preview = oneNews.previewua;
      preview = preview.replace(/&quot;/g, '"');
      console.log(preview);

      const newsHeader = document.createElement("header");
      newsHeader.classList.add("news__header");

      const newsTitle = document.createElement("p");
      newsTitle.textContent = oneNews["titleua"].trim();
      newsHeader.appendChild(newsTitle);

      // const newsImage = document.createElement("img");
      let srcSubstring = preview.search('src="');
      let jpgSubstring = preview.search('.jpg"');
      let imgSrc = preview.substring(srcSubstring + 5, jpgSubstring) + "_1.jpg";
      // newsImage.setAttribute("src", `https://hostmaster.ua/${imgSrc}`);
      // newsImage.setAttribute("border", "0");
      // newsImage.setAttribute("alt", "hostmaster");
      // newsHeader.appendChild(newsImage);

      newsHeader.style.backgroundImage = `url(https://hostmaster.ua${imgSrc})`;

      newsCard.appendChild(newsHeader);

      const newsSection = document.createElement("section");
      let signPlace = preview.search(">");
      const newsSectionText = document.createElement("p");
      newsSectionText.textContent = preview.substring(
        signPlace + 1,
        preview.length - 2
      );
      newsSection.appendChild(newsSectionText);
      newsCard.appendChild(newsSection);

      const newsLink = document.createElement("a");
      newsLink.classList.add("mt-auto");
      newsLink.setAttribute("href", `?news=${oneNews.nidu}`);
      newsLink.textContent = "Докладніше";
      newsCard.appendChild(newsLink);
      newsSector.appendChild(newsCard);
    });
  })
  .catch((err) => console.error(err));

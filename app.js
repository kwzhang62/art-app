const artApp = {};

artApp.apiKey = 'bl2e7N9w';

artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection'

artApp.getArt = function(query) {
    const url = new URL(artApp.apiUrl);
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: query,
        imgonly: true,
        ps: 12
    });
    console.log(url);

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(artFromTheApi){
            artApp.displayArt(artFromTheApi.artObjects);
        });
}

artApp.displayArt = function(artArray) {
    const ulElement = document.querySelector('#artwork');
    ulElement.innerHTML = "";

    artArray.forEach(function(artObject) {
        const imageTitle = artObject.title;
        const artImage = artObject.webImage.url;
        const artist = artObject.principalOrFirstMaker;
        const altText = artObject.longTitle;
        
        const listElement = document.createElement('li');
        listElement.classList.add('piece');
        const heading = document.createElement('h2');
        heading.textContent = imageTitle;

        const image = document.createElement('img');
        image.src = artImage;
        image.alt = altText;

        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        listElement.append(heading, image, paragraphElement)

        // const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(listElement);
    })
}

artApp.setSelectEventListener = function() {
    const select = document.querySelector('#animalChoices');
    select.addEventListener('change', function(event) {
        artApp.getArt(event.target.value);
    });
}

artApp.init = function() {
    console.log("app is initialized");
    artApp.getArt('monkeys');
    artApp.setSelectEventListener();
};

artApp.init();
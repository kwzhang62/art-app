const artApp = {};

artApp.apiKey = 'bl2e7N9w';

artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection'

artApp.getArt = function() {
    const url = new URL(artApp.apiUrl);
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: 'monkeys',
        imgonly: true
    });
    console.log(url);

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(artFromTheApi){
            console.log(artFromTheApi.artObjects);
        });
}

artApp.init = function() {
    console.log("app is initialized");
    artApp.getArt();
};

artApp.init();
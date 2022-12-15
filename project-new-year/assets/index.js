const giftgeneral = document.getElementById("gift-button");
giftgeneral.addEventListener("click", GetGift);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function GetGift(event) {
    readTextFile("data/data.json", function (text) {
        const object = JSON.parse(text);
        let rand = random(0, (object.gifts.length - 1))
        let gift = '<div class="gift-card"><div class="modal-gift" id="modal-gift"><img class="gift-img" src="' + object.gifts[rand].img + '" alt="' + object.gifts[rand].description + '"><p class="gift">Советуем тебе подарить своему близкому ' + object.gifts[rand].description + '!</p><button id="next-button" class="next-button" onclick="GetGift()">Открыть ещё!</button></div></div>'
        document.getElementById('gift').innerHTML = gift
    });
}
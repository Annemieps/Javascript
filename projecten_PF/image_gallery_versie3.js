var versie = " versie 3.0";


window.onload = function () {
    //noscript verbergen
    var eNoScript = document.getElementById('noscript');
    eNoScript.style.display = "none";

    //array geladen?
    if (typeof aModernArt == "undefined") {
        throw new Error("array aModernArt niet gevonden");
    }
    else {
        //console.log(aModernArt[0][0]);
        //versie info
        var eKop = document.querySelector('h1');
        eKop.innerHTML = eKop.innerHTML + versie;
        //plaatshouder
        var eImg = document.getElementById('plaatshouder');
        //dynamische keuzelijst met array
        var eKeuzelijst = maakKeuzeLijst(aModernArt);
        var eSidebar = document.querySelector('aside');
        eSidebar.appendChild(eKeuzelijst);
        eKeuzelijst.addEventListener("change", function (e) {
            var waarde = this.value;
            if (waarde != "" && waarde != null) {
                toonFoto(waarde, eImg);
            }
        });
    }
};

function toonFoto(nIndex, eImg) {
    aArt = aModernArt[nIndex]; //subarray
    sPad = aArt[0]; //source
    sInfo = aArt[1]; //info
    sNaam = aArt[2]; //naam

    eImg.src = "../images/art/" + sPad;
    var eInfo = document.getElementById('info');

    if (eInfo) {
        //wijzig info
        eInfo.innerHTML = sInfo;
    }
    else {
        //maak nieuwe p#info aan
        var eInfo = document.createElement('p');
        eInfo.id = "info";
        eInfo.innerHTML = sInfo;
        eImg.parentNode.insertBefore(eInfo, eImg.parentNode.firstChild);
    }
}

function maakKeuzeLijst(aImg) {
    //number images is lengte van array images
    var nArt = aImg.length;
    //element select selecteren
    var eSelect = document.createElement('select');
    //daar het id keuzelijst aan geven
    eSelect.id = "keuzelijst";
    //standaard option element
    var eOption = document.createElement('option');
    eOption.innerHTML = "Maak een keuze";
    //een lege value aan elke option mee geven
    eOption.setAttribute("value", "");
    //option aan select mee geven
    eSelect.appendChild(eOption);
    //andere option elementen met artiesten
    for (var i = 0; i < nArt; i++) {
        var eOption = document.createElement('option');
        eOption.innerHTML = aImg[i][2];
        eOption.value = i;
        eSelect.appendChild(eOption);
    }

    return eSelect;
}
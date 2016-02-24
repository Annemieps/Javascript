var versie = " versie 1.0";


window.onload = function () {
    var eKop = document.querySelector('h1');
    eKop.innerHTML = eKop.innerHTML + versie;


//    var eImg = document.getElementById('plaatshouder');
//    var eSidebar = document.querySelector('aside');
    var eLinks = document.querySelectorAll('aside a');
    console.log('sidebarLinks %s', eLinks.length);
    var eImg = document.getElementById('plaatshouder');

    //voor elke link word er aan de link een click event toegevoegd met daarin een functie die de default
    //uitvoer blokkeerd en die dan de functie Toonfoto uitvoerd met als parameters de hyperlink en foto
    for (var i = 0; i < eLinks.length; i++) {
        eLinks[i].addEventListener('click', function (e) {
            e.preventDefault();
            toonFoto(this, eImg);
        });
    }

};

function toonFoto(eLink, eImg) {
    eImg.src = eLink.href;
    var sInfo = eLink.getAttribute('title');
    var eInfo = document.getElementById('info');
    if (eInfo) {
        eInfo.innerHTML = sInfo;
    }
    else {
        var eInfo = document.createElement('p');
        eInfo.id = "info";
        eInfo.innerHTML = sInfo;
        //eImg.parentNode.appendChild(eInfo);
        eImg.parentNode.insertBefore(eInfo, eImg.parentNode.firstChild);

    }
}
// JavaScript libary

/**************** DOM functies *******************/

function leegNode(objNode) {
    /* verwijdert alle inhoud/children van een Node
     @ objNode: node, verplicht, de node die geleegd wordt
     */
    while (objNode.hasChildNodes()) {
        objNode.removeChild(objNode.firstChild);
    }
}

/**************** Datum, tijd functies *************/

//globale datum objecten
var vandaag = new Date();

function getVandaagStr() {
    //returnt een lokale datumtijdstring
    var strNu = "Momenteel: " + vandaag.toLocaleDateString() + ", ";
    strNu += vandaag.toLocaleTimeString();
    return strNu;
}
//----------datum arrays----------------------

//dagen volgens getDay() volgorde
var arrWeekdagen = new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag',
        'vrijdag', 'zaterdag');

//vervang feb dagen voor een schrikkeljaar
var arrMaanden = new Array(['januari', 31], ['februari', 28], ['maart', 31], ['april', 30],
        ['mei', 31], ['juni', 30], ['juli', 31], ['augustus', 31], ['september', 30],
        ['oktober', 31], ['november', 30], ['december', 31]);

//globale datum objecten te gebruiken in je pagina
var vandaag = new Date();
var huidigeDag = vandaag.getDate(); //dag vd maand
var huidigeWeekDag = vandaag.getDay(); //weekdag
var huidigeMaand = vandaag.getMonth();
var huidigJaar = vandaag.getFullYear();

//---------------------------------------------
function isSchrikkeljaar(jaar) {
    /* test voor schrikkeljaar
     jaar: number, verplicht
     return: boolean
     */
    eindwaarde = false;

    if (!isNaN(jaar)) {
        if (jaar % 4 === 0) {
            eindwaarde = true;
            if (jaar % 100 === 0) {
                eindwaarde = false;
                if (jaar % 400 === 0) {
                    eindwaarde = true;
                }
            }
        }
    }
    return eindwaarde;
}


/************** cookies ****************************/

function setCookie(naam, waarde, dagen) {
    /*plaatst een cookie
     
     naam: cookienaam;
     waarde: de inhoud van het cookie
     dagen: optioneel, het aantal dagen dat het cookie geldig blijft vanaf nu
     indien afwezig wordt het een session cookie
     */
    var verval = "";
    if (dagen) {
        //vandaag global bovenaan deze lib; 
        var vervalDatum = new Date(vandaag.getTime() + dagen * 24 * 60 * 60 * 1000);
        verval = vervalDatum.toUTCString();
    }
    document.cookie = naam + "=" + waarde + ";expires=" + verval;
}
//---------------------------------------------
function getCookie(naam) {
    /*leest een cookie
     
     naam: cookienaam
     */
    var zoek = naam + "=";
    if (document.cookie.length > 0) {
        var begin = document.cookie.indexOf(zoek);
        if (begin != -1) {
            begin += zoek.length;
            var einde = document.cookie.indexOf(";", begin);
            if (einde == -1) {
                einde = document.cookie.length;
            }
            return document.cookie.substring(begin, einde);
        }
    }
}
//---------------------------------------------
function clearCookie(naam) {
    /*
     verwijdert een cookie
     
     naam: cookienaam
     */
    setCookie(naam, "", -1);
}

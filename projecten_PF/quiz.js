 /******************GLOBALS ETC******************/
            //Date augmentation voor method getWeek
            Date.prototype.getWeek = function () {
                var onejan = new Date(this.getFullYear(), 0, 1);
                return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
            }


            var oQuiz = {};


            /****************** Window onload ******************/
            window.onload = function () {
                if (window.JSON) {
                    //object quiz is een parse van jsquiz
                    oQuiz = JSON.parse(jsonQuiz);
                    //console.log(oQuiz.vragen[0].vraag, oQuiz.vragen[0].antwoorden);
                    oQuiz.score = [];

                    //element quiz, appendchild resultaat van maakdfQuiz
                    var eQuiz = document.getElementById('quiz');
                    eQuiz.appendChild(maakDfQuiz());
                }
                else {

                }

            }; //einde window.onload

            //****************** Functions ******************//
            function maakDfQuiz() {
                //return documentFragment voor quiz

                //quiz structuur: DIV met IMG's en UL
                //leeg document fragement
                var dfQuiz = document.createDocumentFragment();
                //array met vragen uit json
                var aVragen = oQuiz.vragen;
                //aantal vragen
                var nVragen = aVragen.length;

                //Titel
                var dDatum = new Date(oQuiz.datum);
                var sTitel = "Quiz van week " + dDatum.getWeek(); //augmentation method
                var eTitel = document.createElement('h2');
                eTitel.appendChild(document.createTextNode(sTitel));
                dfQuiz.appendChild(eTitel);

                //de vragen
                for (var i = 0; i < nVragen; i++) {
                    // DIV als container vr elke vraag
                    // object vraag is array vragen I
                    var oVraag = aVragen[i];
                    // maak een element div in eVraagcontainer. Geef daar de class vraag aan en attribute data-index
                    var eVraagContainer = document.createElement('div');
                    eVraagContainer.setAttribute("class", "vraag");
                    eVraagContainer.setAttribute("data-index", i);
                    //id van vraagcontainer is vraag_I
                    eVraagContainer.id = "vraag_" + i;
                    
                    if(i==0){eVraagContainer.style.zIndex=10;}  
                    
                    var eVraag = document.createElement('p');
                    //maak tekstnode in objectvraag met daarin vraag
                    var sVraag = document.createTextNode(oVraag.vraag);
                    //zet de vraag in het p element 
                    eVraag.appendChild(sVraag);
                    //zet het p element in de div
                    eVraagContainer.appendChild(eVraag);

                    //eventuele images
                    if (oVraag.media) {
                        var eImage = document.createElement('img');
                        eImage.src = "../images/" + oVraag.media;
                        eVraagContainer.appendChild(eImage);
                    }


                    //Antwoorden
                    var eAntwoordenLijst = document.createElement('ul');
                    var aAntwoorden = oVraag.antwoorden;
                    var nAntwoorden = aAntwoorden.length;
                    var nCorrect = oVraag.correct;

                    //lus doorheen alle antwoorden 
                    for (var k = 0; k < nAntwoorden; k++) {
                        //eantwoord is een li
                        var eAntwoord = document.createElement('li');
                        //elink is een a
                        var eLink = document.createElement('a');
                        //elink krijgt een href en die is #
                        eLink.setAttribute("href", "#");
                        //een attribuut data-index met het cijfer
                        eLink.setAttribute("data-index", k);

                        //boolean correct, als k gelijk is aan correct
                        var bCorrect = (k == nCorrect);
                        //attribuut data-correct krijgt true of false
                        eLink.setAttribute("data-correct", bCorrect);
                        //addeventlistener click met functie (e=event) { functie evalvraag met (e en de link)}
                        eLink.addEventListener("click", function (e) {
                            evalVraag(e, this);
                        });

                        //append de textnode eAntwoorden[nr] aan eLink
                        eLink.appendChild(document.createTextNode(aAntwoorden[k]));
                        //element antwoord append de link
                        eAntwoord.appendChild(eLink);
                        //eantwoordenlijst append de li a antwoord
                        eAntwoordenLijst.appendChild(eAntwoord);
                    }
                    //de gele div append de UL van antwoorden
                    eVraagContainer.appendChild(eAntwoordenLijst);

                    //NAVBALK MET VORIGE VOLGENDE
                    eVraagContainer.appendChild(maakNav(i));

                    //Feedback
                    //maak p aan
                    var eFeedback = document.createElement('p');
                    //daaraan een class feedback toewijzen
                    eFeedback.setAttribute("class", "feedback");
                    //daar de tekstnode met de tekst uit json in
                    eFeedback.appendChild(document.createTextNode(oVraag.tekst));
                    //en de vraagcontainer de feedback laten appenden.
                    eVraagContainer.appendChild(eFeedback);

                    dfQuiz.appendChild(eVraagContainer);
                } //einde lus Vragen

                //extra container eindscore
                var eScoreContainer = document.createElement('div');
                eScoreContainer.setAttribute("class", "vraag");
                eScoreContainer.id = "score";
                dfQuiz.appendChild(eScoreContainer);


                return dfQuiz;
            }

            /***************************/
            function evalVraag(e, lienk) {
                //evalueert een quizvraag
                e.preventDefault();
                //zoek de parent Vraagcontainer van de lienk
                var eVraag = function (node) {
                    while (node.parentNode) {
                        if (node.parentNode.className == 'vraag') {
                            return node.parentNode;
                        }
                        node = node.parentNode;
                    }
                }(lienk);

                var nVraag = parseInt(eVraag.dataset["index"]);
                var nAntwoord = parseInt(lienk.dataset["index"]);
                var sCorrect = lienk.dataset["correct"];
                var bJuist = (sCorrect == "true");
                //var juist bevat: als bjuist true is dan correct anders fout
                var sJuist = bJuist ? "correct" : "fout";
                oQuiz.score[nVraag] = bJuist;
                console.log(oQuiz.score);
                //console.log(oQuiz.score);

                //element feedback is gelijk aan alle p.Feedback's binnen evraag
                var eFeedback = eVraag.querySelector("p.feedback");
                //correct is gelijk aan alle span.correct binnen efeedback
                var eCorrect = eFeedback.querySelector("span.correct");
                // resultaat is antwoord + nummer van gegeven antwoord +1 was juist/fout
                var sResultaat = "antwoord " + ++nAntwoord + " was " + sJuist;

                //als ecorrect (en dus span correct) bestaat
                if (eCorrect) {
                    eCorrect.innerHTML = sResultaat; //er was al een span 
                }
                else {
                    eFeedback.innerHTML = "<span class='correct'>" + sResultaat +
                            "</span><br>" + eFeedback.innerHTML;
                }
                eFeedback.style.display = "block";

                eindScore();
            }
            ;

            /***************************/
            function eindScore() {
                //update de tekst met eindscore in eindscorecontainer
                //@ oQuiz global

                // vragen = aantal vragen in het json object
                var nVragen = oQuiz.vragen.length;
                //aantal beantwoorde op 0
                var nBeantwoord = 0;
                //aantal juiste op 0
                var nJuist = 0;
                //element score = id score
                var eScore = document.querySelector("#score");
                //voor i=0, i< aantal scores, i+
                for (var i = 0; i < oQuiz.score.length; i++) {
                    //als het type van score[i] niet gelijk is aan undefined dan is het beantwoord
                    if (typeof (oQuiz.score[i]) != "undefined") {
                        ++nBeantwoord;
                    }
                    //als de score juist is dan gaat juist +1
                    if (oQuiz.score[i] === true) {
                        ++nJuist;
                    }
                }

                var sScore = "<p class='score'>Uw score is " + nJuist + "/" + nVragen + " <br>(" + nBeantwoord + " beantwoord)</p>";
                console.log(sScore);
                eScore.innerHTML = sScore;
            };

            /***************************/
            function maakNav(index) {
                //returnt navbalkje met vorige volgende hyperlinks
                //@index  de index van deze vraag

                //maxIndex= aantal vragen
                var nMaxIndex = oQuiz.vragen.length;
                var nVorigeIndex = index - 1;
                var nVolgendeIndex = index + 1;

                //eNav is een div
                var eNav = document.createElement('div');
                eNav.setAttribute("class", "nav");

                //eerste vraag geen Vorige hyperlink
                if (index > 0) {
                    //var vorige creert a met href van pagina
                    var eVorige = document.createElement('a');
                    eVorige.setAttribute("href", "#");
                    //met attribuut title: "vorige vraag: vorige index"
                    eVorige.setAttribute("title", "Vorige vraag:" + nVorigeIndex);
                    eVorige.innerHTML = "&lt;&lt;";
                    //aan vorige de event listener toevoegen dat een vraag toont met vorige index
            eVorige.addEventListener("click", function (e) {
                        toonVraag(nVorigeIndex);
                    });
                    //nav appendchild vorige
                    eNav.appendChild(eVorige);
                }
                //als index kleiner is dan maxindex
                if (index <= nMaxIndex) {
                    var eVolgende = document.createElement('a');
                    eVolgende.setAttribute("href", "#");
                    eVolgende.setAttribute("title", "Volgende vraag: " + nVolgendeIndex);
                    eVolgende.innerHTML = "&gt;&gt;";
                    eVolgende.addEventListener("click", function (e) {
                        toonVraag(nVolgendeIndex);
                    });
                    eNav.appendChild(eVolgende);
                }
                return eNav;
                } 
                
                /***************************/
                function toonVraag(index){
                /*
                toont een vraag dr de z-index hoog te zetten
                @index index in de collection 'vraag' elementen (inclusief de eindscore container)
                */

                var eVragen = document.querySelectorAll(".vraag");
                for(var i=0;i<eVragen.length;i++){
                 if(i==index){
                  eVragen[i].style.zIndex=10;
                 }
                 else{
                  eVragen[i].style.zIndex=0;
                  } 
                 } 
                } 
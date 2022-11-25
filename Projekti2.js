
// Kun sivu latautuu tehdään haetaan ja tehdäään lista finnkinon teattereista
function lataaPaikat() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            var nimet = xmlDoc.getElementsByTagName("Name");
            var id = xmlDoc.getElementsByTagName("ID");

            for (var i = 0; i < nimet.length; i++) {
                var nimiTeksti = nimet[i].innerHTML;
                var nimiId = id[i].innerHTML;

                document.getElementById("teatTerit").innerHTML += '<option value = ' + nimiId + '>' + nimiTeksti + '</option>';
            }
        }
    }
}

//Ladataan valitun paikan perusteella aikataulu
function lataaAikataulu() {

    document.getElementById("lista").innerHTML = "";

    var id = document.getElementById("teatTerit").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + id, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;

            var otsikot = xmlDoc.getElementsByTagName("Title");
            var kuvat = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
            var ajat = xmlDoc.getElementsByTagName("dttmShowStart");
            var arvio = xmlDoc.getElementsByTagName("RatingImageUrl");
            var kuvaus = xmlDoc.getElementsByTagName("ContentDescriptors");
            var kesto = xmlDoc.getElementsByTagName("LengthInMinutes")
            for (var i = 0; i < otsikot.length; i++) {
                var kuva = '<img class="images" src="' + kuvat[i].innerHTML + '">';
                // Valitaan 
                var title = otsikot[i].innerHTML;
                var aikataulu = ajat[i].innerHTML;
                var arvioKuva = '<img src="' + arvio[i].innerHTML + '">';
                var kokonaisKesto = kesto[i].innerHTML;

                var aika = aikataulu.slice(11, 16);
                var paiva = aikataulu.slice(8, 10);
                var kuukausi = aikataulu.slice(5, 7);
                var vuosi = aikataulu.slice(0, 4);

                //Varoitukset
                var kuvaukSet = kuvaus[i].getElementsByTagName("ContentDescriptor");
                var varoitukset = "";
                for (var j = 0; j < kuvaukSet.length; j++) {
                    varoitukset += '<img src="' + kuvaukSet[j].getElementsByTagName("ImageURL")[0].innerHTML + '">';
                }

                document.getElementById("lista").innerHTML += '<tr><td>' + kuva + '</td><td>' + title + '<br/>' + paiva + "." + kuukausi + "." + vuosi + " " + aika + '<br/>' + "Kesto: " + kokonaisKesto + " minuuttia <br/> <br/>" + arvioKuva + varoitukset + '</td>';

            }
        }
    }
}

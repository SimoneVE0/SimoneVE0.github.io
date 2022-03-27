window.onload = function () {
    var alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
    var kategorier;          // Array for hovedkategorier/topics
    var valgtKategori;       // Valgt kategori
    var ord ;                // Valgt ord
    var gjett ;              // Gjett
    var flereGjett = [ ];    // Lagret gjett
    var liv ;                // Liv
    var teller ;             // Tell riktige gjett
    var mellomrom;           // Nummer av mellomrom i ord '-'
    
    // Henter elementer fra html
    var visLiv = document.getElementById("mineLiv");
    var visledertråd = document.getElementById("ledertråd");
    
    // Lage alfabet ul/liste
    //går gjennom hele alfabetet for å lage knappene man kan trykke på
    var buttons = function () {
      mineKnapper = document.getElementById('buttons'); //id i html
      bokstaver = document.createElement('ul'); //lager ul
       for (var i = 0; i < alfabet.length; i++) {
        bokstaver.id = 'alfabet';
        list = document.createElement('li');
        list.id = 'bokstav';
        list.innerHTML = alfabet[i];
        check();
        mineKnapper.appendChild(bokstaver);
        bokstaver.appendChild(list);
      }
    }
   // Velge kategori for ordet
    var velgKategori = function () {
      if (valgtKategori === kategorier[0]) {
        catagoryName.innerHTML = "Den valgte kategorien er: grunnstoffer";
      } else if (valgtKategori === kategorier[1]) {
        catagoryName.innerHTML = "Den valgte kategorien er: datakomponenter";
      } else if (valgtKategori === kategorier[2]) {
        catagoryName.innerHTML = "Den valgte kategorien er: Harry Potter karakterer";
      }
    }
    
   // Lager gjett ul, bokstaven man pusher inn i ordet hvis den er riktig
     resultat= function () {
      ordHolder = document.getElementById('hold'); //hold er en id i html
      korrekt = document.createElement('ul');
       for (var i = 0; i < ord.length; i++) {
        korrekt.setAttribute('id', 'mitt-ord');
        gjett = document.createElement('li');
        gjett.setAttribute('class', 'gjett');
        if (ord[i] === "-") {
          gjett.innerHTML = "_";
          mellomrom = 1;
        } else {
          gjett.innerHTML = "_";
        }
         flereGjett.push(gjett);
        ordHolder.appendChild(korrekt);
        korrekt.appendChild(gjett);
      }
    }
   // Viser liv man har igjen
     kommentarer = function () {
      visLiv.innerHTML = "Du har " + liv + " liv";
      if (liv < 1) {
        visLiv.innerHTML = "Game Over";
        document.getElementById("mineLiv").style.color = "red";
        document.getElementById("mineLiv").style.fontSize = "larger";
      }
      for (var i = 0; i < flereGjett.length; i++) {
        if (teller + mellomrom === flereGjett.length) {
          visLiv.innerHTML = "Du vant!";
          document.getElementById("mineLiv").style.color = "green";
          document.getElementById("mineLiv").style.fontSize = "larger";
        }
      }
    }
    
   // Lager pinnemannen
    var animer = function () {
      var tegnMeg = liv ;
      tegnArray[tegnMeg]();
    }
    
    canvas =  function(){
       minPinnemann = document.getElementById("pinnemann");
      kontekst = minPinnemann.getContext('2d');
      kontekst.beginPath();
      kontekst.strokeStyle = "#fff";
      kontekst.lineWidth = 2;
    };
      hode = function(){
        minPinnemann = document.getElementById("pinnemann");
        kontekst = minPinnemann.getContext('2d');
        kontekst.beginPath();
        kontekst.arc(60, 25, 10, 0, Math.PI*2, true);
        kontekst.stroke();
      }
    
    tegn = function($veiFrax, $veiFray, $veiTilx, $veiTily) {
    
      kontekst.moveTo($veiFrax, $veiFray);
      kontekst.lineTo($veiTilx, $veiTily);
      kontekst.stroke();
   }
      ramme1 = function() {
       tegn (0, 150, 150, 150);
     };
      ramme2 = function() {
       tegn (10, 0, 10, 600);
     };
     ramme3 = function() {
       tegn (0, 5, 70, 5);
     };
     ramme4 = function() {
       tegn (60, 5, 60, 15);
     };
     mage = function() {
       tegn (60, 36, 60, 70);
     };
     høyreArm = function() {
       tegn (60, 46, 100, 50);
     };
     venstreArm = function() {
       tegn (60, 46, 20, 50);
     };
     høyreBen = function() {
       tegn (60, 70, 100, 100);
     };
     venstreBen = function() {
       tegn (60, 70, 20, 100);
     };
    tegnArray = [høyreBen, venstreBen, høyreArm, venstreArm,  mage,  hode, ramme4, ramme3, ramme2, ramme1];
    
   // bokstaver blir inaktive
     check = function () {
      list.onclick = function () {
        var gjett2 = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < ord.length; i++) {
          if (ord[i] === gjett2) {
            flereGjett[i].innerHTML = gjett2;
            teller += 1;
          }
        }
        var j = (ord.indexOf(gjett2));
        if (j === -1) {
          liv -= 1;
          kommentarer();
          animer();
        } else {
          kommentarer();
        }
      }
    }
   // Spill, velger kategori
    spill = function () {
      kategorier = [
        ["hydrogen", "karbon", "oksygen", "klor", "aluminium", "sølv", "kalsium"],
        ["harddisk", "prosessor", "hovedkort", "grafikkort", "arbeidsminne"],
        ["sirius", "humlesnurr", "gygrid", "nilus", "voldemort"]
      ];
       valgtKategori = kategorier[Math.floor(Math.random() * kategorier.length)];
      ord = valgtKategori[Math.floor(Math.random() * valgtKategori.length)];
      ord = ord.replace(/\s/g, "-");
      console.log(ord);
      buttons();
       flereGjett = [ ];
      liv = 10;
      teller = 0;
      mellomrom = 0;
      resultat();
      kommentarer();
      velgKategori();
      canvas();
    }
     spill();
   // Hintet man får opp
       hint.onclick = function() {
         hints = [
            ["Fargeløs og luktfri", "Mm = 12,01 g/mol", "Livsviktig for organismer", "Rent basseng", "13 protoner", "2.plass", "Meieriprodukter"],
            ["Enhet for datalagring", "Maskinkode", "Viktigste kretskort", "Bra for spill", "Lagrer midlertidig"],
            ["Mørk stemme", "Ligner på julenissen", "Bad hair day", "Klumsete", "Crazy bitch"]
      ];
       var kategoriIndex = kategorier.indexOf(valgtKategori);
      var hintIndex = valgtKategori.indexOf(ord);
      visledertråd.innerHTML = "Hint: " +  hints [kategoriIndex][hintIndex];
    };
    
   // Nullstiller spillet
     document.getElementById('nullstill').onclick = function() {
      korrekt.parentNode.removeChild(korrekt);
      bokstaver.parentNode.removeChild(bokstaver);
      visledertråd.innerHTML = "";
      kontekst.clearRect(0, 0, 400, 400);
      spill();
    }
   }
   
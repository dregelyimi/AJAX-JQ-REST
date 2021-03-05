$(function () {
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    $("#article").delegate(".torol","click" , adTorol);
});
var telefonkonyvem = [];

function kiir() {
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var ID = telefonkonyvem[i].ID;
        var nev= telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep;
        var elem = "<div> <h2>" + nev + "</2> <p>" + tel + "</p><p>" + kep + "<p><button class='torol' id='"+ID+"'>Töröl</button></div>";
        $("article").append(elem);
    }
}

function beolvas() {
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            console.log(result);
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betoltésekor");
        }
    });
}

function adBeir() {
    var szemely = {
            nev: $("#nev").val(),
            nev: $("#tel").val(),
            nev: $("#kep").val(),
    };
    
    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function (result) {
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok mentésekor");
        }
    });
}

function adTorol() {
    console.log("Törlés");
    var id=$(this).attr("id");
    
    $.ajax({
        type: "DELETE",
        url: "torles.php",
        success: function () {
            $(this).closest("div").remove();
        },
        error: function() {
            alert("Hiba az adatok törlésekor");
        }
    });
}



var apiclient = apiclient;
var app = (function (){

    var stompClient = null;

    function createUser(){
        sessionStorage.setItem("name",$("#userName").val());
        apiclient.addUser($("#userName").val()).then(()=>{
            window.location = "canvasParticipante.html";
        })
            .catch(error => console.log(error))
    }

    function createMaster(){
        sessionStorage.setItem("name",$("#masterName").val());
        apiclient.addUser($("#masterName").val()).then(()=>{
            window.location = "pantallaMaster.html";
        })
            .catch(error => console.log(error))
    }

    var getUsers = function (name){
        connectAndSubscribe(sessionStorage.getItem("name"));
        paintUsers()
    }

    var paintUsers = function (){
        apiclient.getAllUsers(printTable);
    }

    var printTable = function (data){
        $("#participantesTable tbody").empty();
        const datanew = data.map((elemento) =>{
            return{
                name : elemento.name
            }
        });
        datanew.map((element) => {
            $("#participantesTable > tbody:last").append($(
                "<div >\n" +
                "<br><br>"+
                "        <ul class=\"nav\">\n" +
                "            <li><a  >"+ element.name +"</a>\n" +
                "                <ul>\n" +
                "                    <li><a onclick='app.reDirectCanvaParticipante(\""+ element.name +"\")'>Observar Pantalla</a></li>\n" +
                "                    <li><a class=\"btn-abrir-win\" id=\"btn-abrir-win\" onclick='app.openWin(\""+element.name+"\")'>Escoger Ganador</a></li>\n" +
                "                    <li><a >Expulsar</a></li>\n" +
                "                </ul>\n" +
                "            </li>\n" +
                "        </ul>\n" +
                "    </div>" + "</td>"));
        });
    }

    var openWin = function (nombreGanador){
        apiclient.setGanador(nombreGanador).then(()=>{
            apiclient.getAllUsers(notificarGanador);
        })
    }


    var notificarGanador = function (data){
        var ganador = "";
        data.forEach((element) => {
            if(element.isGanador){
                ganador = element.name;
            }
        })

        data.forEach((element) => {
            stompClient.send("/topic/"+element.name, {}, "seleccionarGanador "+ganador);
        })
    }

    var reDirectCanvaParticipante = function (namePaticipante){
        window.location="canvasParticipante.html"
        sessionStorage.setItem("nombreParticipante", namePaticipante);
    }


    function getPointsUser(nombreParticipante){
        apiclient.getUser(nombreParticipante, drawAllPointsCanvas);
    }

    var connectAndSubscribe = function (name) {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/'+name, function (eventbody) {
                if (eventbody.body === "delete"){
                    clearCanvas()
                }else if(eventbody.body === "actualizarUsuarios"){
                    paintUsers();
                }else if(eventbody.body.includes("seleccionarGanador")){
                    if(! name.includes("Master")){
                        var overgame = document.getElementById('overgame');
                        overgame.classList.add('activewin');
                        var list = eventbody.body.split(" ")
                        $("#ganador").append(list[1])
                    }
                }
                else{
                    var point = JSON.parse(eventbody.body);
                    drawPointCanvas(point);
                }
            });
        });
    };

    var mousePos = function(evt){
        canvas = document.getElementById("myCanvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    var deletePoints = function (){
        stompClient.send("/app/delete."+sessionStorage.getItem("name"));
    }

    var clearCanvas = function(){
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);

    }

    var drawPointCanvas = function(point){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };

    var userConnected = function (data){
        stompClient.send("/topic/"+data.name, {}, "actualizarUsuarios");
    }

    var drawAllPointsCanvas = function (data){
        if(data.points.length > 0) {
            data.points.forEach((element) => {
                drawPointCanvas(element);
            })
        }
    }

    var conectarCavnaParticipante = function (nombreParticipante){
        connectAndSubscribe(nombreParticipante);
        getPointsUser(nombreParticipante);
    }

    var init = function (){

        var name = (sessionStorage.getItem("name"))
        if(! name.includes("Master")){
            conectarCavnaParticipante(name)
            setTimeout(()=>{apiclient.getMasterName(userConnected)},500)
            var canvas = document.getElementById("myCanvas"),
                context = canvas.getContext("2d");
            //if PointerEvent is suppported by the browser:
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    var point = mousePos(event);
                    name = sessionStorage.getItem("name");
                    stompClient.send("/app/"+name, {}, JSON.stringify(point));
                });
            }
        }else{
            conectarCavnaParticipante(sessionStorage.getItem("nombreParticipante"));
        }

    }

    return {
        createUser: createUser,
        init:init,
        deletePoints: deletePoints,
        getUsers: getUsers,
        createMaster: createMaster,
        reDirectCanvaParticipante   : reDirectCanvaParticipante,
        openWin: openWin,
        test: function (){
        }
    }
})();
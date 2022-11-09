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

    var getUsers = function (){
        connectAndSubscribe();
        apiclient.getAllUsers(printTable);
    }

    var printTable = function (data){
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
                "            <li><a href=\"\" >"+ element.name +"</a>\n" +
                "                <ul>\n" +
                "                    <li><a href=\"\" onclick='app'>Observar Pantalla</a></li>\n" +
                "                    <li><a class=\"btn-abrir-win\" id=\"btn-abrir-win\" >Escoger Ganador</a></li>\n" +
                "                    <li><a href=\"\">Expulsar</a></li>\n" +
                "                </ul>\n" +
                "            </li>\n" +
                "        </ul>\n" +
                "    </div>" + "</td>"));
        });
    }

    function getPointsUser(){
        apiclient.getUser(sessionStorage.getItem("name"), drawAllPointsCanvas);
    }

    var connectAndSubscribe = function () {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/'+sessionStorage.getItem("name"), function (eventbody) {
                if (eventbody.body === "delete"){
                    clearCanvas()
                }else{
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
        stompClient.send("/app/delete."+name);
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

    var drawAllPointsCanvas = function (data){
        if(data.points.length > 0) {
            data.points.forEach((element) => {
                drawPointCanvas(element);
            })
        }
    }

    var init = function (){
        connectAndSubscribe();
        getPointsUser();
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
    }

    var savePista = function (){
        var contenido = document.getElementById("pistaContent");
        var tomado = false;
        apiclient.savePista(contenido, tomado);
    }

    return {
        createUser: createUser,
        init:init,
        deletePoints: deletePoints,
        getUsers: getUsers,
        createMaster: createMaster,
        test: function (){
            alert("holi")
        }
    }
})();
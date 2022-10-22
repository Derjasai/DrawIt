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

    function getPointsUser(){
        apiclient.getUser(sessionStorage.getItem("name"), graficarPuntosExistentes);
    }

    var graficarPuntosExistentes = function(data){
        if(data.points.length > 0){
            data.points.forEach((element) => {
                drawCanvas(element);
            })
//            can = document.getElementById("myCanvas");
//            ctx = can.getContext("2d");
//            ctx.beginPath();
//            var plano = data.points;
//            var temp =[];
//            for (let i = 0; i < plano.length; i++) {
//                temp[i] = plano[i]
//            }
//            blueprintsPoints = temp.slice(1, temp.length);
//            initx = data.points[0].x;
//            inity = data.points[0].y;
//            blueprintsPoints.forEach((element) => {
//            ctx.moveTo(initx, inity);
//            ctx.lineTo(element.x, element.y);
//            ctx.stroke();
//            initx = element.x;
//            inity = element.y;
//            });
        }else{
            clearCanvas();
        }
    }

    var connectAndSubscribe = function () {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/'+sessionStorage.getItem("name"), function (eventbody) {
                var point = JSON.parse(eventbody.body);

                drawCanvas(point);
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

    var clearCanvas = function(){
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
    }

    var deletePoints = function(){

    }

    var drawCanvas = function(point){
        apiclient.addPoint(point.x, point.y,sessionStorage.getItem("name"))
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };

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
                 stompClient.send("/topic/"+name, {}, JSON.stringify(point));
            });
        }
    }

    return {
        createUser: createUser,
        init:init,
        clearCanvas: clearCanvas
    }
})();
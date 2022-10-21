var apiclient = apiclient;
var app = (function (){

    var name;
    var stompClient = null;

    function createUser(){
        sessionStorage.setItem("name",$("#userName").val());
        apiclient.addUser($("#userName").val()).then(()=>{
            window.location = "canvasParticipante.html";
        })
            .catch(error => console.log(error))
    }

    function getUser(data){
        apiclient.getUser("daniel", prueba);
    }

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
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

    var prueba = function (){
        stompClient.send("/topic/"+name, {}, JSON.stringify("hola"));
    }

    var mousePos = function(evt){
        canvas = document.getElementById("myCanvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function clearCanvas(){
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
    }

    var drawCanvas = function(point){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };

    var init = function (){
        connectAndSubscribe();
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
        getUser: getUser,
        prueba:prueba,
        init:init
    }
})();
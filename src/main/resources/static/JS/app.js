var apiclient = apiclient;
var app = (function (){

    var name;
    var stompClient = null; 
    
    function createUser(){
        name = $("#userName").val();
        connectAndSubscribe();
        apiclient.addUser(name).then(()=>{
            alert("Hola soy una prueba")
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
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic/"+name, function (eventbody) {
                alert(eventbody);
            });
        });

    };

    var prueba = function (data){
        $("#prueba").text(data.name);
    }

    return{
        createUser:createUser,
        getUser: getUser
    }

})();
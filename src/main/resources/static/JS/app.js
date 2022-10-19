var apiclient = apiclient;
var app = (function (){

    var name;

    function createUser(){
        name = $("#userName").val();
        apiclient.addUser(name).then(()=>{
            alert("Hola soy una prueba")
        })
            .catch(error => console.log(error))
    }

    function getUser(data){
        apiclient.getUser("daniel", prueba);
    }

    var prueba = function (data){
        $("#prueba").text(data.name);
    }

    return{
        createUser:createUser,
        getUser: getUser
    }

})();
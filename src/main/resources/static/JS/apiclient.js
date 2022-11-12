var apiclient = (function (){

    var getUser = function (id, callback){
        $.ajax({
            type: "GET",
            url: "drawit/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data){
                callback(data);
            }
        })

    };

    var addUser = function (name){
        var data = JSON.stringify({name:name});
        return new Promise(function (resolve, reject){
            resolve(
                $.ajax({
                    url: "drawit",
                    type: "POST",
                    data: data,
                    contentType: "application/json"
                })
            )
        })
    };

    var getAllUsers = function(callback){
        $.ajax({
                type: "GET",
                url: "drawit/all",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                callback(data)}});
    };

    var getMasterName = function(callback){
        $.ajax({
            type: "GET",
            url: "drawit/masterName/masterName",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                callback(data)}});
    };

    var cleanParticipantes = function (){
        return new Promise(function(resolve,reject){
            resolve(
                $.ajax({
                    url: "drawit/clean",
                    type: 'DELETE'
                })
            )
        })
    };

    var setGanador = function (name){
        return new Promise(function (resolve, reject){
            resolve(
                $.ajax({
                    url: "drawit/"+name,
                    type: "PUT",
                    contentType: "application/json"
                })
            )
        })
    };

    var savePista = function(id, contenido, tomado){
        var data = JSON.stringfy({id:id, contenido:contenido, tomado:tomado});
        return new Promise(function(resolve, reject){
        resolve(
            $.ajax({
                type:"POST",
                url: "drawit",
                contentType; "application/json; charset=utf-8",
                dataType: "jason",
                data:data
            })
        )})
    };

    return{
        getUser: getUser,
        addUser: addUser,
        getAllUsers: getAllUsers,
        getMasterName: getMasterName,
        setGanador: setGanador,
        cleanParticipantes: cleanParticipantes,
        savePista: savePista,
        }
    }
)();
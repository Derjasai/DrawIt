var apiclient = (function (){

    var getUser = function (id, callback){
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/drawit/" + id,
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
                    url: "http://localhost:8080/drawit",
                    type: "POST",
                    data: data,
                    contentType: "application/json"
                })
            )
        })
    };

    return{
        getUser: getUser,
        addUser: addUser
        }
    }
)();
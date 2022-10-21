var apiclient = (function (){

    var getUser = function (id, callback){
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/drawit/" + id,
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
                    url: "http://localhost:8090/drawit",
                    type: "POST",
                    data: data,
                    contentType: "application/json"
                })
            )
        })
    };

    var addPoint = function(x,y,name){
        var data = JSON.stringify({name:name, "points":[{"x":x,"y":y}]});
        $.ajax({
            url: "drawit/"+name,
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: data
        })
    };

    return{
        getUser: getUser,
        addUser: addUser,
        addPoint: addPoint
        }
    }
)();
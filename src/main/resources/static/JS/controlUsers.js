async function signIn(){
    const config = {
        auth: {
            clientId: '091357ea-7335-4162-a58c-2ad8870740bd',
            authority: 'https://login.microsoftonline.com/common/',
            redirectUri: 'https://drawit-api-1670199012625.azurewebsites.net/index.html'
        }
    };
    var client = new Msal.UserAgentApplication(config);
    var request = {
        scopes: ['user.read']
    };
    let loginResponse = await client.loginPopup(request);
    console.log("hello")
    localStorage.setItem("logeo", loginResponse.account.name)
    if (loginResponse.account.name === "Admin"){
        app.createMaster(loginResponse.account.name)
    }else{

        app.createUser(loginResponse.account.userName)
    }
}
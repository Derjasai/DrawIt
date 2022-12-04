async function signIn(){
    const config = {
        auth: {
            clientId: '091357ea-7335-4162-a58c-2ad8870740bd',
            authority: 'https://login.microsoftonline.com/common/',
            redirectUri: 'http://localhost:8080/master.html'
        }
    };
    var client = new Msal.UserAgentApplication(config);
    var request = {
        scopes: ['user.read']
    };
    let loginResponse = await client.loginRedirect(request);
    console.dir(loginResponse);
}
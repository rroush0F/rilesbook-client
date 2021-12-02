let APIURL = "";

switch(window.location.hostname) {
    case "localhost" || "127.0.0.1":
        APIURL = "http://localhost:3000"
        break;
    case "rilesbookserver.herokuapp.com":
        APIURL = "https://rilesbookclient.herokuapp.com"
} 

export default APIURL;
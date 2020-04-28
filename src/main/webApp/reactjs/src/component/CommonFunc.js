// this js file contains functions can be used by multiple components

const sendReq = (options) =>{
   const headers = new Headers({
    'Content-Type': 'application/json',
   });

   if(localStorage.getItem("ACCESS_TOKEN")){
       headers.append('Authorization', 'Bearer ' + localStorage.getItem("ACCESS_TOKEN"));
   }

   const defaults = {headers:headers};

   options = Object.assign({},defaults, options);

   return fetch(options.url, options)
   .then(
       response=>response.json()
       .then(json=>{
           if(!response.ok){
               return Promise.reject(json);
           }
           return json;
       })
   );
};

export function login(loginRequest){
    sendReq({
        url: 'http://localhost:8082/api/auth/signin',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    }).then(response => {
        localStorage.setItem("ACCESS_TOKEN",response.accessToken);
        alert("Sign in OK !");
    }).catch(error => {
        if(error.status === 401){
            alert("Incorrect user name or password!");
        }else{
            alert(error.message)
        }
    });

}

export function signUp(signupRequest){
    sendReq({
        url: 'http://localhost:8082/api/auth/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    }).then(response => {
        alert("Sign up OK!");
    }).catch(error => {
        alert(error.message);
    });
}
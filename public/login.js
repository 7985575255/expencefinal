


document.getElementById('loginForm').addEventListener('submit',  async function(event) {
    event.preventDefault();
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    let obj={email, password};
    console.log(obj)
    try{

    const response=await axios.post('http://13.49.61.220:3000/user/loginuser',obj);
     console.log(response);
    localStorage.setItem("token" , response.data.token);
    if(response.status==201){
        window.location.href="./dashbord.html";
    }
    }catch(err){
        console.log(err)
    }
  });
  
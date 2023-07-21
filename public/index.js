 async function registeruser(event){
    event.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    
    const obj={name,email,password};
    console.log(obj)
    try{
        const response=await axios.post('http://16.171.141.102:3000/user/registeruser', obj);
        if(response.status==201){
            window.location.href="./login.html";
        }
    }catch(err){
        console.log(err)
    }
}
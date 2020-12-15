class Auth{
    constructor(){

        if(localStorage.getItem("isAuthenticatedBuyer")){
            this.authenticated = localStorage.getItem("isAuthenticatedBuyer")
        }else{
            this.authenticated = "false"
        }
        
    }
    
    isAuthenticated() {

        return this.authenticated
        
    }


    login(userData,history){
        localStorage.setItem("isAuthenticatedBuyer","true")
        localStorage.setItem("userDataBuyer",JSON.stringify(userData))
        history.push("/")
    }

    logout(history){
        var data = this.getUserData()
        localStorage.setItem("isAuthenticatedBuyer","false")
        localStorage.setItem("userDataBuyer",JSON.stringify({type:data.type}))
        history.push('/signin-buyer')
    }

    getUserData(){
        return JSON.parse(localStorage.getItem("userDataBuyer"))
    }



}

export default new Auth();
import React from 'react';

class Signup extends React.Component {
    constructor(props){
        super();
        this.state={            
            Id:'',
            pass:''
        }
    }
    componentDidMount(){
        fetch("http://localhost:8080/checkSignedIn",{
            method:'get',
            mode:"cors",
            credentials:"include",            
        })
        .then(res => res.json())
        .then(isLoggedUser=>{
           if(isLoggedUser!=='signedOut'){
                this.props.onSubmit(isLoggedUser.Type.trim())   
                this.props.loadUserDetails(isLoggedUser)               
           }
           else{
               this.props.onSubmit(isLoggedUser)
           } 
        })
        .catch(err=>{
                      
        })
    }
    onIdChange=(event)=>{
        console.log(event.target.value)
        this.setState({
            Id:event.target.value
        })
    }
    onPassChange=(event)=>{
        console.log(event.target.value);
        this.setState({pass:event.target.value})
    }
    onSubmitSignIn=()=>{
        fetch('http://localhost:8080/signin',{
            method:'post',
            credentials:"include",     
            mode:"cors",                    
            headers:{
                "Content-Type":"application/json"                
            },            
            body:JSON.stringify({
                Id:this.state.Id,
                password:this.state.pass
            })            
        })
        .then(response => response.json())
        .then(employee=>{
            if(employee){
                console.log(employee)
                this.props.loadUserDetails(employee)
                this.props.onSubmit(employee.Type.trim())                
            }            
        })
        .catch(err=>{
            console.log("unable to sign in")
        })
    }
    render() {
        //const{onSubmit}=this.props
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Log In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Employee ID</label>
                                <input onChange={this.onIdChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Id" id="email-address"  />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">

                            <input onClick={this.onSubmitSignIn}
                         
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }

}


export default Signup;
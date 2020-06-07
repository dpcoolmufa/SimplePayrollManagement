import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
//import TodoApp from '../Todo'

//import Calendar from 'react-calendar'
class Profile extends React.Component{
    constructor(props){
        super();
        this.state={
            name:'',
            dob:'',
            password:''
        }
    }
    onChangeName=(event)=>{
        console.log(event.target.value)
        this.setState({name:event.target.value})
    }
    onChangeDob=(event)=>{
        console.log(event.target.value)
        this.setState({dob:event.target.value})
    }
    onChangePass=(event)=>{
        console.log(event.target.value)
        this.setState({password:event.target.value})
    }

    onClickSave=()=>{
        const{name,dob,pass}=this.state
        fetch("http://localhost:8080/update",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                Id:this.props.userDetails.id,
                Name:name,
                DOB:dob,
                password:pass
            })
        })
        .then(res => res.json())
        .then(updatedEmp =>{
           alert("updated successfully!")
        })
    }
    render (){
        const {id,name,dob}=this.props.userDetails
        return (
            <div>
                <div className=" outline ma3 br2 pa2 w-50 center  ">
                    <legend className="ph2 f2 fw6 ph0 mh0">My Profile</legend>
    
                    <Row className="pa2 ">
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Employee Id</Form.Label>
                            <input className="pa1 input-reset ba bg-transparent hover-bg-black hover-white w-100" defaultValue={id} readOnly />
                        </Col>
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Name</Form.Label>
                            <input onChange={this.onChangeName} className="pa2 input-reset  ba bg-transparent hover-bg-black hover-white w-100 " defaultValue={name} />
                        </Col>
                    </Row>
                    <Row className="pa2 ">
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Date of birth</Form.Label>
                            <input onChange={this.onChangeDob} className="pa1 input-reset ba bg-transparent hover-bg-black hover-white w-100" type='Date' defaultValue={dob.substr(0,10)} />
                        </Col>
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Password</Form.Label>
                            <input onChange={this.onChangePass} className="pa2 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Password" type="password"/>
                        </Col>
                    </Row>
    
                    <Row className="pa2">
                        <Col className="pa2">
                            <input onClick={this.onClickSave} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save profile" />
                        </Col>
                    </Row>
    
                </div>
            </div>
        )
    }   
    
}
export default Profile
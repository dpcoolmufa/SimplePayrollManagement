import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

class Editemployee extends React.Component {
    constructor(){
        super();
        this.state={
            id:'',
            name:'',
            dob:'',
            password:''
        }
    }
    onChangeId=(event)=>{
        console.log(event.target.value)
        this.setState({id:event.target.value})
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
        const{id,name,dob,pass}=this.state
        fetch("http://localhost:8080/updateEmployee",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                Id:id,
                Name:name,
                DOB:dob,
                password:pass
            })
        })
        .then(res => res.json())
        .then(updatedEmp =>{
           alert("updated employee profile successfully!")
        })
        .catch(res=> res.json("update unsuccessfull!"))
    }

    onClickDelete=()=>{
        const id =this.state.id
        fetch("http://localhost:8080/delete",{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:id
            })
        })
        .then(res => res.json())
        .then(isDeleted=>{
            alert("Employee deletion successful")
        })
        .catch(err => console.log('Unsuccessful'))        
    }
    render() {
        return (
            <div>
                <div className=" outline ma3 br2 pa2 w-50 center  ">
                    <legend className="ph2 f2 fw6 ph0 mh0">Edit/Delete Employee</legend>
                    <div className="flex flex-wrap">
                        <Form.Row className="pa2 ">
                            <Col className="pa2 " >
                                <Form.Label className="pb2  fw6 lh-copy f6">Employee Id</Form.Label>
                                <input onChange={this.onChangeId} className="pa1 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Employee Id" type="text" />
                            </Col>
                            <Col className="pa2 ">
                                <Form.Label className="pb2  fw6 lh-copy f6">Employee Name</Form.Label>
                                <input onChange={this.onChangeName} className="pa1 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Employee Name" />
                            </Col>
                        </Form.Row>                        
                        <Form.Row className="pa2 ">
                            <Col className="pa2" >
                                <Form.Label className="pb2  fw6 lh-copy f6">Date of birth</Form.Label>
                                <input onChange={this.onChangeDob} className="pa1 input-reset ba bg-transparent hover-bg-black hover-white w-100" type='Date' />
                            </Col>
                            <Col className="pa2" >
                                <Form.Label className="pb2  fw6 lh-copy f6">Password</Form.Label>
                                <input onChange={this.onChangePass} className="pa1 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Password" type="password" />
                            </Col>
                        </Form.Row>

                    </div>
                    <Row className="pa2">
                        <Col className="pa2">
                            <input onClick={this.onClickSave} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save profile" />
                        </Col>
                        <Col className="pa2">
                            <input onClick={this.onClickDelete} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Delete Employee" />
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}

export default Editemployee
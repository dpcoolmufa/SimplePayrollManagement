import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
//import Cookies from 'js-cookie' 

class Addemployee extends React.Component {
    constructor() {
        super();
        this.state = {
            Id: '',
            Pass: '',
            Name: '',
            DOB: '',
            Type: ''
        }
    }
    onIdChange = (event) => {
        this.setState({ Id: event.target.value })
        console.log(this.state.Id)
    }
    onPassChange = (event) => {
        this.setState({ Pass: event.target.value })
        console.log(this.state.Pass)
    }
    onDOBChange = (event) => {
        this.setState({ DOB: event.target.value })
        console.log(this.state.DOB)
    }
    onTypeChange = (event) => {
        this.setState({ Type: event.target.value })
        console.log(this.state.Type)
    }
    onNameChange = (event) => {
        this.setState({ Name: event.target.value })
        console.log(this.state.Name)
    }
    registerEmployee = () => {
        const { Id, Name, DOB, Type, password } = this.state
        fetch('http://localhost:8080/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: Id,
                Name: Name,
                DOB: DOB,
                Type: Type,
                password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    alert("Employee addded successfully!")
                }
            })
    }


    render() {
        console.log(this.state.Id)
        return (
            <div>
                <div className=" outline ma3 br2 pa2 w-50 center white  ">
                    <legend className="ph2 f2 fw6 ph0 mh0 black">Add Employee</legend>
                    <div className="flex flex-wrap black">
                        <Form.Row className="pa2 ">
                            <Col className="pa2 " >
                                <Form.Label className="pb2  fw6 lh-copy f6">Employee Id</Form.Label>
                                <input onChange={this.onIdChange} className="pa1 b--black input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Employee Id" type="text" maxLength={10} />
                            </Col>
                            <Col className="pa2 ">
                                <Form.Label className="pb2  fw6 lh-copy f6">Employee Type</Form.Label>
                                <select className="pa2  ba bg-transparent b--black hover-bg-black hover-white w-100 " placeholder="Employee Type" onChange={this.onTypeChange}>
                                    <option value="Admin" className="ba b--black bg-transparent hover-bg-black hover-white bg-black black w-100">Admin</option>
                                    <option value="Employee" className="ba b--black bg-transparent hover-bg-black hover-white  black w-100">Employee</option>
                                </select>
                            </Col>
                        </Form.Row>
                        <Form.Row className="pa2">
                            <Col className="pa2 ">
                                <Form.Label className="pb2  fw6 lh-copy f6">Employee Name</Form.Label>
                                <input onChange={this.onNameChange} className="pa1  input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Employee Name" />
                            </Col>
                            <Col className="pa2" >
                                <Form.Label className="pb2  fw6 lh-copy f6">Date of birth</Form.Label>
                                <input onChange={this.onDOBChange} className="pa1 input-reset ba bg-transparent hover-bg-black hover-white w-100" type='Date' />
                            </Col>
                        </Form.Row>
                        <Form.Row className="pa2 ">
                            <Col className="pa2" >
                                <Form.Label className="pb2  fw6 lh-copy f6">Password</Form.Label>
                                <input onChange={this.onPassChange} className="pa1 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Password" type="password" />
                            </Col>
                        </Form.Row>
                    </div>
                    <Row className="pa2">
                        <Col className="pa2">
                            <input onClick={this.registerEmployee} className="b ph3 pv2 Form.Control-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Add profile" />
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}

export default Addemployee
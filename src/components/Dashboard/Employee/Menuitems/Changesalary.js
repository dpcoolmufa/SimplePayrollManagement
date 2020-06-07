import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

class Changesalary extends React.Component {
    constructor(){
        super();
        this.state={
            id:'',
            gpay:'',
            hra:'',
            esi:''
        }
    }
    onIdChange = (event) => {
        console.log(event.target.value)
        this.setState({ id: event.target.value })        
    }
    onGpayChange = (event) => {
        console.log(event.target.value)
        this.setState({ gpay: event.target.value })        
    }
    onHraChange = (event) => {
        console.log(event.target.value)
        this.setState({ hra: event.target.value })        
    }
    onEsiChange = (event) => {
        console.log(event.target.value)
        this.setState({ esi: event.target.value })
        
    }

    onClickSave=()=>{
        const {id,gpay,hra,esi}=this.state
        console.log(this.state)
        fetch("http://localhost:8080/salary",{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:id,
                gpay:gpay,
                hra:hra,
                esi:esi
            })
        })
        .then(res =>res.json())                
    }
    render() {
        return (
            <div>

                <div className=" outline ma3 br2 pa2 w-50 center  ">
                    <legend className="ph2 f2 fw6 ph0 mh0">Add/Edit Salary Details </legend>

                    <Row className="pa2 ">
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Employee Id</Form.Label>
                            <input onChange={this.onIdChange} className="pa2 input-reset  ba bg-transparent hover-bg-black hover-white w-100 " placeholder="Id" />
                        </Col>
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">Gross pay</Form.Label>
                            <input onChange={this.onGpayChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder="Gross Pay" type='number' />
                        </Col>
                    </Row>
                    <Row className="pa2 ">
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">HRA</Form.Label>
                            <input onChange={this.onHraChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder="HRA" type='number' />
                        </Col>
                        <Col className="pa2" >
                            <Form.Label className=" db fw6 lh-copy f6">ESI</Form.Label>
                            <input onChange={this.onEsiChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder="ESI" type="number" />
                        </Col>
                    </Row>
                    <Row className="pa2">
                        <Col className="pa2">
                            <input onClick={this.onClickSave} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save Details" />
                        </Col>
                    </Row>

                </div>
            </div>

        )
    }
}

export default Changesalary
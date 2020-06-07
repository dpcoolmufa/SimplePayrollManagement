import React from 'react'
import { Col, Row } from 'react-bootstrap'
class Payroll extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id:''
        }
    }
    onChangeId=(event)=>{
        this.setState({id:event.target.value})
    }
    onClickPayroll=()=>{
        const id=this.state.id;
        fetch('htpp://localhost:8080/payroll',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id,
                c_date:Date.now()
            })
        })
        .then(res =>res.json())
        .then(payroll=>{
            console.log(payroll)
        })
    }
    render() {
        return (
            <div>
                <div className="pa3 center">
                    <Row className="pa2">
                        <Col className="pa2">
                            <input onChange={this.onChangeId} className="pa1 input-reset  ba bg-transparent hover-bg-black hover-white w-100" placeholder="Employee Id" type="text" />
                        </Col>
                        <Col className="pa2">
                            <input onClick={this.onClickPayroll} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Generate Payroll" />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Payroll
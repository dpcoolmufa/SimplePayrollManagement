import React from 'react'
import { Table } from 'react-bootstrap'

class PayrollReport extends React.Component {
    constructor(props) {
        super();
        this.state = {
            employee: [],
            length: ''
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/payrollReport')
            .then(res => res.json())
            .then(payroll => {
                this.setState({ employee: payroll })
                var count = Object.keys(payroll).length
                console.log(count)
                this.setState({ length: count })
            })
    }
    render() {
        const theaders = ['Employee Id', "Days worked", "Date", "Credited salary"]
        return (
            <div>
                <Table bordered hover variant="dark" cellPadding="10px" cellSpacing="0px" className="ba w-75 bg-black-50 white-50 b--black-50 ma3  center">
                    <thead className="" >
                        <tr className=" hover-bg-black hover-white pointer ">
                            <th className=" bb bt br pa2 b--black-50">{theaders[0]}</th>
                            <th className=" bb bt br pa2 b--black-50">{theaders[1]}</th>
                            <th className=" bb bt br pa2 b--black-50">{theaders[2]}</th>
                            <th className=" bb bt br pa2 b--black-50">{theaders[3]}</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            (this.state.employee).map((data, i) => {
                                return (<tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.daysworked}</td>
                                    <td>{data.c_date.substring(0,10)}</td>
                                    <td>{data.c_salary}</td>
                                </tr>)
                            })

                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}


export default PayrollReport
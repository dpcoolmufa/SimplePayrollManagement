import React from 'react'
import { Table } from 'react-bootstrap'

class EmployeeView extends React.Component {
    constructor(props) {
        super();
        this.state = {
            employee: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/employeeDetail')
            .then(res => res.json())
            .then(Detail => {
                console.log("============")
                console.log((Detail))
                if (Object.keys(Detail).length > 0) {
                    this.setState({ employee: Detail })
                }
                else {
                    alert("No employee detail present")
                }
            })
            .catch(err => console.log(err))
    }
    rows = () => {


    }
    render() {
        const theaders = ['Employee Id', "Name", "Date of birth", "Type"]
        console.log(this.state.employee)

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
                                return (<tr className="pointer" key={i}>
                                    <td>{data.Id}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.DOB.substring(0, 10)}</td>
                                    <td>{data.Type}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}


export default EmployeeView
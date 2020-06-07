import React from 'react'
import Tilt from 'react-tilt'
import { Table } from 'react-bootstrap'


class Attendance extends React.Component {
    constructor(props) {
        super()
        this.state = {
            setShowModal: false,
            Date: {
                day: new Date().toISOString().substring(0, 10),
                time: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            },
            fromDate: '',
            toDate: "",
            report: []
        }
    }
    onClickSubmit = () => {
        const id = this.props.userDetails.id
        console.log(id)
        fetch("http://localhost:8080/attendance", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                date: this.state.Date.day
            })
        })
            .then(res => res.json())
            .then(msg => alert(msg))
    }
    onChangeFromDate = (event) => {
        console.log(event.target.value)
        this.setState({ fromDate: event.target.value })
    }
    onChangeToDate = (event) => {
        console.log(event.target.value)
        this.setState({ toDate: event.target.value })
    }

    toGetReport = () => {
        const fromDate = this.state.fromDate
        const toDate = this.state.toDate
        const id = this.props.userDetails.id
        fetch("http://localhost:8080/attendanceReport", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                fromDate: fromDate,
                toDate: toDate
            })
        })
            .then(res => res.json())
            .then(Report => {
                if (Object.keys(Report).length > 0) {
                    this.setState({ report: Report })
                }
                else {
                    alert("No data found!")
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const { day, time } = this.state.Date
        console.log(day + time)
        return (
            <div className="flex flex-wrap pv2">
                <Tilt scale={0.01} transitionSpeed={25000} className="w5 ">
                    <div className="tilt-scale outline ma2 pa2 pointer bg-white " >
                        <div>
                            <p className="tc f3">Attendance</p>
                            <label className="f4">Date:</label><br />
                            <p>{day}</p>
                            <label className="f4">Entry time:</label><br />
                            <p>{time}</p>
                            <button onClick={this.onClickSubmit} className="pa2">Submit</button>
                        </div>
                    </div>
                </Tilt>
                <Tilt scale={0.01} transitionSpeed={25000} className="w5 ">
                    <div className="tilt-scale outline ma2 pa2 pointer bg-white " >
                        <div>
                            <p className="tc f3">My Attendance Report</p>
                            <label className="f4">From date:</label><br />
                            <input onChange={this.onChangeFromDate} className="pa2 mb2" type="Date" pattern="\d{2}-\d{2}-\d{4}" /><br />
                            <label className="f4">To date:</label><br />
                            <input onChange={this.onChangeToDate} className="pa2 mb2" type="Date" pattern="\d{2}-\d{2}-\d{4}" /><br />
                            <button onClick={this.toGetReport} className="pa2" >Submit</button>
                        </div>
                    </div>
                </Tilt>
                {
                    Object.keys(this.state.report).length>0?<AttendanceTable attrepo={this.state.report}/>:''
                }
            </div>
        )
    }
}
class AttendanceTable extends React.Component {
    constructor(props){
        super();        
    }
    render() {  
        const attreport=this.props.attrepo      
        const theaders = ['Employee Id', "Date", "present"]
        return (
            <div>
                <Table bordered hover variant="dark" cellPadding="10px" cellSpacing="0px" className="ba w-75 bg-black-50 white-50 b--black-50 ma3  center">
                    <thead className="" >
                        <tr className=" hover-bg-black hover-white pointer ">
                            <th className=" bb bt br pa2 b--black-50">{theaders[0]}</th>
                            <th className=" bb bt br pa2 b--black-50">{theaders[1]}</th>
                            <th className=" bb bt br pa2 b--black-50">{theaders[2]}</th>                            
                        </tr>
                    </thead>
                    <tbody >
                        {
                            (attreport).map((data, i) => {
                                return (<tr className="pointer" key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.date.substring(0, 10)}</td>
                                    <td>{data.present}</td>                                    
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </div>


            
        )
    }
}
export default Attendance
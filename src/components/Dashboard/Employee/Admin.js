import React from 'react'
import './Todo'
import MenuItems from './MenuItems'
import Home from './Menuitems/Home'
import Profile from './Menuitems/Profile'
import Attendance from './Menuitems/Attendance'
import Salary from './Menuitems/Salary'
import Editemployee  from "./Menuitems/Editemployee"
import Changesalary  from "./Menuitems/Changesalary";
import Addemployee  from "./Menuitems/Addemployee";
import PayrollReport from './Menuitems/Payrollreport'
import Payroll from './Menuitems/Payroll'
import EmployeeView from './Menuitems/EmployeeView'



class Admin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            menuItem: 'Home'
        }
    }
    onClickSignOut=()=>{
        fetch("http://localhost:8080/signout",{
            method:"get",
            credentials:'include',
            mode:"cors"
        })
        .then(res =>res.json())
        .then(status=>{
            if(status==="signedOut"){
                this.props.onSubmit(status)
            }
        })
    }
    onClickItem = (selectedItem) => {
        this.setState({ menuItem: selectedItem })
        //console.log(this.state.menuItem)
    }
    switchMenu = (item) => {
        const menu=item===''?'Home':item
        const user=this.props.userDetails
        console.log(user)
        switch (menu) {
            case 'Home': return <Home />
            case 'My Profile': return <Profile userDetails={user}/>
            case 'Attendance': return <Attendance userDetails={user}/>
            case 'Employee Details':return <EmployeeView/>
            case 'Salary Report':return <Salary/>
            case 'Edit Employee Profile':return <Editemployee/>
            case 'Edit Salary Details':return <Changesalary/>
            case 'Add Employee':return <Addemployee/>
            case 'Payroll':return <Payroll/>
            case 'Payroll Report':return <PayrollReport/>
            default: return <Home />
        }
    }
    render() {
        let item = this.state.menuItem        
        //console.log(onSubmit)
        return (
            <div className="mw9 center ph-ns">
                <div className=" ph-ns  ">
                    <div className="fl  w-10 w-20-ns ph2-l">
                        <div className="pv2 ">
                            <div className="flex flex-column  dt-l w-100 border-box bg-near-black  ph2-l">
                                <div className="  v-mid w-100 w-75-l tc ">
                                    <p className="link dim white f6 f5-l pointer" onClick={()=>this.onClickItem('Home')}  >Payroll Management</p>
                                </div>
                            </div>
                            <div className="flex flex-column w-100 pv2 ">
                                <MenuItems menuItem='Home' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Attendance' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Salary Report' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Employee Details' onClickItem={this.onClickItem} />                                
                                <MenuItems menuItem='Edit Employee Profile' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Add Employee' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Edit Salary Details' onClickItem={this.onClickItem}/>
                                <MenuItems menuItem='Payroll' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='Payroll Report' onClickItem={this.onClickItem} />
                                <MenuItems menuItem='My Profile' onClickItem={this.onClickItem} />
                                
                            </div>
                        </div>
                    </div>
                    <div className="fl  w-10 w-80-ns  ">
                        <div className="pv2 ">
                            <div className="flex flex-column   dt-l w-100 border-box bg-near-black  ph2-l">
                                <div className=" dtc-l v-mid w-100 w-75-l tc tr-l">
                                    
                                    <p className="link dim white f6 f5-l dib mr3 mr4-l pointer" onClick={this.onClickSignOut} title="Sign out">Sign out</p>
                                    
                                </div>
                            </div>
                            { this.switchMenu(item)}                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Admin
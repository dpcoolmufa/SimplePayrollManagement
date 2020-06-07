import React from 'react'
import './Todo'
import MenuItems from './MenuItems'
import Home from './Menuitems/Home'
import Profile from './Menuitems/Profile'
import Attendance from './Menuitems/Attendance'
import Salary from './Menuitems/Salary'

class Employee extends React.Component {
    constructor(props) {
        super()
        this.state = {
            menuItem: 'Home'
        }
    }
    onClickItem = (selectedItem) => {
        this.setState({ menuItem: selectedItem })
        //console.log(this.state.menuItem)
    }
    switchMenu = (item) => {
        const menu=item===''?'Home':item
       // console.log(menu)
        switch (menu) {
            case 'Home': return <Home />
            case 'My Profile': return <Profile />
            case 'Attendance': return <Attendance/>
            case 'Salary Report':return <Salary/>
            default: return <Home />
        }
    }
    render() {
        let item = this.state.menuItem
        const {onSubmit}=this.props
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
                                <MenuItems menuItem='My Profile' onClickItem={this.onClickItem} />
                            </div>
                        </div>
                    </div>
                    <div className="fl  w-10 w-80-ns  ">
                        <div className="pv2 ">
                            <div className="flex flex-column   dt-l w-100 border-box bg-near-black  ph2-l">
                                <div className=" dtc-l v-mid w-100 w-75-l tc tr-l">
                                    
                                    <p className="link dim white f6 f5-l dib mr3 mr4-l pointer" onClick={()=>onSubmit('signedOut')} title="Sign out">Sign out</p>
                                    
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
export default Employee
import React from 'react'
import Tilt from 'react-tilt'
import TodoApp from '../Todo'
import Calendar from 'react-calendar'
const Home = () => {
    return (
        <div className="flex flex-wrap pv2 ">
            <Tilt scale={0.05} transitionSpeed={2500} className="w5">
                <div className="tilt-scale outline ma2 pointer ">
                    <div ><Calendar /></div>
                </div>
            </Tilt>
            <Tilt scale={0.05} transitionSpeed={2500} className=" w5">
                <div className="tilt-scale outline ma2 pointer ">
                    <div><TodoApp /></div>
                </div>
            </Tilt>
        </div>
    )
}
export default Home
import React from 'react'
import Tilt from 'react-tilt'
import './logo.css'
import logo from './logo.png'

const Logo = () => {
    return (
        <div className="ma4 nt0 ">
            <Tilt className="Tilt br2 shadow-2  parallax-effect" perspective={500} options={{ max: 55 }} style={{ height: 100, width: 100  }} >
                <div className="Tilt-inner "> <img style={{paddingTop:'2px',paddingLeft:'5px'}}alt="brain"src={logo}/> </div>
            </Tilt>
        </div>
    );
}
export default Logo;
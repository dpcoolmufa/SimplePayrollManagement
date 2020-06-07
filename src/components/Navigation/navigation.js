import React from 'react'
import Logo from '../Logo/logo'
const Navigation = () => {
    return (

        <nav className="db dt-l w-100 border-box pa2 ph5-l">
            <div className="db dtc-l v-mid mid-gray  dim w-100 w-25-l tc tl-l mb2 mb0-l" >
                <Logo />
            </div>
            <div className="db dtc-l v-mid  w-75-l tc tr-l">
                <p className="f5 link dim link underline  pointer tr" >Sign in</p>
            </div>
        </nav>

    )
}
export default Navigation;
import React from 'react'
const menuItems = ({menuItem,onClickItem}) => {
    return (
        <div className="outline w-100 pv3 tc mb2 mv2 black f5 pointer hover-bg-black hover-white " onClick={()=>onClickItem(menuItem)}>
            <div>{menuItem}</div>
        </div>
    )
}
export default menuItems
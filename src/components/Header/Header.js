import React, { useContext } from 'react';
import './Header.css';
import SideBar from '../SideBar/SideBar';
import TableNav from '../TableNav/TableNav'
import {context} from '../ContextApi/context';
const Header = () => {
    const {myFunction}=useContext(context);
    const user=localStorage.getItem("email").split("@")[0].toUpperCase();
  return (
    <div className='main-container'>
        <div className='sideBar'>
            <SideBar/>
        </div>
        <div className='middle-container'>
            <div className='header-container'>
                <div className='total-contact'>Total Contacts</div>
                <div className='search'>
                    <img src="Images/search.png" alt="" width="20px" />
                    <input type="search" placeholder="Search by Email Id....." id="myInput" onKeyUp={()=>myFunction()} />
                </div>
                <div className='user-container'>
                  <div className='user-image'>
                      <img src="Images/user.png" alt="user" />
                  </div>
                  <div className='user-details'>
                      <p style={{ fontSize: "20px", color: "#0a89e4f0" }} >{user}</p>
                      <p className='user-type'>Super Admin</p>
                  </div>
                </div>
            </div>
            <div className='tableNav-container'>
                <TableNav/>
            </div>
        </div>
    </div>
  )
}

export default Header;
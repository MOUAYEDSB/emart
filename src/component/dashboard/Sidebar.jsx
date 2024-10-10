import React from 'react'
import { NavLink } from 'react-router-dom';
import { 
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, 
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill 
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/dashboard" activeClassName="active">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/products" activeClassName="active">
            <BsFillArchiveFill className='icon' /> Products
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/categories" activeClassName="active">
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/customers" activeClassName="active">
            <BsPeopleFill className='icon' /> Customers
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/inventory" activeClassName="active">
            <BsListCheck className='icon' /> Inventory
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/reports" activeClassName="active">
            <BsMenuButtonWideFill className='icon' /> Reports
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/settings" activeClassName="active">
            <BsFillGearFill className='icon' /> Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

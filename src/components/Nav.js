/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Nav() {
  return (
    <div id="header" class="header navbar-default align-items-center">
      <div class="navbar-header">
        <a href="#" class="navbar-brand">
          <img src="assets/img/logo.svg" alt=""/>
        </a>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <ul class="navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle f-s-14">
            <img src="assets/img/notifications.svg" alt=""/>
          </a>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle f-s-14">
            <img src="assets/img/mail.svg" alt="" /> 
          </a>
        </li>
        <li class="dropdown navbar-user align-items-center">
          <a href="#" class="dropdown-toggle">
            <img src="assets/img/profile-img.svg" alt="" /> 
            <span class="d-none d-md-inline">User name</span>
          </a>
        </li>
        <li class="dropdown headerMenuIc">
          <a href="#" class="dropdown-toggle">
            <img src="assets/img/menu.svg" alt="" /> 
          </a>
        </li>
      </ul>
    </div>
  )
}

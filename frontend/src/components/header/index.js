import React, {useState} from 'react';
import './header.css';
import {Link} from "react-router-dom";
import {logOut} from '../../store/actions/authActions'
import { connect } from 'react-redux'

function Header(props) {
	const {isAuth} = props.authReducer
    var authMode = {};
	var nauthMode = {};
	
if(isAuth){
	authMode.display = 'none';
  }
  if(!isAuth){
	nauthMode.display = 'none';
  }

    return (
		<header className='container'>
		<nav className="navbar navbar-expand-md">
            <div className='box'></div>
		   <a className="navbar-brand" id="cloth" >Jobify</a>
		   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
			   <span className="navbar-toggler-icon"></span>
		   </button>
		   <div className="collapse navbar-collapse  d-flex justify-content-end" id="collapsibleNavbar">
			   <ul className="navbar-nav">
			   <li className="nav-item"> <Link to='/' class="nav-link" >Домой</Link></li>
               <li className="nav-item"><Link to='/explore' class="nav-link">Новости</Link></li>
			   <li className="nav-item" ><Link to='/profile' class="nav-link">Профиль</Link> </li>
			   <div style={authMode}>
				<li className="nav-item active" ><Link to='/auth' class="nav-link"   id="active" >Войти</Link> </li>
				</div>
				<div style={nauthMode}>
				<li className="nav-item" onClick={props.logOut} ><a class="nav-link">Выйти </a></li>
				</div>
			    
			   </ul>
		   </div>  
		   </nav>
	   </header>
    );
  }
  
  const mapStateToProps = state => ({
	authReducer: state.authReducer
  })
  
  const mapDispatchToProps = {
	logOut,
  }
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Header)
  
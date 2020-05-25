import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './auth.css'
import {logIn,signUp } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import {errorReset} from '../../store/actions/errorActions'
import { useHistory } from 'react-router-dom';

function Auth(props) {
    const {isAuth} = props.authReducer
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: ``,
        password: ``
      })
    const {error} = props.errorReducer

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
      }

      const [formDataS, setFormDataS] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      })
    const handleChangeS = e => {
        setFormDataS({...formDataS, [e.target.name]: e.target.value})
      }
    const validateMessages = {
		required: '${label} is required!',
		types: {
		  email: '${label} is not validate email!',
		  number: '${label} is not a validate number!',
		},
		number: {
		  range: '${label} must be between ${min} and ${max}',
		},
	  };
      const handleLog = (e) => {
        e.preventDefault();
        props.logIn(formData)
        props.errorReset()
      };
      if(isAuth){
        history.push("/");
      }
      const handleSign = (e) => {
        e.preventDefault();
        props.signUp(formDataS)
       // history.push("/auth");
        };
  return (
    <div className="Auth">
        <Header />
           <div className='container base'>
               <div className='row'>
                    <div className='col-5 login-title'>
                        <h2> Добро пожаловать!</h2>
                        <div className='line'></div>
                        <h5>Войти / Регистрация</h5>
                    </div>
                    <div className='col-7'>
                        <img className='logo' src='images/4.png'/>
                    </div>
               </div>
               <br />
            <div className='row'>
                <div className='col-5 login' >
                    <form onSubmit={handleLog} validateMessages={validateMessages}>
                        <h5>Войти</h5>
                        <input  className='inputV' type='text' placeholder='Юзернэйм..' name="username" value={formData.username} onChange={handleChange}/><br />
                        <input  className='inputV' type='password' placeholder='Пароль..' name="password" value={formData.password} onChange={handleChange}/><br />
                        <button  className='buttonV' type='submit'>Войти </button><br />
                    </form>
                    {error.detail && <span style={{color: `tomato`}}> {error.detail} <br/></span>} 
                </div>
                <div className='col-1 or' >или</div>
                <div className='col-5 login' >
                    <form onSubmit={handleSign} validateMessages={validateMessages}>
                        <h5>Регистрация</h5>
                        <input className='inputV' type='text' placeholder='Юзернэйм..' name="username" value={formDataS.username} onChange={handleChangeS}/><br />
                        <input  className='inputV' type='text' placeholder='Имя..' name="first_name" value={formDataS.first_name} onChange={handleChangeS}/><br />
                        <input  className='inputV' type='text' placeholder='Фамилия..' name="last_name" value={formDataS.last_name} onChange={handleChangeS}/><br />
                        <input  className='inputV' type='text' placeholder='Email..' name="email" value={formDataS.email} onChange={handleChangeS}/><br />
                        <input  className='inputV' type='password' placeholder='Пароль..' name="password" value={formDataS.password} onChange={handleChangeS}/><br />
                        <button  className='buttonV' type='submit'>Регистрация </button><br />
                    </form>
                    {error.detail && <span style={{color: `tomato`}}> {error.detail} <br/></span>}
                </div>
            </div>
           </div>
           <br /><br />
        <Footer />
    </div>
  );
}


const mapStateToProps = state => ({
    authReducer: state.authReducer,
    errorReducer: state.errorReducer
  })
  
  const mapDispatchToProps = {
    logIn,
    errorReset,
    signUp
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
  
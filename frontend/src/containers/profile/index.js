import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './profile.css'
import {getUserInfo} from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
import Item from 'antd/lib/list/Item';
const onMount = props => () => {
 props.getUserInfo()
}


function Profile(props) {
  const {isAuth} = props.authReducer
  useEffect(onMount(props), [])
  const {user_info} = props.authReducer
  const useri = user_info.map(item => (
    <div className='row'>
    <div className='col-8 light'>
     <div className='row'> <div className='col-2 hor'></div><h4 className='col-2 tit'>О себе </h4><div className='col-8 hor'></div></div>
         <div className='row'>
            <img className='ic' src='images/bm.png'/>
            <p className='about'> {item.about}</p>
           </div>
           <div className='row'>
            <img className='ic' src='images/birthday.png'/>
            <p className='about'><b> Дата Рождения: </b>{item.birthday}</p>
           </div>
           <div className='row'>
            <img className='ic' src='images/city.png'/>
            <p className='about'><b> Город: </b>{item.city}</p>
           </div>
           <div className='row'> <div className='col-4 hor'></div><h5 className='col-3 tit'> Образование </h5><div className='col-5 hor'></div></div>
           <div className='row'>
            <img className='ic' src='images/univer.png'/>
            <p className='about'><b> Университет/Колледж:  </b>{item.univer.title} ({item.degree.title})</p>
           </div>
            <p className='about'><b> Cфера деятельности:  </b>{item.job_area.title}</p>
            <div className='row'> <div className='col-7 hor'></div><h5 className='col-3 tit'> Опыт работы </h5><div className='col-2 hor'></div></div>
            <div className='row'>
            <img className='ic' src='images/kn.png'/>
            {item.techno.map(i => ( <p className='techno'>{i.title} </p>))}
           </div>
    </div>

    <div className='col-4 dark'>
      <img className='photo' src={item.thumbnailPath || 'images/1.jpg'} alt='product photo'/>
      <h5 className='fname'>{item.user.first_name} 
      <b className='lname'>{item.user.last_name}</b></h5>
      <div className='hor'></div>
      <div className='con'>
        <p className='contacts'>Контакты:</p>
          <div className='row d'>
            <img className='cicon' src='images/e.png'/>
            <p className='citem'>{item.user.email || 'email'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/p.png'/>
            <p className='citem'>{item.instagram_link || 'phone'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/g.png'/>
            <p className='citem'>{item.github_link || 'github'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/i.png'/>
            <p className='citem'>{item.instagram_link || 'instagram'}</p>
           </div>
           <div className='row'>
            <img className='cicon' src='images/l.png'/>
            <p className='citem'>{item.linkedin_link || 'linkedin'}</p>
           </div>
      </div>
    </div>
    </div>
 ))

 var authMode = {};
 var nauthMode = {};
 var emptyMode ={}; 
 if(!isAuth){
  authMode.display = 'none';
  emptyMode.display = 'none';
  }
if(isAuth){
  nauthMode.display = 'none';
  if(user_info.length===0){
   authMode.display = 'none';
  }else{
    emptyMode.display = 'none';
  }
  }
    return (
    <div className="Profile">
      <Header />
      <div className='auth' style={authMode}>
        {useri}
      </div>
      <div className='nauth' style={nauthMode}>
      <Result
        status="403"
        title="403"
        subTitle="Пожалуйста, пройдите авторизацию :)"
        
      />
      </div>
      <div className='empty' style={emptyMode}>empty</div>
        <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  authReducer: state.authReducer,
})

const mapDispatchToProps = {
getUserInfo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

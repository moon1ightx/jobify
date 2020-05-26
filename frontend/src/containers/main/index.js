import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import {getCompanies, getInternships, getVacancies} from '../../store/actions/mainActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import './main.css'
const onMount = props => () => {
    props.getVacancies()
    props.getInternships()
    props.getCompanies()
  }

function Main(props) {
    useEffect(onMount(props), [])

    const {vacancies, internships, companies} = props.mainReducer
    const vacancyList = vacancies.map(item => (
      <div className='boxs col-2 col-s-2'>  <Link className='li' to='/vacancy' >{item.title}</Link> <p className='des'>Компания : {item.company.name}</p></div>
    ))

    const companyList = companies.map(item => (
      <div className=' boxz col-2 col-s-2'>
       <img className='comp' src={item.thumbnailPath || 'images/1.jpg'} alt='company photo'/></div>
     ))

     const internshipList = internships.map(item => (
      <div className='boxs col-2 col-s-2'>   <Link className='li' to='/inter' >{item.title}</Link><p className='des'>Компания : {item.company.name}</p></div>
     ))
  return (
    <div className="Main">
        <Header />
        <div className='base' >
        <div className='container' >
          <div className='row'>
            <div className=' col-6 login-title'>
              <h3>Добро Пожаловать в <b className='lb'>Jobify </b>:)</h3>
              <h5>Построй с нами свое будущее!</h5>
              <button  className='buttonV' type='submit'>Начать </button><br />
              </div>
              <div className=' col-6'>
              <img className='logo' src='images/5.png'/>
              </div>
            </div>
            </div>
        </div>
        <div className='us'>
          <div className='container'>
          <h5 className='gr'>Что мы предлагаем?</h5>
          <p>Часто можно встретить такую ситуацию, когда выпускники и студенты
старших курсов не могут найти работу по специльаности.
Главная причина кроется в том, что большинство работодателей трубуют опыт
работы, который чаще всего отсутсвует.</p>
<br />
        <h5  className='gr'>Мы решим эту проблему!</h5>
        <br />
          <div className="row">
            <div className="col-4">
            <img className='icm' src='images/q1.png'/>
              <p>Протестируем Ваши знания</p>
            </div>
            <div className="col-4">
            <img className='icm' src='images/q2.png'/>
              <p>Пополним Ваше резюме
ценным опытом </p>
            </div>
            <div className="col-4">
            <img className='icm' src='images/q3.png'/>
              <p>Поможем найти работодателя,
который оценит ваш труд</p>
            </div>
          <div className='p'></div>
          </div>
          <div className="row"><div className='col-2 lines'/>
            <div className='col-2'><h5>Вакансии</h5></div>
            <div className='col-8 lines'/></div>
          </div>
        </div>
        <div className='container' ><div className="row">{vacancyList}</div></div>
        <div className='container' >
        <div className="row"><div className='col-5 lines'/>
            <div className='col-2'><h5>Стажировки</h5></div>
            <div className='col-5 lines'/></div>
        <div className="row"> {internshipList}</div></div>
        <div className='container' >
        <div className="row"><div className='col-8 lines'/>
            <div className='col-2'><h5>Компании</h5></div>
            <div className='col-2 lines'/></div>
          <div className="row"> {companyList}</div></div>
           
        <Footer />
    </div>
  );
}

const mapStateToProps = state =>({
  mainReducer: state.mainReducer
})

const mapDispatchToProps = {
  getCompanies, getInternships, getVacancies
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Main))
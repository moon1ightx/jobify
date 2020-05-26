import React, {useEffect} from 'react';
import {  Link } from "react-router-dom";
import { getVacancies} from '../../store/actions/mainActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './vacancy.css'
const onMount = props => () => {
    props.getVacancies()
   
  }

function Vacancy(props) {

    useEffect(onMount(props), [])

    const {vacancies} = props.mainReducer
    const vacancyList = vacancies.map(item => (
      <div className='boxs col-5 col-s-5'> 
       <h5 >{item.title}</h5>
       <hr />
    <p className='des' >{item.description}</p>
    <p >Компания : {item.company.name}</p><p >Сфера : {item.job_area.title}</p>
    <p className='des' > Минимальный опыт работы:  {item.experience} мес.</p>
    <p className='des' > Минимальная зарплата:  {item.salary} тг.</p>
    <p >Бонусы: {item.perks}</p>
    <div className='row'>{item.techno.map(i => ( <p className='techno'>{i.title} </p>))}</div>
       </div>
      
    ))
  

  return (
    <div className="Vacancy">
       <Header />
       <div className='container don'>
           <div className='row'>
           {vacancyList}
           </div>
       </div>
       <Footer />
    </div>
  );
}


const mapStateToProps = state =>({
    mainReducer: state.mainReducer
  })
  
  const mapDispatchToProps = {
     getVacancies
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Vacancy))
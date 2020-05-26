import React, {useEffect, useState} from 'react';
import {  Link } from "react-router-dom";
import { getTests, addRoadmap} from '../../store/actions/exploreActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './quiz.css'
import { useHistory } from 'react-router-dom';

const onMount = (props, id) => () => {
    props.getTests(id)
   
  }
function Quiz(props) {
  const {isAuth} = props.authReducer
  const d = props.location.stack.item.id
  const history = useHistory();
  console.log(d)
  const handleLog = (e) => {
    if(isAuth){
    e.preventDefault();
    props.addRoadmap(formData)
    history.push("/profile");
    }else{
      history.push("/auth");
    }
  };
    useEffect(onMount(props, d), [])
    const [formData, setFormData] = useState({
      title: 'Roadmap для Мобильной разработки',
      plan: [1,2]
    })
   
    const {tests} = props.exploreReducer
    const listi = tests.map(item => (
      <div className='container ds'> 
       <h5 >{item.title}</h5>
       <div className='row'><p className='iu'>{item.stack.title}</p><p className='iu'>Популярность: {item.stack.popularity} </p></div>
    <div className='row'>{item.stack.techno.map(i => ( <p className='techno'>{i.title} </p>))}</div>
    <div className='container'>{item.quiz.map(i => ( 
    <div>
      <hr />
      <p className='qu'><b className='qub'>{i.id})</b>{i.quesiton} </p>
        <div className='row'>
         <label className='var'> <input className='vari' type='radio' name={i.quesiton} value={i.var1}/>{i.var1}</label>
         <label className='var'> <input className='vari' type='radio' name={i.quesiton} value={i.var2}/>{i.var2}</label>
      </div>
    </div>
    ))}</div>
    <form onSubmit={handleLog}> <button  className='buttonV' type='submit'>ОК </button><br /></form>
       </div>
      
    ))
  

  return (
    <div >
       <Header />
       <div className='container don'>
           <div className='row'>
           {listi}
           </div>
       </div>
       <Footer />
    </div>
  );
}


const mapStateToProps = state =>({
    exploreReducer: state.exploreReducer,
    authReducer: state.authReducer
  })
  
  const mapDispatchToProps = {
     getTests, addRoadmap
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Quiz))
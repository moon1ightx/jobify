import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import {getHackathons, getStacks, getStories} from '../../store/actions/exploreActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import './explore.css'

const onMount = props => () => {
  props.getStories()
  props.getStacks()
  props.getHackathons()
}

function Explore(props) {

  useEffect(onMount(props), [])

  const {hackathons, stacks, stories} = props.exploreReducer

  const hackList = hackathons.map(item => (
    <div className='xc'>
   <div className="row">
        <div className='col-3'> 
      <img className='hack' src={item.thumbnailPath || 'images/1.jpg'} alt='company photo'/>
      </div>
      <div className='col-9'>
      <h5>{item.title}</h5>
  <p className='des'>{item.description}</p>
  <div className='row'>
            <img className='ic' src='images/city.png'/>
            <p className='cxz'>Место: {item.place}</p>
            <p> Время: {item.time}</p>
           </div>
  <div className='row'>{item.job_area.map(i => ( <p className='techno'>{i.title} </p>))}</div>
  <p>{item.source}</p>
        </div>
         </div>
   </div>
  ))
 

  const storyList = stories.map(item => (
    <div className='boxs col-3 col-s-3'>  <Link className='li' to='/story' >{item.title}</Link></div>
   ))

   const stackList = stacks.map(item => (
    <div className='xc'>
    <div className="row">
         
       <div className='col-9'>
       <h5>{item.title}</h5>
   <p className='des'>{item.description}</p>
   <div className='row'>
   <p className='iu'>Сфера: {item.job_area.title}</p><p className='iu'>Популярность: {item.popularity}</p>
   </div>
   <div className='row'>{item.techno.map(i => ( <p className='techno'>{i.title} </p>))}</div>
         </div>
         <div className='col-3'>
         <button  className='buttonV' type='submit'><Link className='li' to={{pathname:"/quiz", stack:{item} }}>Пройти Тест </Link></button>

       </div>
          </div> 
    </div>
   ))


  return (
    <div className="Explore">
     <Header />
     <div className='container bn'>
      <div className='row'>
        <h5>Хакатоны</h5>
      {hackList}
      </div><hr/>
      <div className='row'>
      <h5>Истории успеха</h5>
      </div>
      <div className='row'>
      {storyList}
      </div><hr/>
      <div className='row'>
      <h5>Популярные темы</h5>
      </div>
      <div className='row'>
      {stackList}
      </div>
     </div>
     <Footer />
    </div>
  );
}

const mapStateToProps = state =>({
  exploreReducer: state.exploreReducer
})

const mapDispatchToProps = {
  getHackathons, getStacks, getStories
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Explore))
import React, {useEffect} from 'react';
import {  Link } from "react-router-dom";
import { getStories} from '../../store/actions/exploreActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './story.css'
const onMount = props => () => {
    props.getStories()
   
  }

function Story(props) {

    useEffect(onMount(props), [])

    const {stories} = props.exploreReducer
    const listi = stories.map(item => (
      <div className='xc'>
   <div className="row">
        <div className='col-3'> 
      <img className='hack' src={item.thumbnailPath || 'images/1.jpg'} alt='company photo'/>
      </div>
      <div className='col-9'>
      <h5>{item.title}</h5>
  <p className='des'>{item.description}</p>
  <p>{item.source}</p>
  </div></div></div>
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
    exploreReducer: state.exploreReducer
  })
  
  const mapDispatchToProps = {
     getStories
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Story))
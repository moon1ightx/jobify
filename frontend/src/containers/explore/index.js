import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import {getHackathons, getStacks, getStories} from '../../store/actions/exploreActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


const onMount = props => () => {
  props.getStories()
  props.getStacks()
  props.getHackathons()
}

function Explore(props) {

  useEffect(onMount(props), [])

  const {hackathons, stacks, stories} = props.exploreReducer

  const hackList = hackathons.map(item => (
     <p>{item.title}</p>
  ))

  const storyList = stories.map(item => (
      <p>{item.title}</p>
   ))

   const stackList = stacks.map(item => (
      <p>{item.title}</p>
   ))


  return (
    <div className="Explore">
     <Header />
        {hackList}
        {stackList}
        {storyList}
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
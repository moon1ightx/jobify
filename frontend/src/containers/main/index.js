import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import {getCompanies, getInternships, getVacancies} from '../../store/actions/mainActions'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

const onMount = props => () => {
    props.getVacancies()
    props.getInternships()
    props.getCompanies()
  }

function Main(props) {
    useEffect(onMount(props), [])

    const {vacancies, internships, companies} = props.mainReducer

    const vacancyList = vacancies.map(item => (
       <p>{item.title}</p>
    ))

    const companyList = companies.map(item => (
        <p>{item.name}</p>
     ))

     const internshipList = internships.map(item => (
        <p>{item.title}</p>
     ))

  return (
    <div className="Main">
        <Header />
           {vacancyList}
           {internshipList}
           {companyList}
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
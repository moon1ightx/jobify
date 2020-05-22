import axios from 'axios'
import {GET_COMPANIES, GET_INTERNSHIPS, GET_VACANCIES} from './types'

export const getCompanies = () => dispatch =>{
    axios.get('/api/companies')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_COMPANIES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 
 export const getInternships = () => dispatch =>{
    axios.get('/api/internships')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_INTERNSHIPS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };

 export const getVacancies = () => dispatch =>{
    axios.get('/api/vacancies')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_VACANCIES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
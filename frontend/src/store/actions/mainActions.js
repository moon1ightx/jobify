import axios from 'axios'
import {GET_COMPANIES, GET_INTERNSHIPS, GET_VACANCIES, GET_TECHNOS, GET_UNIVERS, GET_JOB_AREAS, GET_DEGREES} from './types'

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
 export const getJobArea = () => dispatch =>{
    axios.get('/api/job_areas')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_JOB_AREAS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 export const getTechnos = () => dispatch =>{
    axios.get('/api/technology')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_TECHNOS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 export const getUnivers = () => dispatch =>{
    axios.get('/api/universities')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_UNIVERS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 export const getDegrees = () => dispatch =>{
    axios.get('/api/degrees')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_DEGREES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
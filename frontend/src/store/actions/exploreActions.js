import axios from 'axios'
import {GET_HACKATHONS, GET_STORIES, GET_STACKS, GET_TESTS, ADD_ROADMAP} from './types'

export const getHackathons = () => dispatch =>{
    axios.get('/api/hackathons')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_HACKATHONS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 
 export const getStacks = () => dispatch =>{
    axios.get('/api/stacks')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_STACKS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };

 export const getStories = () => dispatch =>{
    axios.get('/api/stories')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_STORIES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };

 export const getTests = (id) => dispatch =>{
    axios.get('/api/tests/'+id, { headers: {
        "Content-Type": undefined
    }
})
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_TESTS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 export const addRoadmap = data => dispatch =>{
    const fm = new FormData()
    Object.keys(data).map(key => {
        if(key !== 'plan') fm.append([key], data[key])
        else {
            data[key].map(plan => fm.append([key], plan))
        }
    })
    axios.post('/api/roadmap', fm, {
        headers: {
        "Content-Type": undefined
    }})
     .then(res => {
         dispatch({
             type: ADD_ROADMAP,
             payload: res.data
         })
        })
        .catch(err => console.log(err))
    };
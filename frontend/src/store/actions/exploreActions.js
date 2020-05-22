import axios from 'axios'
import {GET_HACKATHONS, GET_STORIES, GET_STACKS} from './types'

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
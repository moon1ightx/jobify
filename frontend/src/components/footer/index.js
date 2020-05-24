import React from 'react';
import {  Link } from "react-router-dom";
import './footer.css'
function Footer() {
  return (
    <div className="Footer">
        <div className='container'>
            <div className='row'>
                <div className='col-3'>
                    <b className='footer-title'>Searching Trends</b><br /><br />
                    <p>Vacancies</p>
                    <p>Internships</p>
                    <p>Companies</p>
                </div>
                <div className='col-3'>
                    <b className='footer-title'>Explore</b><br /><br />
                    <p>Hackathons</p>
                    <p>Stacks</p>
                    <p>Job Areas</p>
                    <p>Motivative stories</p>
                </div>
                <div className='col-3'>
                    <b className='footer-title'>Support</b><br /><br />
                    <p>About us</p>
                    <p>Privacy</p>
                    <p>Terms of use</p>
                </div>
                <div className='col-3'>
                    <b className='footer-title'>Contact us</b><br /><br />
                    <p>Instagram</p>
                    <p>Github</p>
                    <p>Youtube</p>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <p>2020 | This website made with luv by <b> Ainur & Aru</b></p>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    </div>
  );
}

export default Footer;
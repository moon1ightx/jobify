import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './profile.css'
import {getUserInfo, addUserInfo, getCV, getRoadmap, updateUserInfo} from '../../store/actions/authActions'
import {getDegrees, getUnivers,getJobArea, getTechnos } from '../../store/actions/mainActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Result } from 'antd';
import { Upload, message, Select } from 'antd';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const dateFormat = 'YYYY/MM/DD';
const {Option} = Select
const onMount = props => () => {
 props.getUserInfo()
 props.getDegrees()
 props.getUnivers()
 props.getJobArea()
 props.getTechnos()
 props.getRoadmap()
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


function Profile(props) {
  const history = useHistory();
	const [imageUrl, setImageUrl] = useState(``)
  const [loading, setLoading] = useState(false)
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const [formData, setFormData] = useState({
    about: '',
    phone: '',
    birthday: '',
    city: '',
    thumbnailPath: '',
    github_link: '',
    linkedin_link: '',
    instagram_link: '',
    univer: '',
    degree: '',
    job_area: '',
    techno: []
  })

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const fileChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
          setLoading(false);
          setImageUrl(imageUrl)
      });
  
      setFormData({...formData, thumbnailPath: info.file.originFileObj})
    }
  }
  const handleLog = (e) => {
    e.preventDefault();
    props.getCV()
  };
  const {isAuth} = props.authReducer
  useEffect(onMount(props), [])
  const {user_info, roadmap} = props.authReducer

  const useri = user_info.map(item => (
    <div className='row'>
    <div className='col-8 light'>
     <div className='row'> <div className='col-2 hor'></div><h4 className='col-2 tit'>О себе </h4><div className='col-8 hor'></div></div>
         <div className='row'>
            <img className='ic' src='images/bm.png'/>
            <p className='about'> {item.about}</p>
           </div>
           <div className='row'>
            <img className='ic' src='images/birthday.png'/>
            <p className='about'><b> Дата Рождения: </b>{item.birthday}</p>
           </div>
           <div className='row'>
            <img className='ic' src='images/city.png'/>
            <p className='about'><b> Город: </b>{item.city}</p>
           </div>
           <div className='row'> <div className='col-4 hor'></div><h5 className='col-3 tit'> Образование </h5><div className='col-5 hor'></div></div>
           <div className='row'>
            <img className='ic' src='images/univer.png'/>
            <p className='about'><b> Университет/Колледж:  </b>{item.univer.title} ({item.degree.title})</p>
           </div>
            <p className='about'><b> Cфера деятельности:  </b>{item.job_area.title}</p>
            <div className='row'> <div className='col-7 hor'></div><h5 className='col-3 tit'> Опыт работы </h5><div className='col-2 hor'></div></div>
            <div className='row'>
            <img className='ic' src='images/kn.png'/>
            {item.techno.map(i => ( <p className='techno'>{i.title} </p>))}
           </div>
           <form onSubmit={handleLog}><label><b className='redd'>*</b>При нажатии на эту кнопку мы отправим Вам на почту СV</label><button  className='buttonV' type='submit'>Получить CV </button><br /></form>
          <br /><hr /><br />
           {roadmap.map(i => ( 
             <div>
           <h5 >{i.title} </h5>
           <div className='row'>
           {i.plan.map(iX => (
              <div className='boxs'> 
              <p className='des'>{iX.title} </p>
              <p >Полезные источноки:</p><p  className='des'>{iX.useful_links} </p>
              <p  className='des'>{iX.tutorials} </p>
              {iX.techno.map(iz => ( <p className='techno'>{iz.title} </p>))}
              </div>
              ))}
           </div>
           </div>
           ))}
    </div>

    <div className='col-4 dark'>
      <img className='photo' src={item.thumbnailPath || 'images/1.jpg'} alt='product photo'/>
      <h5 className='fname'>{item.user.first_name} 
      <b className='lname'>{item.user.last_name}</b></h5>
      <div className='hor'></div>
      <div className='con'>
        <p className='contacts'>Контакты:</p>
          <div className='row d'>
            <img className='cicon' src='images/e.png'/>
            <p className='citem'>{item.user.email || 'email'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/p.png'/>
            <p className='citem'>{item.instagram_link || 'phone'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/g.png'/>
            <p className='citem'>{item.github_link || 'github'}</p>
           </div>
           <div className='row d'>
            <img className='cicon' src='images/i.png'/>
            <p className='citem'>{item.instagram_link || 'instagram'}</p>
           </div>
           <div className='row'>
            <img className='cicon' src='images/l.png'/>
            <p className='citem'>{item.linkedin_link || 'linkedin'}</p>
           </div>
           <button  className='buttonZ' type='submit'><Link className='lix'  to={{pathname:"/edit", hunter:{item}}}> Редактировать</Link></button>
      </div>
    </div>
    </div>
 ))

 var authMode = {};
 var nauthMode = {};
 var emptyMode ={backgroundImage: `url(${'images/6.jpg'})`}; 
 if(!isAuth){
  authMode.display = 'none';
  emptyMode.display = 'none';
  }
if(isAuth){
  nauthMode.display = 'none';
  if(user_info.length===0){
   authMode.display = 'none';
  }else{
    emptyMode.display = 'none';
  }
  }
  const jChange = value => {
    var e = document.getElementById("j");
    var ja = e.options[e.selectedIndex].value;
    setFormData({...formData, job_area: ja})
    console.log(formData.job_area)
  }

  const dChange = value => {
    var e = document.getElementById("d");
    var de = e.options[e.selectedIndex].value;
    setFormData({...formData, degree: de})
  }
  const uChange = value => {
    var e = document.getElementById("u");
    var un = e.options[e.selectedIndex].value;
    setFormData({...formData, univer: un})
  }

  const tChange = value => {
    const selected = document.querySelectorAll('#sel option:checked');
    const values = Array.from(selected).map(el => el.value);
    setFormData({...formData, techno: values})
  }
  const handleOk = (e) => {
    e.preventDefault();
      props.addUserInfo(formData)
      history.push("/");
    };
   

  const {univers, degrees, job_areas, technos} = props.mainReducer
    return (
    <div className="Profile">
      <Header />
      <div className='auth' style={authMode}>
        {useri}
      </div>
      <div className='nauth' style={nauthMode}>
      <Result
        status="403"
        title="403"
        subTitle="Пожалуйста, пройдите авторизацию :)"
        
      />
      </div>
      <div className=' row empty' style={emptyMode}>
      <div className='col-5'></div>
      <div className=' col-7 fore'>
      <form onSubmit={handleOk} >
        <h4>Заполните данные и получите <b>Резюме</b> ! ;) </h4>
       <h4>+</h4>
        <div className='row dc' >
        <div className='col'>
          <label><b className='redd'>*</b>  Телефон: </label>
        <input className='in-small' type='text' placeholder='870-777-77-77' name="phone" value={formData.phone} required onChange={handleChange}/><br />
          </div>
          <div className='col'>
          <label><b className='redd'>*</b> Город: </label>
        <input className='in-small' type='text' placeholder='Алматы' name="city" value={formData.city} required onChange={handleChange}/><br />
          </div>
        </div>
          <div className='col'>
          <label><b className='redd'>*</b> Дата Рождения: </label>
          <input className='in-big' type='date'  name="birthday" value={formData.birthday} required onChange={handleChange}/><br />
        </div>
        <div className='row'>
        <textarea placeholder='О себе ..' name="about" value={formData.description} onChange={handleChange} required/><br />
        </div>
        <div className='row'>
        <label> Соц. сети: </label>
        <input  className='in-small' type='text' placeholder='github' name="github_link" value={formData.github_link} onChange={handleChange}/><br />
        <input  className='in-small' type='text' placeholder='instagram' name="instagram_link" value={formData.instagram_link} onChange={handleChange}/><br />
        <input  className='in-small' type='text' placeholder='linkedin' name="linkedin_link" value={formData.linkedin_link} onChange={handleChange}/><br />
        </div>
       <div className='row'>
       <label>  Образование: </label>
       < select className='big' onChange={jChange} name="job_area" id='j'>
					{job_areas.map(item => (<option  value={item.id}>{item.title}</option>))}
				</ select>
        < select className='big' onChange={uChange} name="univer" id='u'>
					{univers.map(item => (<option  value={item.id}>{item.title}</option>))}
				</ select>
        < select className='big' onChange={dChange} name="degree"id='d' >
					{degrees.map(item => (<option  value={item.id}>{item.title}</option>))}
				</ select>
       </div>
       <div className='row'>
       <label> Навыки: </label>
       < select multiple="multiple" className='bigc' id='sel' defaultValue={[]}  onChange={tChange} name="techno" >
					{technos.map(item => (<option  value={item.id}>{item.title}</option>))}
				</ select>
      </div>
       <br/>
        <label><b className='redd'>*</b>Фото профиля: </label>
        <Upload
                name="thumbnailPath"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={fileChange}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200px' }} /> : uploadButton}
            </Upload><br />
            <button className='buttonV'  type='submit'>Заполнить</button><br />
            </form>
      </div>
      </div>
        <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  mainReducer: state.mainReducer
})

const mapDispatchToProps = {
getUserInfo, addUserInfo, getDegrees, getUnivers, getTechnos, getJobArea, getCV, getRoadmap, updateUserInfo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

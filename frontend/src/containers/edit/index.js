import React, {useEffect, useState} from 'react';
import {  Link } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Footer  from '../../components/footer'
import './edit.css'
import { useHistory } from 'react-router-dom';
import { Result } from 'antd';
import { Upload, message, Select } from 'antd';
import {getDegrees, getUnivers,getJobArea, getTechnos } from '../../store/actions/mainActions'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { updateUserInfo} from '../../store/actions/authActions'

  const onMount = props => () => {
    props.getDegrees()
    props.getUnivers()
    props.getJobArea()
    props.getTechnos()
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

function Edit(props) {
  const {isAuth} = props.authReducer
  console.log(props.location.hunter.item.github_link)
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
    about: props.location.hunter.item.about,
    phone: props.location.hunter.item.phone,
    birthday: props.location.hunter.item.birthday,
    city: props.location.hunter.item.city,
    thumbnailPath:'',
    github_link: props.location.hunter.github_link,
    linkedin_link: props.location.hunter.linkedin_link,
    instagram_link: props.location.hunter.instagram_link,
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
      props.updateUserInfo(formData)
      history.push("/");
    };
   

  const {univers, degrees, job_areas, technos} = props.mainReducer
   
  var emptyMode ={backgroundImage: `url(${'images/6.jpg'})`}; 
  

  return (
    <div >
       <Header />
       <div className='container don'>
       <div className=' row empty' style={emptyMode}>
      <div className='col-5'></div>
      <div className=' col-7 fore'>
      <form onSubmit={handleOk} >
        <h4>Редактирование <b>Резюме</b> ! ;) </h4>
       <h4>+</h4>
        <div className='row dc' >
        <div className='col'>
          <label><b className='redd'>*</b>  Телефон: </label>
        <input className='in-small' type='text'  name="phone" value={formData.phone} required onChange={handleChange}/><br />
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
        <textarea placeholder='О себе ..' name="about" value={formData.about} onChange={handleChange} required/><br />
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
       </div>
       <Footer />
    </div>
  );
}


const mapStateToProps = state =>({
    mainReducer: state.mainReducer,
    authReducer: state.authReducer
  })
  
  const mapDispatchToProps = {
    getDegrees, getUnivers, getTechnos, getJobArea, updateUserInfo
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Edit))
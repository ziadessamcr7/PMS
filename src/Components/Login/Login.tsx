import { useContext, useState } from 'react';
import logo from '../../../src/assets/images/PMS 3.png'
import {useForm,useNavigate,toast} from '../../Utls/index.ts'
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Loading from '../Loading/Loading.js';


export default function Login() {
  let {url,saveUserData}:any=useContext(AuthContext);
  let navigate =useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const logIn = (data:object) => {
    setIsLoading(true)
    axios.post(`${url}Users/Login`,data).then(res=>{
      localStorage.setItem("userTkn",res.data.token);
      setIsLoading(false);
      saveUserData();
      toast.success("Successfuly");
      navigate("/dashboard");
    }).catch(err=>{
      setIsLoading(false);
      toast.error(err.response.data.message||"faild");
    })
  }

  return (
    <section id='login' className=''>

      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100'>
          <div className="col-md-6">
            <div className='text-center'>
              <img src={logo} style={{ width: '40%' }} alt="" />
            </div>
            <div className="from-bg p-5 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: 'rgb(227 156 26)' }} >Login</h2>
              <span className="login-underline"></span>

              <form onSubmit={handleSubmit(logIn)}>
                <label htmlFor="mail" style={{ color: 'rgb(227 156 26)' }}>Email</label>
                <input className="form-control"
                  type="email"
                  placeholder="Enter your e-mail"
                  id="mail" {...register('email', {
                    required: "email required",
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                  })} />
                {errors.email && errors.email.type === 'required' &&
                  (<span className='text-danger d-block'>Email is required</span>)}
                {errors.email && errors.email.type === 'pattern' && (<span className='text-danger d-block'>Enter a valid email</span>)
                }

                <label htmlFor="password" className="mt-4" style={{ color: 'rgb(227 156 26)' }}>Passwrod</label>
                <input className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  {...register('password', {
                    required: "password is required",
                    pattern: /^[A-Za-z\d@$!%*#?&]{6,15}$/
                  })} />
                {errors.password &&
                  <span className='text-danger'> {errors.password.message} </span>}
                {errors.password && errors.password.type == 'pattern' &&
                  <span className='text-danger'> enter a vlaid password </span>}

                <p className="text-end mb-5 text-white mt-2">Forgot Password?</p>
                <button className="form-button btn rounded-5">{isLoading?<Loading/>:"Login"}</button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

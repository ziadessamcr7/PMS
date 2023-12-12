
export default function Login() {
  return (
    <section id='login' className=''>

      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100'>
          <div className="col-md-6">
            <div className="from-bg p-5 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: 'rgb(227 156 26)' }} >Login</h2>
              <span className="login-underline"></span>
              <form>
                <label htmlFor="mail" style={{ color: 'rgb(227 156 26)' }}>Email</label>
                <input className="form-input" type="email" placeholder="Enter your e-mail" id="mail" />

                <label htmlFor="mail" className="mt-4" style={{ color: 'rgb(227 156 26)' }}>Passwrod</label>
                <input className="form-input" type="text" placeholder="Enter your password" id="mail" />
                <p className="text-end mb-5 text-white mt-2">Forgot Password?</p>
                <button className="form-button btn rounded-5">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

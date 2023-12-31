import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export default function Dashboard() {

  const [ToDoCount, setToDoCount] = useState(0)
  const [ProgressCount, setProgressCount] = useState(0)
  const [DoneCount, setDoneCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [deActiveCount, setDeActiveCount] = useState(0)

  const { BaseUrl, requestHeaders, userRole }: any = useContext(AuthContext)


  const getTasksCount = () => {
    axios.get(`${BaseUrl}/Task/count`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      setToDoCount(response.data.toDo)
      setProgressCount(response.data.inProgress)
      setDoneCount(response.data.done)
    })
      .catch((error) => {
        console.log(error);
      })
  }
  const getUsersCount = () => {
    axios.get(`${BaseUrl}/Users/count`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      setActiveCount(response.data.activatedEmployeeCount)
      setDeActiveCount(response.data.deactivatedEmployeeCount)
    })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getTasksCount()
    getUsersCount()
  }, [])


  return (
    <section style={{ marginTop: '20px' }}>


      {userRole == 'Manager' ? <>
        <header className='dashboard-head p-4 text-white d-flex align-items-center rounded-3'>
          <div>
            <h1 className='fw-light'>Welcome upskilling Admin</h1>
            <h1 className='mt-3 fw-light'>You can add project and assign tasks to your team</h1>
          </div>

        </header>

        <div>
          <div className="row mt-3">
            <div className="col-md-6 py-3" style={{ backgroundColor: '#F8F9FB' }}>
              <h5 className='bordr-lft ps-3' >Tasks</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, delectus?</p>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className=' p-3 rounded-4' style={{ backgroundColor: '#E5E6F4' }}>
                    <h6>ToDo</h6>
                    <span> {ToDoCount} </span>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className='p-3 rounded-4' style={{ backgroundColor: '#F4F4E5' }}>
                    <h6>In progress</h6>
                    <span> {ProgressCount} </span>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className='p-3 rounded-4' style={{ backgroundColor: '#F4E5ED' }}>
                    <h6>Done</h6>
                    <span> {DoneCount} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-white py-3">
              <h5 className='bordr-lft ps-3' >Users</h5  >
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur.</p>
              <div className="row">
                <div className="col-md-5 text-center">
                  <div className='p-3 rounded-4'>
                    <h6>Active</h6>
                    <span> {activeCount} </span>
                  </div>
                </div>
                <div className="col-md-5 text-center">
                  <div className='p-3 rounded-4'>
                    <h6>De-active</h6>
                    <span> {deActiveCount} </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div></> : <header className='dashboard-head mt-3 p-4 text-white d-flex align-items-center rounded-3'>
        <div>
          <h1 className='fw-light'>Welcome upskilling User</h1>
          <h1 className='mt-3 fw-light'>You can view and control your tasks</h1>
        </div>

      </header>}




    </section>
  )
}
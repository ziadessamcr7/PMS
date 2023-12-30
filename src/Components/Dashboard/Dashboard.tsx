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
    <section>
      <header className='dashboard-head mt-3 p-4 text-white d-flex align-items-center rounded-3'>
        <div>
          <h1 className='fw-light'>Welcome upskilling</h1>
          <h1 className='mt-3 fw-light'>You can add project and assign tasks to your team</h1>
        </div>

      </header>

      <div>
        <div className="row mt-3">
          <div className="col-md-6 ">
            <h3>Tasks</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, delectus?</p>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className='bg-dark-subtle p-3 rounded-4'>
                  <h6>ToDo</h6>
                  <span> {ToDoCount} </span>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className='bg-dark-subtle p-3 rounded-4'>
                  <h6>In progress</h6>
                  <span> {ProgressCount} </span>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className='bg-dark-subtle p-3 rounded-4'>
                  <h6>Done</h6>
                  <span> {DoneCount} </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <h3>Users</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur.</p>
            <div className="row">
              <div className="col-md-5 text-center">
                <div className='bg-dark-subtle p-3 rounded-4'>
                  <h6>Active</h6>
                  <span> {activeCount} </span>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <div className='bg-dark-subtle p-3 rounded-4'>
                  <h6>De-active</h6>
                  <span> {deActiveCount} </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>


    </section>
  )
}
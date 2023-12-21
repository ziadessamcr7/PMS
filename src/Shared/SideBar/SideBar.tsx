import React, { useState } from 'react'
import ChangePassword from '../../Components/ChangePassword/ChangePassword';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <button onClick={handleShow} className='btn btn-outline-warning'>Change Passsword</button>
      <Link className='btn btn-dark my-3' to="/dashboard/users">Users</Link>
      <ChangePassword handleClose={handleClose} show={show} />
    </div>

  )
}


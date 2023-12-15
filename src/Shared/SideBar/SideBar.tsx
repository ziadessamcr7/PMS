import React, { useState } from 'react'
import ChangePassword from '../../Components/ChangePassword/ChangePassword';

export default function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <button onClick={handleShow} className='btn btn-outline-warning'>Change Passsword</button>
      <ChangePassword handleClose={handleClose} show={show} />
    </div>

  )
}


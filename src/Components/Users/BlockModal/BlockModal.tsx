import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';

interface ButtonProps {
    handleClose : () => void;
    show:boolean;
    id:number;
    getUserOrList :()=>void
  }
function BlockModal({handleClose,show,id ,getUserOrList}:ButtonProps) {
  const [loadingModal, setLoadingModal] = useState(false);
  
  let {url,headers}:any=useContext(AuthContext);


  function blockUser() {
    setLoadingModal(true);
    axios
      .put(`${url}Users/${id}`, {},headers)

      .then((res: any) => {
        getUserOrList();
        setLoadingModal(false);
        console.log(res);
        handleClose()
      })
      .catch((err: any) => {
        setLoadingModal(false);
        console.log(err);
        handleClose()
        toast.error(err.message);
      });
  }

  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blocking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> <h5>Are you sure ?</h5></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={blockUser}>
            {loadingModal ?<Loading/>:"Save"}
          </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default BlockModal;
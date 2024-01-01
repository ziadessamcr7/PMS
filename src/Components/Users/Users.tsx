/** @format */

import { useContext, useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import css from "./Users.module.css";
import { toast } from "react-toastify";
// import NoData from "../../assets/images/nodata.png";
import Loading from "../Loading/Loading";
// import BlockModal from "../../assets/images/PMS3.png";
import { Link } from "react-router-dom";
import Paginate from "../../Shared/Pagination/Pagination";

export default function Users() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);
  const [srchValue, setSrchValue] = useState(null);
  const [filterRole, setFilterRole] = useState(null);
  const [show, setShow] = useState(false);
  let { BaseUrl, requestHeaders }: any = useContext(AuthContext);
  const [toltalNumberOfPages, setToltalNumberOfPages] = useState(null);
  const handleShow: (id: number) => void = (id) => {
    setShow(true);
    setId(id);
  };

  const handleClose: () => void = () => setShow(false);

  function getUserList({
    userName,
    groups,
    pageSize = 5,
    pageNumber = 1,
  }: any = []) {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}Users/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userTkn")}` },
        params: {
          pageSize,
          pageNumber,
          userName,
          groups,
        },
      })
      .then((res: any) => {
        setUsersList(res.data.data);
        setIsLoading(false);
        setToltalNumberOfPages(res.data.totalNumberOfPages);
      })
      .catch((err: any) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    getUserList();
  }, []);

  function searchValue(e: any) {
    setSrchValue(e.target.value);
    getUserList({ userName: e.target.value, groups: filterRole });
  }
  function FilterByRole(e: any) {
    setFilterRole(e.target.value);
    getUserList({ userName: srchValue, groups: e.target.value });
  }

  return (
    <>
      <div className="header">
        <h4 className="ps-3 py-3">Users</h4>
      </div>

      <div className="bg-light p-3">
        <div className="content bg-white rounded-3">
          <div className="searchAndFilter ">
            <div className="input-group mb-3 px-3 pt-3 w-50">
              <div className="w-75">
                <input
                  onChange={searchValue}
                  type="text"
                  className="form-control rounded-5 me-1"
                  placeholder="Search Fleets"
                />
              </div>
              <div className="w-25">
                <select
                  onChange={FilterByRole}
                  className="form-select ms-1 rounded-5"
                >
                  <option value="2">Filter</option>
                  <option value="1">Manager</option>
                  <option value="2">Employee</option>
                </select>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div
              className={`text-center fs-1 text-success d-flex  justify-content-center align-items-center bg-light ${css.loadingHieght}`}
            >
              <Loading />
            </div>
          ) : usersList.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover>
                <thead className="text-center">
                  <tr>
                    <th>User Name</th>
                    <th>Statues</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {usersList?.map((user: any, idx: number) => (
                    <tr key={idx}>
                      <td>{user.userName}</td>
                      <td>
                        {user.isActivated ? (
                          <span className="bg-success px-3 py-1 rounded-5 text-white">
                            Active
                          </span>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-5 text-white ${css.noActive}`}
                          >
                            No Active
                          </span>
                        )}
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.creationDate?.split("T")[0]}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant=""></Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleShow(user.id)}>
                              <i className="fa-solid fa-pen-fancy"></i> Block
                            </Dropdown.Item>

                            <Link
                              className=" ps-3 pe-5 text-decoration-none text-dark w-100"
                              to={`/dashboard/user-details/${user.id}`}
                            >
                              <i className="fa-regular fa-eye"></i> View
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            // <NoData />
            ""
          )}
        </div>
      </div>

      {/* <BlockModal
        show={show}
        id={id}
        handleClose={handleClose}
        getUserOrList={getUserList}
      /> */}

      <div className="d-flex justify-content-center">
        <Paginate
          toltalNumberOfPages={toltalNumberOfPages}
          srchValue={srchValue}
          filterRole={filterRole}
          getList={getUserList}
        />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react"
import { requestAllUsers, requestDeleteUser } from "../services/userService"
import Table from 'react-bootstrap/Table'
import { Button } from "react-bootstrap"
import '../styles/DashboardAdmin.css'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';

const DashboardAdmin = () => {
    const [gotUsers, setGotUsers] = useState(false)
    const [users, setUsers] = useState([])

    const getUserInfo = async () => {
        setGotUsers(true)
        const requestedUsers  = await requestAllUsers()
        setUsers(requestedUsers)
    }
    useEffect(() => {
        if (!gotUsers) { getUserInfo() }
    })

    const handleClick = async (event) => {
        const email = event.target.id
        console.log('Deleting user:', email)
        const deletedUser = await requestDeleteUser(email);
        setGotUsers(false)
    }
    return (
    <div>
        <h3>Users</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.email}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td><Button id={user.email} className="deleteButton" variant="danger" onClick={handleClick}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <div>
        <Link to="/AdminCreateUser">
            <button type="button">
                Create User
            </button>
         </Link>
         <Link to="/AdminCreateAttendant">
            <button type="button">
                Create Attendant
            </button>
         </Link>
        </div>
    </div>
    )
}

export default DashboardAdmin

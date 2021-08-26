import React, { Component } from 'react'
import { Table } from 'reactstrap'
import User from './User'
import axios from 'axios'

const usersUrl = 'http://localhost:8000/v1/users'

// axios.get(usersUrl)
//     .then(res => {
//         console.log(res)
//     })

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.renderUsers = this.renderUsers.bind(this)
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        await axios.get(usersUrl).then(res => {
            const users = res.data
            this.setState({users})
        })
    }

    renderUsers() {
        this.state.users.map(user => {
             return(<p>{user.name}</p>)
            // console.log(user.name)
        })
    }
    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Nascimento</th>
                            <th>Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => <User name={user.name} mail={user.mail} phone={user.phone} birth={user.birth} city={user.city} />)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Users

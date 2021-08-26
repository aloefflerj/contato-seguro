import React, { Component } from 'react'
import { Table } from 'reactstrap'
import UserRow from './UserRow'
import axios from 'axios'
import './user.css'

const usersUrl = 'http://localhost:8000/v1/users'

// axios.get(usersUrl)
//     .then(res => {
//         console.log(res)
//     })

class UserTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
        this.renderUsers = this.renderUsers.bind(this)
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        await axios.get(usersUrl).then((res) => {
            const users = res.data
            this.setState({ users })
        })
    }

    renderUsers() {
        return this.state.users.map(
            (user) => (
                <UserRow
                    name={user.name}
                    mail={user.mail}
                    phone={user.phone}
                    birth={user.birth}
                    city={user.city}
                />
            )
            // console.log(user.name)
        )
    }
    render() {
        return (
            <>
                <Table responsive className='user-table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Nascimento</th>
                            <th>Cidade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default UserTable

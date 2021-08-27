import React, { useState, Component } from 'react'
import './App.css'
import Header from './template/header/Header'
import Content from './template/content/Content'
import Footer from './template/footer/Footer'
import UserTable from './users/UserTable'
import UpperOptions from './upperOptions/upperOptions'
import { getUsers } from './routes/routes'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    async componentDidMount() {
        await this.init()
    }

    init = async () => {
        console.log('called from App')
        const res = getUsers()
        const usersResponse = (await res).data
        this.setState({
            users: usersResponse,
        })
    }

    render() {
        return (
            <div className='App'>
                <Header>
                    <UpperOptions init={this.init} />
                </Header>
                <Content>
                    <UserTable init={this.init} users={this.state.users} />
                </Content>
                <Footer />
            </div>
        )
    }
}

export default App

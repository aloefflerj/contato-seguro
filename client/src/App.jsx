import React from 'react'
import './App.css'
import { Button } from 'reactstrap'
import Modal from './common/Modal'
import Header from './template/header/Header'
import Content from './template/content/Content'
import Footer from './template/footer/Footer'
import Users from './users/Users'

const App = () => {
    return (
        <div className='App'>
            <Header>
                <h1>Titulo</h1>
            </Header>
            <Content>
                <Users />
            </Content>
            <Footer />
            {/* <Modal buttonLabel='Teste' className='sdsa' /> */}
        </div>
    )
}

export default App

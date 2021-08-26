import React from 'react'
import './App.css'
import Modal from './common/Modal'
import Header from './template/header/Header'
import Content from './template/content/Content'
import Footer from './template/footer/Footer'
import UserTable from './users/UserTable'
import UpperOptions from './upperOptions/upperOptions'

const App = () => {
    return (
        <div className='App'>
            <Header>
                <UpperOptions />
            </Header>
            <Content>
                <UserTable />
            </Content>
            <Footer />
            {/* <Modal buttonLabel='Teste' className='sdsa' /> */}
        </div>
    )
}

export default App

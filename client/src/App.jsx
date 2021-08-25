import React, { Component } from 'react'
import Header from './template/header/Header'
import Content from './template/content/Content'

import axios from 'axios'
import Sidebar from './template/sidebar/Sidebar'
import Footer from './template/footer/Footer'

const baseUrl = 'http://localhost:8000'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            class: '',
            lvl: '',
        }
    }

    async componentDidMount() {
        await axios.get(baseUrl + '/chars/1').then(res => {
            // console.log(res.data)
            this.setState(res.data)
        })
    }

    render() {
        return (
            <>
                <Header>
                    <h2>{this.state.name}, {this.state.class} lvl {this.state.lvl} </h2>
                </Header>
                <Sidebar>
                    <nav>
                        <ul>
                            <li>Item1</li>
                            <li>Item2</li>
                            <li>Item3</li>
                            <li>Item4</li>
                            <li>Item5</li>
                        </ul>
                    </nav>
                </Sidebar>
                <Content>
                    <h3>Aqui fica imagem do char</h3>
                    <form action={baseUrl} method="post">
                        
                        <label htmlFor="title">Título</label>
                        <input type="text" name="title" id="title" />

                        <button>Manda</button>
                    </form>
                </Content>
                <Footer>
                    <p>Criado com amor por Anderson</p>
                </Footer>
            </>
        )
    }
}

export default App

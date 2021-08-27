import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    Row,
    Col,
} from 'reactstrap'

import axios from 'axios'

import './modal.css'

axios.defaults.baseURL = 'http://localhost:8000/v1/users'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'


// const baseUrl = 'http://localhost:8000/v1/users'

const ModalTemplate = props => {
    const { buttonLabel, className, title, method, action, userInfo } = props

    const [modal, setModal] = useState(false)

    const [user, setUser] = useState({
        user: {
            id: '',
            name: '',
            mail: '',
            phone: '',
            birth: '',
            city: '',
        },
    })

    const toggle = () => handleModal(!modal)

    const handleModal = () => {
        setModal(!modal)
        setUser(userInfo ?? user)
        console.log(user)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser(prevUser => ({
            ...user,
            [name]: value,
        }))
    }

    const clearFields = e => {
        e.preventDefault()
        setUser({
            ...user,
            id: '',
            name: '',
            mail: '',
            phone: '',
            birth: '',
            city: '',
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        switch (props.method) {
            case 'put':
                updateUser()
                break
            case 'post':
                newUser()
        }
    }

    const newUser = async () => {
        await axios
            .post(
                '',
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    mail: user.mail,
                    phone: user.phone,
                    birth: user.birth,
                    city: user.city
                })
            )
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateUser = async () => {
        await axios
            .put('/' + user.id, JSON.stringify({
                id: user.id,
                name: user.name,
                mail: user.mail,
                phone: user.phone,
                birth: user.birth,
                city: user.city
            }), {
                headers: {
                    'Content-Type': 'application-json',
                },
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const closeBtn = (
        <Button color='white' onClick={toggle}>
            <span color='muted'>&#x2715;</span>
        </Button>
    )

    return (
        <div>
            <Button color='btn btn-dark' onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} close={closeBtn}>
                    <strong>{title}</strong>
                </ModalHeader>
                <ModalBody>
                    <Form method={method} action={action}>
                        <FormGroup>
                            <Label for='name'>Nome:</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                required
                                value={user.name}
                                onChange={handleChange}
                            />
                            <FormFeedback>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                            <FormText>Obrigatório</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for='mail'>E-mail:</Label>
                            <Input
                                type='text'
                                name='mail'
                                id='mail'
                                required
                                value={user.mail}
                                onChange={handleChange}
                            />
                            <FormFeedback>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                            <FormText>Obrigatório</FormText>
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for='phone'>Telefone:</Label>
                                    <Input
                                        type='phone'
                                        name='phone'
                                        id='phone'
                                        value={user.phone}
                                        onChange={handleChange}
                                    />
                                    <FormFeedback>
                                        {/* colocar resposta de json errado aqui */}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for='birth'>
                                        Data de nascimento:
                                    </Label>
                                    <Input
                                        type='date'
                                        name='birth'
                                        id='birth'
                                        color='light'
                                        value={user.birth}
                                        onChange={handleChange}
                                    />
                                    <FormFeedback>
                                        {/* colocar resposta de json errado aqui */}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for='city'>Cidade onde nasceu:</Label>
                            <Input
                                type='text'
                                name='city'
                                id='city'
                                color='light'
                                value={user.city}
                                onChange={handleChange}
                            />
                            <FormFeedback>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                        </FormGroup>
                        <Row form>
                            <Button color='dark' onClick={clearFields}>
                                Limpar
                            </Button>
                            <Button color='dark' onClick={handleSubmit}>
                                Enviar
                            </Button>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalTemplate

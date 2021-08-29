import React, { useState } from 'react'
import {
    Alert,
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

import { newUser, updateUser } from '../routes/routes'

import './modal.css'

const ModalTemplate = props => {
    const { buttonLabel, className, title, method, action, userInfo } = props

    const [modal, setModal] = useState(false)

    const [error, setError] = useState({
        status: false,
        message: {
            type: '',
            fields: {
                name: '',
                mail: '',
            },
            content: '',
        },
    })

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
        //reload dos usuários
        setError({
            status: false,
            message: {
                type: '',
                fields: {
                    name: '',
                    mail: '',
                },
                content: '',
            },
        })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser(() => ({
            ...user,
            [name]: value,
        }))
    }

    const clearFields = e => {
        e.preventDefault()
        setUser({
            ...user,
            name: '',
            mail: '',
            phone: '',
            birth: '',
            city: '',
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const { name, mail, phone, birth, city } = user
        let response = {}
        let res
        switch (props.method) {
            case 'post':
                res = newUser({
                    name,
                    mail,
                    phone,
                    birth,
                    city,
                })
                response = (await res).data
                break
            case 'put':
                res = updateUser(user.id, {
                    name,
                    mail,
                    phone,
                    birth,
                    city,
                })
                response = (await res).data
                break
            default:
                displayMessage('')
        }
        if (response.message) {
            setError({ ...error, status: true, message: response.message })
            console.log(error.message)
            // console.log(message)
            return
        }
        props.init()
        toggle()
    }

    const displayMessage = msg => {
        console.log(msg)
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
                                invalid={error.message.fields.name}
                                type='text'
                                name='name'
                                id='name'
                                required
                                value={user.name}
                                onChange={handleChange}
                            />
                            <FormFeedback>
                                {error.message.fields.name
                                    ? error.message.content
                                    : ''}
                            </FormFeedback>
                            <FormText>Obrigatório</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for='mail'>E-mail:</Label>
                            <Input
                                invalid={error.message.fields.mail}
                                type='text'
                                name='mail'
                                id='mail'
                                required
                                value={user.mail}
                                onChange={handleChange}
                            />
                            <FormFeedback invalid={true}>
                                {error.message.fields.mail
                                    ? error.message.content
                                    : ''}
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
                                value={user.city}
                                onChange={handleChange}
                            />
                            <FormFeedback>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                        </FormGroup>
                        <Alert
                            color='danger'
                            isOpen={
                                error.message.type &&
                                !error.message.fields.mail &&
                                !error.message.fields.name
                            }
                        >
                            {error.message.content}
                        </Alert>
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

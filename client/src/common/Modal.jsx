import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    Row,
    Col,
} from 'reactstrap'
import './modal.css'

const ModalTemplate = (props) => {
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

    // if(method == 'put') {
    //   setUser(userInfo)
    // }

    const toggle = () => handleModal(!modal)

    const handleModal = () => {
        setModal(!modal)
        setUser(userInfo)
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
                            />
                            <FormFeedback invalid>
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
                            />
                            <FormFeedback invalid>
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
                                    />
                                    <FormFeedback invalid>
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
                                    />
                                    <FormFeedback invalid>
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
                                onChange={(e) =>
                                    setUser({ ...user, [user.city]: e.target.value })
                                }
                            />
                            <FormFeedback invalid>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                        </FormGroup>
                        <Row form>
                            <Button color='dark' type='reset'>
                                Limpar
                            </Button>
                            <Button color='dark' type='submit'>
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

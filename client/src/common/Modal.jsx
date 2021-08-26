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
    const { buttonLabel, className, title, method } = props

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

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
                    <Form method={method}>
                        <FormGroup>
                            <Label for='name'>Nome:</Label>
                            <Input type='text' name='name' id='name' required />
                            <FormFeedback invalid>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                            <FormText>Obrigatório</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for='mail'>E-mail:</Label>
                            <Input type='text' name='mail' id='mail' required />
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
                                    />
                                    <FormFeedback invalid>
                                        {/* colocar resposta de json errado aqui */}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for='birth'>Cidade onde nasceu:</Label>
                            <Input
                                type='location'
                                name='birth'
                                id='birth'
                                color='light'
                            />
                            <FormFeedback invalid>
                                {/* colocar resposta de json errado aqui */}
                            </FormFeedback>
                        </FormGroup>
                        <Row form>
                          <Button color='dark' type='reset'>
                              Limpar
                          </Button>
                          <Button color='dark' type='reset'>
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

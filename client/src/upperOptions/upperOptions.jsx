import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'reactstrap'
import Modal from '../common/Modal'
const upperOptions = (props) => {
    return (
        <>
            {/* <Button color='dark'>
                <FontAwesomeIcon icon={faPlus} />
            </Button> */}
            <Modal buttonLabel={<FontAwesomeIcon icon={faPlus} />} action={'add'} />
            <Input placeholder='Buscar...' />
            <select className='form-select text-muted' aria-label='filtro' defaultValue='2'>
                <option className='text-dark' value='1'>Nome</option>
                <option className='text-dark' value='2'>E-mail</option>
                <option className='text-dark' value='3'>Telefone</option>
                <option className='text-dark' value='3'>Nascimento</option>
                <option className='text-dark' value='4'>Cidade</option>
            </select>
        </>
    )
}

export default upperOptions

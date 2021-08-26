import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'reactstrap'

const upperOptions = (props) => {
    return (
        <>
            <Button color='dark'>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            {/* <input type='search' name='search' id='search' /> */}
            <Input placeholder='Buscar...' />
            <select class='form-select text-muted' aria-label='filtro'>
                <option selected value='1'>Nome</option>
                <option value='2'>E-mail</option>
                <option value='3'>Telefone</option>
                <option value='3'>Nascimento</option>
                <option value='4'>Cidade</option>
            </select>
        </>
    )
}

export default upperOptions

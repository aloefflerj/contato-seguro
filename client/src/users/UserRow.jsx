import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from '../common/Modal'

const UserRow = props => {
    const baseUrl = 'http://localhost:8000/v1/users'
    return (
        <>
            <tr key={props.id}>
                <td>{props.name}</td>
                <td>{props.mail}</td>
                <td>{props.phone}</td>
                <td>{props.birth}</td>
                <td>{props.city}</td>
                <td className='buttons'>
                    <Modal
                        buttonLabel={<FontAwesomeIcon icon={faEdit} />}
                        title='Editar'
                        method='put'
                        action={baseUrl + '/' + props.id}
                        userInfo={props}
                    />
                    <Button color='dark'>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default UserRow

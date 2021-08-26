import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const UserRow = (props) => {
    return (
        <>
            <tr key={props.id}>
                <td >{props.name}</td>
                <td>{props.mail}</td>
                <td>{props.phone}</td>
                <td>{props.birth}</td>
                <td>{props.city}</td>
                <td className='buttons'>
                    <Button color='dark'>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button color='dark'>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default UserRow

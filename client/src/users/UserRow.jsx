import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from '../common/Modal'
import { deleteUser } from '../routes/routes'
import momentTimezone from 'moment-timezone'
import moment from 'moment'

const UserRow = props => {
    const handleDelete = async e => {
        e.preventDefault()
        const res = deleteUser(props.id)
        //displayMessage((await res).data)
        console.log((await res).data)
        props.init()
    }

    const formatDate = e => {
        return (moment(e).utcOffset("-03:00").format('DD/MM/YYYY'))
    }
    // process.env.TZ = 'America/Sao_Paulo';
    // console.log(new Date(props.birth).toLocaleDateString('pt-BR'))
    // console.log(new Date.now())
    // const date = new Date(props.birth)
    // console.log(new Date(props.birth).toString())
    // console.log(moment.localeData(date))
    // console.log(date.momentTimezone('America/Los_Angeles').format('ha z'))

    // console.log(new Date(props.birth).getTimezoneOffset());
    // console.log(new Date(props.birth).toDateString());
    return (
        <>
            <tr key={props.id}>
                <td>{props.name}</td>
                <td>{props.mail}</td>
                <td>{props.phone}</td>
                <td>{formatDate(props.birth)}</td>
                <td>{props.city}</td>
                <td className='buttons'>
                    <Modal
                        buttonLabel={<FontAwesomeIcon icon={faEdit} />}
                        title='Editar'
                        method='put'
                        userInfo={props}
                        init={props.init}
                    />
                    <Button color='dark' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default UserRow

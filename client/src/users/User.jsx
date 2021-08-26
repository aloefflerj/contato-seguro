import React from 'react'

const User = props => {
    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td>{props.mail}</td>
                <td>{props.phone}</td>
                <td>{props.birth}</td>
                <td>{props.city}</td>
            </tr>
        </>
    )
}

export default User

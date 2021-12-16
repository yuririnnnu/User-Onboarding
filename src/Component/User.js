import React from 'react';

function User({details}) {
    if (!details){
        return <h2>No users yet</h2>
    }
    return (
        <div className='user container'>
            <h3>{details.first_name} {details.last_name}</h3>
            <p>Email: {details.email}</p>            
        </div>
    )
}
export default User;
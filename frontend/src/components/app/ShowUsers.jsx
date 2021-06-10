import React, { useEffect, useState } from 'react';

// temporary component to test crud
function ShowUsers(props) {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // function to get Users from localhost:8000/users/
    useEffect(() => {
        fetch('http://localhost:8000/users/')
            .then(res => res.json())
            .then(jsonInfo => setUsers([...jsonInfo]))
            .then(setIsLoading(false))
    }, [])


    return (
        <div>
            {users.map(user => (
                <p key={user.email}>{user.email}</p>
            ))}
        </div>
    )
};

export default ShowUsers;
import { useState } from 'react'
import { useMemo } from 'react'
import './App.css'
import styled from '@emotion/styled'

function App() {

  
  const [users, setUsers] = useState([
    { id: 1, name: 'Bob', age: 3, pet: 'iguana' },
    { id: 2, name: 'Bobek', age: 2, pet: 'rabbit' }
  ])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  interface User {
    id: number,
    name: string,
    age: number,
    pet: string
  }

  // use styled component
  const GreenTextWhenHovered = styled.p`
    &:hover {
      color: green;
    }
  `

  // USE MEMO //
  /* 
    useMemo() only recalculates the value of selectedUser if users or selectedUserId changes
    as given to it in the second parameter
    If prevents  selectedUser to be recalculated every time the page rerender for any other reason
    (theme change or anything else not related)
  */
  const selectedUser = useMemo(
    (): User | undefined => {
      return users.find(user => user.id === selectedUserId)
    }, [users, selectedUserId]
  )
  

  function selectUser(userId: number) {
    setSelectedUserId(userId)
  }

  function incrementAge(userId: number) {
    setUsers(currentUsers => {
      return  currentUsers.map(user => {
        if ( user.id === userId) {
          return {...user, age: user.age + 1}
        } else {
          return user
        }
      })
    })
  }

  return (
    <div>
      {/*  use && to only display selectUser if there is one */}
      <h2>Selected User: {selectedUser && `${selectedUser.name} - ${selectedUser.age} years old`} </h2>
      <h2>Users:</h2>
        {users.map(user => {
          return(
          <div 
            key={user.id}
            // use an object to set style attributes
            // convert property names to camelCase 
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr 1fr',
              gridColumnGap: '20px',
              marginBottom: '10px'
            }}
          >
            <GreenTextWhenHovered>{user.name} is {user.age} years old. Pet: {user.pet}</GreenTextWhenHovered>
            <button onClick={() => incrementAge(user.id)}>Increment Age</button>
            <button onClick={() => selectUser(user.id)}>Select</button>
          </div>
        )})}
    </div>
  )
}

export default App

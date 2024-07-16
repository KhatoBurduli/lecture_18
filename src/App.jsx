import { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';

const apikey = 'eFrCE_M0tirMW7DH-z2NrdSvoqb5mNLWuTsnqK9eE2phjBk4gg'

function App() {

  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch('/api/v1/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      }
    }).then(res => {
      if(!res.ok) throw new Error("Response Failed")
      return res.json()
    })
    .then(data => setUserList(data.items.map(user => {
      return{
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._uuid
      }
    })))
    .catch(err => console.log(err))
  },[])

  const getUsers = () => {
    fetch('/api/v1/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      }
    }).then(res => {
      if(!res.ok) throw new Error("Response Failed")
      return res.json()
    })
    .then(data => setUserList(data.items.map(user => {
      return{
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._uuid
      }
    })))
    .catch(err => console.log(err))
  }

  const onFormSubmit = (firstname, lastname) => {
    fetch('/api/v1/users',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify([{firstname, lastname}])
    }).then(res => {
      if(!res.ok) throw new Error("Response Failed")
      return res.json()
    }).then(data => setUserList((prev) => [{
      firstname: data.items[0].firstname,
      lastname: data.items[0].lastname,
      id: data.items[0]._uuid
    },...prev]))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <UserForm onFormSubmit={onFormSubmit}/>
      <button onClick={getUsers}>GET users</button>
      <button onClick={() => setUserList([])}>clear users</button>

      {userList.map((user) => <div key={user.id} style={{border: '1px solid gray'}}>
          <h3>{user.firstname}</h3>
          <h3>{user.lastname}</h3>

        </div>)}
    </div>
  );
}

export default App;

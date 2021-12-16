import '../App.css';
import axios from 'axios';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import Form from './Form'
import schema from '../Validation/formSchema';
import User from './User';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '', 
  term: false,
}
const initialErrorForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '', 
}
const initialDisabled = true
const initialUsers = []

function App() {
  const [ users, setUsers ] = useState(initialUsers)
  const [ formValues, setFormValues ] = useState(initialFormValues)
  const [ formErrors, setFormErrors ] = useState(initialErrorForm)
  const [ disabled, setDisabled ] = useState(initialDisabled)

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
    .then(res => {
      console.log('get res',res)
      console.log('get res.data:', res.data)
      console.log('get res.data.data', res.data.data)
      setUsers(res.data.data)
    }).catch(err => console.error(err))
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      console.log('printing formValue', formValues)
      console.log('This is res:', res)
      console.log(newUser)
      setUsers([res.data, ...users]);
    }).catch(err => console.error(err))
    .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name] : value
    })
  }
  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(), 
      term: ['agree'].filter(ter=> !!formValues[ter])
    }
    console.log(newUser)
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="container">
      
        <h1>My app</h1>
        <Form
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
          />
      
      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;

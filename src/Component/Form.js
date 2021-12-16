import React from 'react';

export default function Form (props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
      } = props
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        const {name, value, checked, type} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }    

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='container submit' >
                <h2>ADD USER</h2>
                <div className='error'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.term}</div>
                </div>
                
                <label>
                    First Name:
                    <input
                    type='text'
                    name='first_name'
                    onChange={onChange}
                    value={values.first_name}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                    type='text'
                    name='last_name'
                    onChange={onChange}
                    value={values.last_name}
                    />
                </label>
                <label>
                    Email:
                    <input
                    type='email'
                    name='email'
                    onChange={onChange}
                    value={values.email}
                    />
                </label>
                <label>
                    Password:
                    <input
                    type='password'
                    name='password'
                    onChange={onChange}
                    value={values.password}
                    />
                </label>
                <label>
                    Term of service:
                    <input
                    type='checkbox'
                    name='term'
                    onChange={onChange}
                    value={values.term}
                    />
                </label>
                <button disabled={disabled} onSubmit={onSubmit}>SUBMIT</button>
            </div>
        </form>
    )
}
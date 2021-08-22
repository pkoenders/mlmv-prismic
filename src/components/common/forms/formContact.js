import React, { useState } from 'react'
import { isRequired, isValidEmail } from './validators'
import { Form, Field } from 'react-final-form'
import TextInput from './formFields/textInput'
import TextAreaInput from './formFields/textAreaInput'
import BtnSubmit from './formFields/buttonSubmit'
import SubmitSuccess from './formFields/submitSuccess'
import SubmittError from './formFields/submitError'

import './index.scss'

const ContactNew = ({ location }) => {
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }

  const [errorMessage, setErrorMsg] = useState(false)
  const [successMessage, setSuccessMsg] = useState(false)

  const handleSubmit = (e) => {
    // console.log(e.target.elements)
    fetch(location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': e.target.getAttribute('name'),

        location: e.target['location'].value,
        firstName: e.target['firstName'].value,
        surname: e.target['surname'].value,
        email: e.target['email'].value,
        message: e.target['message'].value,
      }),
    })
      .then((res) => {
        if (res) {
          // console.log('Success!')
          setSuccessMsg(true)
          document.querySelector('.form').classList.add('hide')
        }
      })

      .catch((error) => setErrorMsg(true))

    e.preventDefault()
  }

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await sleep(300)
    // window.alert(JSON.stringify(values, 0, 2))
  }

  return (
    <section className={'section-layout skinny'}>
      <div>
        <h1>React Final Form Example</h1>
        <h2>Synchronous Field-Level Validation</h2>

        <Form onSubmit={onSubmit}>
          {({ values, invalid }) => (
            <form
              className={'form'}
              name="ContactForm"
              // noValidate
              method="post"
              data-netlify="true"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="ContactForm" />
              <input type="hidden" name="location" value={location.pathname} />

              <Field
                name="firstName"
                label="First name"
                type="text"
                component={TextInput}
                validate={isRequired}
              />

              <Field
                name="surname"
                label="Surname"
                type="text"
                component={TextInput}
                validate={isRequired}
              />

              <Field
                name="email"
                label="Email"
                type="email"
                component={TextInput}
                validate={isValidEmail}
              />

              <Field
                name="message"
                label="Message"
                type="textarea"
                component={TextAreaInput}
              />

              <BtnSubmit name="submit" label="Submit" invalid={invalid} />

              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )}
        </Form>

        {errorMessage && <SubmittError />}
        {successMessage && <SubmitSuccess />}
      </div>
    </section>
  )
}

export default ContactNew

import React, { useState } from 'react'

// Helpers
import { isRequired, isValidEmail } from './validators'
import { Form, Field } from 'react-final-form'
import { linkResolver } from '/src/utils/linkResolver'
import { RichText } from 'prismic-reactjs'
import { getColor, validateString } from '/src/utils/helpers'

// Form elements
import FormWrapper from './formWrapper'
import TextInput from './formFields/textInput'
import CheckBox from './formFields/checkBox'
import RadioBtn from './formFields/radioBtn'
import SelectList from './formFields/selectList'
import TextAreaInput from './formFields/textAreaInput'
import SubmitSuccess from './formFields/submitSuccess'
import SubmittError from './formFields/submitError'

// Layout
import Button from '/src/components/common/buttons/linkButton'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactNew = ({ formData }) => {
  // const formTitle = slice.primary.select_form.document.data.form_title.text
  // const formDecription = slice.primary.select_form.document.data.from_content.raw
  // const formDataFields = slice.primary.select_form.document.data.body

  // Validate title
  const formTitle = validateString(formData.select_form.document.data.form_title.text)
  // Validate description
  const formDecription = validateString(formData.select_form.document.data.from_content.raw)
  // Form data
  const formDataFields = formData.select_form.document.data.body
  // Get colour
  var bGgroundColor = getColor(formData.background_color)

  var pathName = ''
  if (typeof window !== 'undefined') {
    pathName = window.location.pathname
  }

  const [errorMessage, setErrorMsg] = useState(false)
  const [successMessage, setSuccessMsg] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target.elements)
    // const formData = Object.fromEntries(new FormData(e.target).entries())
    // const formData = Object.fromEntries(new FormData(e.target).entries())
    // const formDataAlt = Object.fromEntries(new FormData(e.target).value)

    const data = new FormData(e.target)
    const formDataEntries = Object.fromEntries(data.entries())

    // Get the form
    // let form = document.querySelector('form')

    // Get all field data from the form
    let formData = new FormData(e.target)

    // Convert to a query string
    // let queryString = new URLSearchParams(formData).toString()
    function serialize(data) {
      let obj = {}
      for (let [key, value] of data) {
        if (obj[key] !== undefined) {
          if (!Array.isArray(obj[key])) {
            obj[key] = [obj[key]]
          }
          obj[key].push(value)
        } else {
          obj[key] = value
        }
      }
      return obj
    }

    // Convert to an object
    const formObj = serialize(formData)

    console.log(formObj)

    fetch(`/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formDataEntries,
    })
      .then((res) => {
        if (res) {
          setSuccessMsg(true)
          document.querySelector('.form').classList.add('hide')
        }
      })

      .catch((error) => setErrorMsg(true))

    // e.preventDefault()
  }

  const resetForm = () => {
    setSuccessMsg(false)
    document.querySelector('.form').classList.remove('hide')
    document.querySelector('.form').reset()
  }

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  }

  return (
    <div
      className="formArea"
      style={{
        backgroundColor: bGgroundColor,
      }}
    >
      {(formTitle || formDecription) && (
        <div className="titleArea">
          {formTitle && <p className="titleText">{formTitle}</p>}
          {formDecription && <RichText render={formDecription} linkResolver={linkResolver} />}
        </div>
      )}
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          {({ values, invalid }) => (
            <form
              className="form"
              name="ContactForm"
              // noValidate
              method="post"
              data-netlify="true"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="ContactForm" />
              <input type="hidden" name="location" value={pathName} />

              {formDataFields.map((primary, index) => {
                return (
                  <>
                    {/* Add text input */}
                    {formDataFields[index].slice_type === 'text_input' && (
                      <Field
                        key={formDataFields[index].id}
                        name={formDataFields[index].primary.field_name.text}
                        label={formDataFields[index].primary.field_name.text}
                        type={formDataFields[index].primary.field_type.toLowerCase()}
                        component={TextInput}
                        validate={
                          formDataFields[index].primary.required === true
                            ? formDataFields[index].primary.field_type.toLowerCase() === 'email'
                              ? isValidEmail
                              : isRequired
                            : ''
                        }
                      />
                    )}
                    {/* Add check box */}
                    {formDataFields[index].slice_type === 'checkbox' && (
                      <div
                        key={formDataFields[index].id}
                        className={
                          'checkBoxes ' + `${formDataFields[index].primary.align}`.toLowerCase()
                        }
                      >
                        <p>{formDataFields[index].primary.title.text}</p>
                        {formDataFields[index].items.map((chekbox) => {
                          return (
                            <Field
                              key={formDataFields[index].id + chekbox.item.text}
                              fieldId={formDataFields[index].id + chekbox.item.text}
                              name={chekbox.item.text}
                              label={chekbox.item.text}
                              component={CheckBox}
                              validate={
                                formDataFields[index].primary.required === true ? isRequired : ''
                              }
                            />
                          )
                        })}
                      </div>
                    )}
                    {/* Add radio button */}
                    {formDataFields[index].slice_type === 'radio_button' && (
                      <div
                        key={formDataFields[index].id}
                        className={
                          'radioBtns ' + `${formDataFields[index].primary.align}`.toLowerCase()
                        }
                      >
                        <p>{formDataFields[index].primary.title.text}</p>
                        {formDataFields[index].items.map((radioBtn) => {
                          return (
                            <Field
                              key={formDataFields[index].id + radioBtn.item.text}
                              name={formDataFields[index].primary.title.text}
                              fieldId={formDataFields[index].id + radioBtn.item.text}
                              fieldName={radioBtn.item.text}
                              label={radioBtn.item.text}
                              component={RadioBtn}
                              validate={
                                formDataFields[index].primary.required === true ? isRequired : ''
                              }
                            />
                          )
                        })}
                      </div>
                    )}
                    {/* Add select list */}
                    {formDataFields[index].slice_type === 'select_list' && (
                      <label
                        key={formDataFields[index].id}
                        htmlFor={formDataFields[index].primary.title.text}
                      >
                        {formDataFields[index].primary.title.text}
                        <span className="select">
                          <i className="material-icons-round" aria-hidden="true">
                            expand_more
                          </i>
                          <select
                            id={formDataFields[index].primary.title.text}
                            name={formDataFields[index].primary.title.text}
                          >
                            {formDataFields[index].items.map((listItem) => {
                              return (
                                <Field
                                  name={formDataFields[index].primary.title.text}
                                  label={listItem.item.text}
                                  component={SelectList}
                                  validate={
                                    formDataFields[index].primary.required === true
                                      ? isRequired
                                      : ''
                                  }
                                />
                              )
                            })}
                          </select>
                        </span>
                      </label>
                    )}
                    {/* Add text area input */}
                    {formDataFields[index].slice_type === 'text_area_input' && (
                      <Field
                        key={formDataFields[index].id}
                        name={formDataFields[index].primary.field_name.text
                          .replace(/\s/g, '')
                          .toLowerCase()}
                        label={formDataFields[index].primary.field_name.text}
                        component={TextAreaInput}
                        validate={formDataFields[index].primary.required === true ? isRequired : ''}
                      />
                    )}
                    {/* Add submit button */}
                    {formDataFields[index].slice_type === 'button' && (
                      <div key={formDataFields[index].id} className={'submitForm'}>
                        {invalid && (
                          <p>Please ensure that the required form fields are completed</p>
                        )}

                        <Button
                          buttonLabel={'Submit'}
                          buttonType={'submit'}
                          buttonStyle={'primary'}
                          icon={'send'}
                        />
                      </div>
                    )}
                  </>
                )
              })}

              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )}
        </Form>
        {errorMessage && <SubmittError resetForm={resetForm} />}
        {successMessage && <SubmitSuccess resetForm={resetForm} />}
      </FormWrapper>
    </div>
  )
}

export default ContactNew

import React, { useState } from 'react'
import { isRequired, isValidEmail } from './validators'
import { Form, Field } from 'react-final-form'
import TextInput from './formFields/textInput'
import CheckBox from './formFields/checkBox'
import RadioBtn from './formFields/radioBtn'
import SelectList from './formFields/selectList'
import TextAreaInput from './formFields/textAreaInput'
import BtnSubmit from './formFields/buttonSubmit'
import SubmitSuccess from './formFields/submitSuccess'
import SubmittError from './formFields/submitError'
import { linkResolver } from '/src/utils/linkResolver'
import { RichText } from 'prismic-reactjs'
import { getColor, validateString } from '/src/utils/helpers'

import './index.scss'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactNew = ({ currentLang, location, formData }) => {
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
    const formData = Object.fromEntries(data.entries())
    // formData.topics = data.getAll('topics')

    // console.log(formData)

    fetch(`${currentLang}/${pathName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        ...formData,
        // ...formDataAlt,

        //'form-name': e.target.getAttribute('name'),
        // location: e.target['location'].value,
        // firstname: e.target['firstname'].value,
        // surname: e.target['surname'].value,
        // email: e.target['email'].value,
        // message: e.target['message'].value,
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
      <div className="titleArea">
        {formTitle && <p className="titleText">{formTitle}</p>}
        {formDecription && <RichText render={formDecription} linkResolver={linkResolver} />}
      </div>
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

            {/* Add text input */}
            {formDataFields.map((primary, index) => {
              return (
                <>
                  {formDataFields[index].slice_type === 'text_input' && (
                    <Field
                      key={`form-field-${index}`}
                      name={formDataFields[index].primary.field_name.text
                        .replace(/\s/g, '')
                        .toLowerCase()}
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
                    <span
                      className={
                        'checkBoxes ' + `${formDataFields[index].primary.align}`.toLowerCase()
                      }
                    >
                      <p>{formDataFields[index].primary.title.text}</p>
                      {formDataFields[index].items.map((checkBoxItem, indexOf) => {
                        return (
                          <Field
                            key={`form-field-${indexOf}`}
                            name={checkBoxItem.item.text.replace(/\s/g, '').toLowerCase()}
                            label={checkBoxItem.item.text}
                            // checkStatus={checkBoxItem.checked}
                            component={CheckBox}
                            validate={
                              formDataFields[index].primary.required === true ? isRequired : ''
                            }
                          />
                        )
                      })}
                    </span>
                  )}

                  {/* Add radio button */}
                  {formDataFields[index].slice_type === 'radio_button' && (
                    <span
                      className={
                        'radioBtns ' + `${formDataFields[index].primary.align}`.toLowerCase()
                      }
                    >
                      <p>{formDataFields[index].primary.title.text}</p>
                      {formDataFields[index].items.map((checkBoxItem, indexOf) => {
                        return (
                          <Field
                            key={`form-field-${indexOf}`}
                            fieldName={formDataFields[index].primary.title.text
                              .replace(/\s/g, '')
                              .toLowerCase()}
                            name={checkBoxItem.item.text.replace(/\s/g, '').toLowerCase()}
                            label={checkBoxItem.item.text}
                            // defaultChecked={checkBoxItem.default_checked}
                            component={RadioBtn}
                            validate={
                              formDataFields[index].primary.required === true ? isRequired : ''
                            }
                          />
                        )
                      })}
                    </span>
                  )}

                  {/* Add select list */}
                  {formDataFields[index].slice_type === 'select_list' && (
                    <>
                      <label>
                        {formDataFields[index].primary.title.text}

                        <span className="select">
                          <i class="material-icons-round" aria-hidden="true">
                            expand_more
                          </i>
                          <select
                            // type="select"
                            id={formDataFields[index].primary.title.text}
                            name={formDataFields[index].primary.title.text}
                          >
                            {formDataFields[index].items.map((listItem, indexOf) => {
                              return (
                                <Field
                                  key={`form-field-${indexOf}`}
                                  fieldName={formDataFields[index].primary.title.text
                                    .replace(/\s/g, '')
                                    .toLowerCase()}
                                  name={listItem.item.text.replace(/\s/g, '').toLowerCase()}
                                  label={listItem.item.text}
                                  // defaultChecked={checkBoxItem.default_checked}
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
                    </>
                  )}

                  {/* {formDataFields[index].slice_type === 'select_list' && (
                      <>
                        <label>
                          {formDataFields[index].primary.title.text}

                          <span className="select">
                            <i class="material-icons-round" aria-hidden="true">
                              expand_more
                            </i>
                            <select
                              // type="select"
                              id={formDataFields[index].primary.title.text}
                              name={formDataFields[index].primary.title.text}
                            >
                              {formDataFields[index].items.map((listItem, indexOf) => {
                                return (
                                  <Field
                                    key={`form-field-${indexOf}`}
                                    fieldName={formDataFields[index].primary.title.text
                                      .replace(/\s/g, '')
                                      .toLowerCase()}
                                    name={listItem.item.text.replace(/\s/g, '').toLowerCase()}
                                    label={listItem.item.text}
                                    // defaultChecked={checkBoxItem.default_checked}
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
                      </>
                    )} */}

                  {/* Add text area input */}
                  {formDataFields[index].slice_type === 'text_area_input' && (
                    <Field
                      key={`form-field-${index}`}
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
                    <div key={`form-btn-${index}`} className={'submitForm'}>
                      {invalid && (
                        <p>
                          <i className="material-icons-round" aria-hidden="true">
                            warning_amber
                          </i>
                          Please ensure that the required form fields are completed
                        </p>
                      )}
                      <BtnSubmit
                        name="submit"
                        label={formDataFields[index].primary.button_name.text}
                        style={formDataFields[index].primary.button_type}
                        invalid={invalid}
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
    </div>
  )
}

export default ContactNew

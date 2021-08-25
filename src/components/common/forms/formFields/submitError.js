import React from 'react'

import Button from '/src/components/common/buttons/linkButton'

import IconSubmitError from '/src/images/svg/icon-contact-error.inline.svg'

import styled from 'styled-components'

const Error = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.margin['1/2']};
  p:first-of-type {
    font-size: 133%;
    font-weight: 500;
    margin: 0;
  }

  svg {
    margin: 0;
    width: 64px;
    height: auto;
    // opacity: 0.6;
    color: ${({ theme }) => theme.colors.grey[400]};
  }

  span {
    margin: 0 auto 0 0;
    .btn {
      margin-top: ${({ theme }) => theme.margin['1/2']};
    }
  }
`

const SubmitError = ({ resetForm }) => {
  return (
    <Error className={'formSuccess'}>
      <p>Sorry, there has been an error</p>
      <IconSubmitError aria-hidden="true" />
      <p>Could you please try and complete the form again.</p>

      <Button
        buttonLabel={'Reset form'}
        buttonType={'button'}
        buttonStyle={'secondary'}
        onClick={resetForm}
        icon={'refresh'}
      />
    </Error>
  )
}
export default SubmitError

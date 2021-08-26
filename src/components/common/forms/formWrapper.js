import styled from 'styled-components'

const FormWraper = styled.div`
  .formArea {
    .titleArea {
      margin: 0 ${({ theme }) => theme.margin.default} ${({ theme }) => theme.margin.default};
      p {
        text-align: left;
      }
    }
  }

  /* [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  } */

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  input::placeholder,
  textarea::placeholder {
    color: inherit;
    opacity: 0.54;
  }

  /* input:-internal-autofill-selected,
  textarea:-internal-autofill-selected {
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.primary[100]} inset;
    /* background-color: ${({ theme }) => theme.colors.grey[500]} !important;
    background-image: none !important; */
  } */

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  [type='color'],
  [type='date'],
  [type='email'],
  [type='datetime-local'],
  [type='datetime'],
  [type='email'],
  [type='month'],
  [type='number'],
  [type='password'],
  [type='search'],
  [type='tel'],
  [type='text'],
  [type='time'],
  [type='url'],
  [type='week'],
  textarea,
  select {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.fontSize.base};
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: ${({ theme }) => theme.padding['1/2']};
    padding-right: ${({ theme }) => theme.padding['1xl']};
    background-color: #ffffff;
    border: 1px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    appearance: none;
    background-image: none;
    transition: border 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    resize: none;
  }

  textarea {
    resize: vertical;
  }

  .select {
    position: relative;
    width: fit-content !important;
    display: flex;
    align-items: center;
    margin-right: 100%;
    i {
      font-size: 26px;
      pointer-events: none;
      position: absolute;
      right: ${({ theme }) => theme.padding['1/4']};
    }
    select {
      padding-right: ${({ theme }) => theme.padding.default};
      min-width: 192px;
      width: fit-content;
    }
  }

  [type='search'] {
    /* border-radius: 999em; */
    display: flex;
    width: 100%;
  }

  form.hide {
    display: none;
  }

  form {
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
    grid-gap: ${({ theme }) => theme.padding.default};

    label,
    p {
      text-indent: ${({ theme }) => theme.padding['1/4']};
    }

    label {
      /* font-weight: 500; */
      position: relative;
      display: inherit;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      grid-gap: ${({ theme }) => theme.padding['1/8']};

      .required,
      .error {
        font-size: 80%;
        letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
        font-weight: normal;
        line-height: initial;
        width: fit-content;
        color: ${({ theme }) => theme.colors.alert.tomato};
        display: inline-flex;
        text-transform: uppercase;
      }
      span.required {
        color: inherit;
        opacity: 0.54;
      }

      span:last-of-type {
        display: flex;
        align-items: center;
        width: 100%;
      }

      span.textArea:last-of-type {
        align-items: flex-start;

        i {
          margin-top: ${({ theme }) => theme.margin['1/2']};
        }
      }
    }

    .checkBoxes,
    .radioBtns {
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      grid-row-gap: ${({ theme }) => theme.padding['1/2']};
      grid-column-gap: ${({ theme }) => theme.padding.default};
      p {
        width: 100%;
      }

      label {
        cursor: pointer;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: flex-start;
        text-indent: 0px;
        width: auto;
        grid-gap: ${({ theme }) => theme.padding['1/4']};
        span {
          /* white-space: nowrap; */
          padding-top: ${({ theme }) => theme.padding['1/8']};
        }
      }
    }

    .checkBoxes.vertical,
    .radioBtns.vertical {
      flex-direction: column;
      label {
        /* margin: ${({ theme }) => theme.margin.default} 0; */
      }
    }

    label.error {
      .required {
        display: none;
      }

      span:last-of-type {
        input {
          //border-color: tomato;
          border-left: 1px solid ${({ theme }) => theme.colors.alert.tomato};
        }
      }
    }

    label.touched {
      span {
        text-indent: none;

        i {
          position: absolute;
          right: ${({ theme }) => theme.margin['1/4']};
          color: ${({ theme }) => theme.colors.alert.l1.default};
          display: inline-block;
        }
      }
    }

    .submitForm {
      p {
        font-size: 80%;
        text-indent: 0;
        font-weight: normal;
        width: fit-content;
        opacity: 0.75;
        letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
        text-transform: uppercase;
        margin-bottom: ${({ theme }) => theme.margin['1/2']};
      }
      span {
        margin: 0;
        button {
          display: flex;
          align-items: center;
          margin: 0 auto 0 0;
        }

        button:disabled,
        button[disabled] {
          cursor: default;
          filter: blur(1px);
          opacity: 0.5;
        }
      }
    }
  

  .inputFields.hide,
  .formSuccess.hide,
  .formError.hide {
    display: none;
  }

  .formSuccess,
  .formError {
    /* display: flex;
    flex-direction: column;
    text-align: center;

    svg {
      margin: ${({ theme }) => theme.margin.default} auto;
      width: 96px;
      height: auto;
      // opacity: 0.6;
      color: ${({ theme }) => theme.colors.alert.l1.default};
    }

    .buttonPrimary {
      margin: ${({ theme }) => theme.margin.default} auto;
    } */
  }

  // Checkbox / Radio custom styles

  input[type='checkbox'],
  input[type='radio'] {
    margin-top: -1px;
    appearance: none;
    // Set up some color
    --active: ${({ theme }) => theme.colors.primary.default};
    --active-inner: #fff;
    --border: ${({ theme }) => theme.colors.grey[200]};
    --background: ${({ theme }) => theme.colors.grey[100]};
    --disabled: ${({ theme }) => theme.colors.grey[100]};
    --disabled-inner: ${({ theme }) => theme.colors.grey[100]};

    display: flex;
    /* height: ${({ theme }) => theme.padding.default};
    width: ${({ theme }) => theme.padding.default};
    min-width: ${({ theme }) => theme.padding.default}; */

    height: 28px;
    width: 28px;
    min-width: 28px;

    outline: none;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: all 0.3s, border-color 0.3s, box-shadow 0.2s;

    &:after {
      content: '';
      display: flex;
      width: inherit;
      aspect-ratio: 1;
      align-self: center;
      margin: 0 auto;

      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }

    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      border: 1px solid ${({ theme }) => theme.colors.primary[1100]};
    }

    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;

      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }

      & + label {
        cursor: not-allowed;
      }
    }

    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }

    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }

    &:not(.switch) {
      &:after {
        opacity: var(--o, 0);
      }

      &:checked {
        --o: 1;
      }
    }

    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }

  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: ${({ theme }) => theme.borderRadius.sm};

      &:after {
        width: 10px;
        height: 21px;
        border: 3px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 9px;
        top: 1px;
        margin-top: -5px;
        transform: rotate(var(--r, 43deg));
      }

      &:checked {
        --r: 43deg;
      }
    }

    &.switch {
      width: 38px;
      border-radius: 11px;

      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }

      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }

      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: 0.6;
          }
        }
      }
    }
  }

  input[type='radio'] {
    border-radius: 50%;

    &:after {
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, 0.7));
    }

    &:checked {
      --s: 0.5;
    }
  }
}
`

export default FormWraper

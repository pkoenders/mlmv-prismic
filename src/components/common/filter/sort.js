import styled from 'styled-components'

const Sort = styled.div`
  z-index: 200;
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 256px;
  /* max-width: fit-content; */
  width: 100%;
  align-items: center;
  margin-left: 0;
  user-select: none;
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    min-width: 100%;
  }

  p {
    margin: 0;
  }
  div {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    user-select: none;
    width: fit-content;
    position: relative;
    cursor: pointer;
    margin-left: ${({ theme }) => theme.margin['1/4']};
    background-color: ${({ theme }) => theme.colors.page.bground.default};
    border: 1px solid ${({ theme }) => theme.colors.card[300]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    button {
      padding: ${({ theme }) => theme.padding['1/4']} ${({ theme }) => theme.padding['1/2']};
    }

    div {
      /* min-width: fit-content; */
      background-color: inherit;
      border: inherit;
      border-top: none;
      border-radius: 0 0 ${({ theme }) => theme.borderRadius.sm}
        ${({ theme }) => theme.borderRadius.default};
      overflow: hidden;
      position: absolute;
      left: -1px;
      right: -1px;
      top: 100%;
      width: auto;
      visibility: hidden;
      display: block;
      flex-direction: column;
      margin: -2px 0 0 0;
      padding: 2px 0 0 0;
      box-shadow: ${({ theme }) => theme.boxShadow.md} !important;

      button {
        cursor: pointer;
        white-space: nowrap;
        text-align: left;
        width: 100%;
        padding: 10px ${({ theme }) => theme.padding['1/2']};
        border-top: 1px solid ${({ theme }) => theme.colors.card[300]};
      }
      button.hide {
        display: none;
      }

      button:hover {
        background-color: ${({ theme }) => theme.colors.primary[200]};
        border-top: 1px solid ${({ theme }) => theme.colors.primary[200]};
      }
    }
    div.isActive {
      visibility: visible;
    }
  }

  div:hover {
    border-color: ${({ theme }) => theme.colors.primary.default};
    button {
      i {
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }
`

export default Sort

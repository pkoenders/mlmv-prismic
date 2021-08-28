import styled from 'styled-components'

const CardContent = styled.div`
  .imageWrapper {
    position: relative;
    img {
      transition: ${({ theme }) => theme.transition.easeIn.default};
      aspect-ratio: 16/9;
      /* transform: scale(1); */
      transform: scale(1.033);
      object-position: center top !important;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/4']};
    border-top: 1px solid ${({ theme }) => theme.colors.card[300]};
    color: ${({ theme }) => theme.colors.page.default};
    padding: ${({ theme }) => theme.padding['1/2']};

    .title {
      font-size: 103%;
      font-weight: 600;
      align-content: space-between;
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: center;
      margin: 0;
      i {
        color: inherit;
        position: inherit;
        transition: ${({ theme }) => theme.transition.easeIn.default};
        right: 0px;
        margin-left: auto;
      }
    }
    p {
      margin-bottom: 0;
    }

    p:last-of-type {
      display: flex;
      flex-direction: row;
      grid-column-gap: ${({ theme }) => theme.padding['1/4']};
      align-items: center;
      i {
        color: ${({ theme }) => theme.colors.secondary.default};
      }
    }
  }

  &:hover {
    .imageWrapper {
      img {
        transform: scale(1);
        transition: ${({ theme }) => theme.transition.easeOut.default};
        object-position: center top;
      }
    }

    .content {
      text-decoration: none !important;
      .title {
        i {
          right: -${({ theme }) => theme.padding['1/8']};
          transition: ${({ theme }) => theme.transition.easeOut.default};
          color: ${({ theme }) => theme.colors.primary.default};
        }
      }
    }
  }
`
export default CardContent

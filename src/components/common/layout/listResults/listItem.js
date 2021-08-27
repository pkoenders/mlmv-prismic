import styled from 'styled-components'

const ListItem = styled.li`
  display:none;
  .card {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.textColor};
    text-decoration: none;
    display: flex;
     
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      flex-direction: column;
    }

    align-items: flex-start;
    background-color: ${({ theme }) => theme.colors.card[100]};
    border: 1px solid ${({ theme }) => theme.colors.card[300]};
    border-radius:  ${({ theme }) => theme.borderRadius.default};
    z-index: 10;
    width: 100%;

    transform: translateY(0px);
    transition: ${({ theme }) => theme.transition.easeOut.default};

    > div {
        display: inline-flex;
        flex-direction: column;
        padding: ${({ theme }) => theme.padding['1/2']};
        color: inherit;
        time, address, p, a {
        display:flex;
        }
    }

    .content {  
        width:100%;
        display:flex;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        p {
          margin-bottom:0;
        }
        > div {
          display: inherit;
          width:100%;
          font-size: 103%;
          font-weight: 600;
          align-content: space-between;
        i {
          color: inherit;
          margin-left: auto;
        }
      }
    }

    .details {
        min-width:33.3%;
        max-width:33.3%;
        height:100%;
        grid-column-gap: ${({ theme }) => theme.margin['1/4']};
        grid-row-gap: ${({ theme }) => theme.margin['1/2']};
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
            min-width:100%;
        }
        margin-left:auto;
        background-color: ${({ theme }) => theme.colors.card[200]};
        border-left: 1px solid ${({ theme }) => theme.colors.card[300]};
        > div{
          display: flex;
          flex-direction: column;
          grid-gap: inherit;
        }

        
        time,
        address,
        .passed,
        a {
            color: ${({ theme }) => theme.colors.page.default};
            align-items: flex-start;
            flex-direction: row;
            grid-gap: ${({ theme }) => theme.margin['1/4']};
            width: fit-content;
            i {
                color: inherit;
            }
            .srike {
              text-decoration: line-through;
            
              opacity: .5;
            }
        }
        .passed {
          grid-row-gap: 0;
          flex-wrap: wrap-reverse;
          i {
            align-self: center;
          }
        }

         a {
            color: ${({ theme }) => theme.colors.primary.default};
            border-bottom: 1px solid transparent;
        }

        a:hover {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.primary.default};
          border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
        }
        
      }
    }

    &:hover {
      .card {
        box-shadow: ${({ theme }) => theme.boxShadow.lg};
        text-decoration: none;
        border-color: ${({ theme }) => theme.colors.primary[400]};
        background-color: ${({ theme }) => theme.colors.primary[100]};
        .content { 
          p {
            i {
              color: ${({ theme }) => theme.colors.primary.default};
            }
          }
        }
        .details {
          background-color: ${({ theme }) => theme.colors.primary[200]};
          li.tagName {
            background-color: ${({ theme }) => theme.colors.primary[100]} !important;
          }
          li.isActive {
            background-color: ${({ theme }) => theme.colors.primary.default} !important;
          }
        }
      }
    }
  }

  &.show,
  &.isActive {
    display: flex;
    height: fit-content;
  }
`
export default ListItem

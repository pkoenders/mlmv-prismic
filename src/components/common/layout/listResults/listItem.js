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

    > span {
        display: inline-flex;
        flex-direction: column;
        padding: ${({ theme }) => theme.padding['1/2']};
        color: inherit;
        p, a {
        display:flex;
        }
    }

    .content {  
        width:100%;
        p:first-of-type {
        width:100%;
        font-size: 103%;
        font-weight: 600;
        align-content: space-between;
        margin-bottom: ${({ theme }) => theme.margin['1/4']};
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
        grid-gap: ${({ theme }) => theme.margin['1/2']};
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
            min-width:100%;
        }
        margin-left:auto;
        background-color: ${({ theme }) => theme.colors.card[200]};
        border-left: 1px solid ${({ theme }) => theme.colors.card[300]};
        .passed {
          display: flex;
          flex-direction: inherit;
          grid-gap: inherit;
          p{
           
            flex-wrap: wrap-reverse;
          }
        }
        p,a {
            color: ${({ theme }) => theme.colors.page.default};
            align-items: flex-start;
            margin-bottom:0;
            width:fit-content;
            i {
                /* margin-top:1px; */
                color: inherit;
                margin-right: ${({ theme }) => theme.margin['1/4']};
            }
            .srike {
              padding: 0;
              margin-right:${({ theme }) => theme.margin['1/4']};
              text-decoration:line-through;
              opacity: .5;
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

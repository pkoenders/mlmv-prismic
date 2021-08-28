import styled from 'styled-components'

const Card = styled.div`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textColor};
  text-decoration: none;
  display: flex;
  background-color: ${({ theme }) => theme.colors.card[100]};
  border: 2px solid ${({ theme }) => theme.colors.card[300]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  z-index: 10;
  width: 100%;
  transform: translateY(0px);
  transition: ${({ theme }) => theme.transition.easeOut.default};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary[600]};
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }
`

export default Card

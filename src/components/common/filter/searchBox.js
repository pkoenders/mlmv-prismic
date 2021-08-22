import styled from 'styled-components'

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0;
  // margin: 0 ${({ theme }) => theme.margin['1xl']} 0 0;
  width: 100%;
  grid-gap: ${({ theme }) => theme.margin['1/2']};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }

  @media (max-width: ${({ theme }) => theme.screens.md}) {
    margin: 0;
  }
`
export default SearchBox

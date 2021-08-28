import styled from 'styled-components'

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.margin['1/2']};
  margin: 0 ${({ theme }) => theme.margin.default};
  /* margin-bottom: ${({ theme }) => theme.margin['1/2']}; */
  padding: ${({ theme }) => theme.padding['1/2']} ${({ theme }) => theme.padding.default};
  background-color: ${({ theme }) => theme.colors.card[100]};
  border: 1px solid ${({ theme }) => theme.colors.card[300]};

  background-color: ${({ theme }) => theme.colors.tertiary[100]};
  border: 2px solid ${({ theme }) => theme.colors.tertiary[300]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  // background-color: ${({ theme }) => theme.colors.primary[100]};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    margin: 0;
  }
`

export default FilterWrapper

import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-bottom: 32px;
  margin: 0 100px;
  transition: margin 750ms;

  @media screen and (max-width: 800px) {
    margin: 0 10px;
  }
`;

export const BuyInPlayerWrapper = styled.div``;

export const NameWrapper = styled.div``;

export const BuyInWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BuyInHandsWrapper = styled.div`
  flex: 1;
`;

export const BuyInSwitcherWrapper = styled.div`
  align-self: flex-end;
`;

export const BuyInChipsWrapper = styled.div`
  flex: 1;
`;

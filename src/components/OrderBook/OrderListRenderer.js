// @flow
import React from 'react';
import styled from 'styled-components';
import { Loading, Colors } from '../Common';

type BidOrAsk = {
  price: number,
  amount: number,
  total: number,
};

type Props = {
  bids: Array<BidOrAsk>,
  asks: Array<BidOrAsk>,
  baseToken: string,
  quoteToken: string,
};

export const OrderBookRenderer = (props: Props) => {
  const { quoteToken, baseToken, bids, asks } = props;
  return (
    <OrderBookBox>
      {!bids && <Loading />}
      {bids && (
        <div className="list-container">
          <ListHeading>
            <HeaderRow>
              <HeaderCell>TOTAL ({quoteToken})</HeaderCell>
              <HeaderCell>AMOUNT ({baseToken})</HeaderCell>
              <HeaderCell>PRICE ({quoteToken})</HeaderCell>
            </HeaderRow>
          </ListHeading>
          <ul className="pt-list-unstyled list">
            {bids.map((order, index) => <BuyOrder key={index} index={index} order={order} />)}
          </ul>
        </div>
      )}
      {asks && (
        <div className="list-container">
          <ListHeading>
            <HeaderRow>
              <HeaderCell>PRICE ({quoteToken})</HeaderCell>
              <HeaderCell>AMOUNT ({baseToken})</HeaderCell>
              <HeaderCell>TOTAL ({quoteToken})</HeaderCell>
            </HeaderRow>
          </ListHeading>
          <ul className="pt-list-unstyled list">
            {asks.map((order, index) => <SellOrder key={index} index={index} order={order} />)}
          </ul>
        </div>
      )}
    </OrderBookBox>
  );
};

export type SingleOrderProps = {
  order: Object,
  index: number,
};

const BuyOrder = (props: SingleOrderProps) => {
  const { order } = props;
  return (
    <Row>
      <BuyRowBackground amount={order.relativeTotal} />
      <Cell>{order.total}</Cell>
      <Cell>{order.amount}</Cell>
      <Cell>{order.price}</Cell>
    </Row>
  );
};

const SellOrder = (props: SingleOrderProps) => {
  const { order, index } = props;
  return (
    <Row>
      <SellRowBackGround amount={order.relativeTotal} />
      <Cell>{order.price}</Cell>
      <Cell>{order.amount}</Cell>
      <Cell>{order.total}</Cell>
    </Row>
  );
};

const OrderBookBox = styled.div.attrs({})`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

const Row = styled.li.attrs({
  className: 'row',
})`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  width: 100%;
  margin: 0px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  border: 1px transparent;
  border-radius: 2px;
  box-shadow: inset 0px 1px 0 0 rgba(16, 22, 26, 0.15);

  &:hover {
    background-color: ${Colors.BLUE_MUTED};
    position: relative;
    z-index: 1;
    border-radius: 3px;
  }
`;

const SellRowBackGround = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => 100 * props.amount}% !important;
  background-color: ${Colors.SELL_MUTED} !important;
  z-index: 1;
`;

const BuyRowBackground = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props => 100 * props.amount}% !important;
  background-color: ${Colors.BUY_MUTED} !important;
  z-index: 1;
`;

const Cell = styled.span`
  min-width: 35px;
  width: 20%;
`;

const ListHeading = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 5px;
`;

const HeaderRow = styled.li`
  display: flex;
  justify-content: space-around;
  margin: 0px !important;
  padding-bottom: 10px;
  width: 100%;
  span {
    font-weight: 600;
  }
`;

const HeaderCell = styled.span`
  width: 20%;
`;

export default OrderBookRenderer;

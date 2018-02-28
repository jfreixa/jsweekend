import { Fragment } from "react";
import { List, Avatar, Spin, Button, Divider } from "antd";
import styled from "styled-components";
import TimeFormatter from "./TimeFormatter";
import TravelTime from "./TravelTime";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
`;

const Centered = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32;
  line-height: 32px;
  margin-bottom: 12px;
`;

const FlightList = ({ flights, onLoadMore, hasNextPage }) => {
  const loadMore = hasNextPage ? (
    <Centered>
      <Button onClick={onLoadMore}>See more flights</Button>
    </Centered>
  ) : null;

  return (
    <List
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={flights}
      renderItem={flight => (
        <List.Item>
          <Wrapper>
            <div>
              {flight.price.amount} <small>{flight.price.currency}</small>
            </div>
            <div>
              <Avatar src={flight.airlines[0].logoUrl} />
              <Divider type="vertical" />
              {flight.airlines[0].name}
            </div>
            <div>
              <TimeFormatter date={flight.departure.localTime} />
              <Divider type="vertical" />
              <TimeFormatter date={flight.arrival.localTime} />
            </div>
            <div>
              <TravelTime minutes={flight.duration} />
            </div>
            <div>
              {flight.departure.airport.city.name} ({
                flight.departure.airport.locationId
              }) <Divider type="vertical" /> {flight.arrival.airport.city.name}{" "}
              ({flight.arrival.airport.locationId})
            </div>
          </Wrapper>
        </List.Item>
      )}
    />
  );
};

export default FlightList;

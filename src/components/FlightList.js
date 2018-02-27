import { Fragment } from "react";
import { List, Avatar, Spin, Button } from "antd";
import TimeFormatter from "./TimeFormatter";
import TravelTime from "./TravelTime";

const loadingMore = false;

const FlightList = ({ allFlights, loading, showLoadingMore, onLoadMore }) => {
  const flights = allFlights.edges.map(edge => {
    return edge.node;
  });

  const loadMore = showLoadingMore ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px"
      }}
    >
      {loadingMore && <Spin />}
      {!loadingMore && <Button onClick={onLoadMore}>loading more</Button>}
    </div>
  ) : null;
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={flights}
      renderItem={flight => (
        <List.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexGrow: 1
            }}
          >
            <h3>
              {flight.price.amount} {flight.price.currency}
            </h3>
            <div>
              <Avatar src={flight.airlines[0].logoUrl} />
            </div>
            <h5>{flight.airlines[0].name}</h5>
            <div>
              <TimeFormatter date={flight.departure.localTime} /> -{" "}
              <TimeFormatter date={flight.arrival.localTime} />
            </div>
            <div>
              <TravelTime minutes={flight.duration} />
            </div>
            <div>
              {flight.departure.airport.city.name} ({
                flight.departure.airport.locationId
              }) -->{flight.arrival.airport.city.name} ({
                flight.arrival.airport.locationId
              })
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default FlightList;

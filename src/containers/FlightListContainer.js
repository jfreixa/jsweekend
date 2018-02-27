import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Spin } from "antd";

import FlightList from "../components/FlightList";

// before: $before

const query = gql`
  query($from: String!, $to: String!, $date: Date!, $first: Int) {
    allFlights(
      search: {
        from: [{ location: $from }]
        to: [{ location: $to }]
        date: { exact: $date }
      }
      options: { currency: EUR, locale: en_GB }
      first: $first
    ) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          price {
            amount
            currency
          }
          airlines {
            logoUrl
            name
          }
          duration
          departure {
            localTime
            airport {
              locationId
              city {
                name
              }
            }
          }
          arrival {
            localTime
            airport {
              locationId
              city {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const QueryHandler = ({ loading, error, allFlights, onLoadMore }) => {
  if (error) {
    console.error(error);
    return "error";
  }

  return (
    <FlightList
      allFlights={allFlights}
      loading={loading}
      showLoadingMore={allFlights.pageInfo.hasNextPage}
      onLoadMore={onLoadMore}
    />
  );
};

const ITEMS_FOR_PAGE = 5;

const FlightListContainer = graphql(query, {
  options: ({ from, to, date }) => ({
    variables: {
      from,
      to,
      date,
      first: ITEMS_FOR_PAGE
    }
  }),
  props({ ownProps, data: { loading, error, allFlights, fetchMore } }) {
    return {
      loading,
      error,
      allFlights,
      onLoadMore: () => {
        fetchMore({
          variables: {
            first: allFlights.edges.length + ITEMS_FOR_PAGE
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult
        });
      }
    };
  }
})(QueryHandler);

export default FlightListContainer;

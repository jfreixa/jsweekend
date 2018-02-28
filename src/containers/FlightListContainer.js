import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import query from './FlightListContainerQuery';
import CenteredSpin from '../components/CenteredSpin';
import FlightList from '../components/FlightList';

const QueryHandler = ({
  loading, error, allFlights, onLoadMore,
}) => {
  if (loading) {
    return <CenteredSpin size="large" />;
  }

  if (error) {
    console.error(error);
    return message.error('Wild error appeared, please retry it later');
  }
  const flights = allFlights.edges.map(edge => edge.node);

  return (
    <FlightList
      flights={flights}
      onLoadMore={onLoadMore}
      hasNextPage={allFlights.pageInfo.hasNextPage}
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
      first: ITEMS_FOR_PAGE,
    },
  }),
  props({
    ownProps, data: {
      loading, error, allFlights, fetchMore,
    },
  }) {
    return {
      loading,
      error,
      allFlights,
      onLoadMore: () => {
        fetchMore({
          variables: {
            first: allFlights.edges.length + ITEMS_FOR_PAGE,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
      },
    };
  },
})(QueryHandler);

export default FlightListContainer;

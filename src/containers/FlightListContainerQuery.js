import gql from "graphql-tag";

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
                namea
              }
            }
          }
        }
      }
    }
  }
`;

export default query;

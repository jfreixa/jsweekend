import React from "react";
import _ from "lodash";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { AutoComplete } from "antd";

const Option = AutoComplete.Option;

const query = gql`
  query($search: String!) {
    allLocations(search: $search, first: 20) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };

    this.searchLocations = this.searchLocations.bind(this);
    this.searchLocations = _.debounce(this.searchLocations, 500);
  }

  searchLocations(search) {
    this.props.client
      .query({
        query,
        variables: {
          search
        }
      })
      .then(data => {
        const locations = data.data.allLocations.edges.map(edge => {
          return edge.node.name;
        });
        this.setState({
          locations: [...new Set(locations)]
        });
      })
      .catch(() => {});
  }

  render() {
    return (
      <AutoComplete
        size="large"
        dataSource={this.state.locations}
        onSelect={this.props.handleChange}
        onSearch={this.searchLocations}
        placeholder={this.props.name}
      />
    );
  }
}
export default withApollo(Input);

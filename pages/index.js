import { Fragment, Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";

import withData from "../src/withData";
import FlightListContainer from "../src/containers/FlightListContainer";
import LocationInputContainer from "../src/containers/LocationInputContainer";

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      date: moment()
        .add(1, "day")
        .format(dateFormat)
    };
  }

  handleFrom = from => {
    this.setState({ from });
  };
  handleTo = to => {
    this.setState({ to });
  };

  handleDate = (momentDate, date) => {
    this.setState({ date });
  };

  empty() {
    const { from, to } = this.state;
    return from === "" || to === "";
  }

  render() {
    return (
      <Fragment>
        <Wrapper>
          <LocationInputContainer
            handleChange={this.handleFrom}
            name={"From"}
          />
          <LocationInputContainer handleChange={this.handleTo} name={"To"} />
          <DatePicker
            size="large"
            onChange={this.handleDate}
            defaultValue={moment(this.state.date, dateFormat)}
            format={dateFormat}
            disabledDate={currentDate => currentDate.isBefore(moment())}
          />
        </Wrapper>
        {!this.empty() && (
          <FlightListContainer
            from={this.state.from}
            to={this.state.to}
            date={this.state.date}
          />
        )}
      </Fragment>
    );
  }
}

export default withData(Index);

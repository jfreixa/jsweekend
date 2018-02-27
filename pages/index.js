import { Fragment, Component } from "react";
import Head from "next/head";
import { DatePicker } from "antd";
import moment from "moment";

import withData from "../src/withData";
import FlightListContainer from "../src/containers/FlightListContainer";
import LocationInputContainer from "../src/containers/LocationInputContainer";

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "Madrid",
      to: "Barcelona",
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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/antd@3/dist/antd.min.css"
          />
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px 0"
          }}
        >
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
        </div>
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

/**

 */

export default withData(Index);

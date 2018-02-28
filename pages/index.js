import { Fragment, Component } from "react";
import { DatePicker, Layout } from "antd";
import moment from "moment";
import styled from "styled-components";

import withData from "../src/withData";
import FlightListContainer from "../src/containers/FlightListContainer";
import LocationInputContainer from "../src/containers/LocationInputContainer";

const { MonthPicker, RangePicker } = DatePicker;
const { Header, Content, Footer } = Layout;

const dateFormat = "YYYY-MM-DD";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: auto;
`;

const InsideContent = styled.div`
  padding: 24px;
  background: #fff;
  text-align: center;
`;

const CenteredFooter = styled(Footer)`
  text-align: center;
`;

const FullLayout = styled(Layout)`
  height: 100vh;
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
      <FullLayout>
        <Header>
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
        </Header>
        <Layout>
          <StyledContent>
            <InsideContent>
              {!this.empty() ? (
                <FlightListContainer
                  from={this.state.from}
                  to={this.state.to}
                  date={this.state.date}
                />
              ) : (
                "There is nothing here! Fill the inputs above to search for flights."
              )}
            </InsideContent>
          </StyledContent>
        </Layout>
        <CenteredFooter>Jordi Freixa Serrabassa</CenteredFooter>
      </FullLayout>
    );
  }
}

export default withData(Index);

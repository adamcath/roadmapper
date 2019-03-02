import React, {Component} from 'react';
import SwimlaneView from "./components/SwimlaneView";
import Roadmap from "./model/Roadmap";

const firstDate = new Date("2019-01-01");
const lastDate = new Date("2020-01-01");

class Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
    };
  }

  componentDidMount() {
    fetch('/api/idea')
        .then(response => response.json())
        .then(ideas => this.setState({ideas: ideas}));
  }
  render() {
    return (
        <div>
          {
            new Roadmap(this.state.ideas).swimlanes.map(
                (swimlane) =>
                    <SwimlaneView
                        swimlane={swimlane}
                        firstDate={firstDate}
                        lastDate={lastDate}/>
            )
          }
        </div>);
  }
}

export default Client;

import React, {Component} from 'react';
import SwimlaneView from "./components/SwimlaneView";
import Roadmap from "./model/Roadmap";
import FilterEditor from "./components/FilterEditor";

const firstDate = new Date("2019-01-01");
const lastDate = new Date("2020-01-01");

class Client extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ideas: null,
            filter: {
                display: "idea",
                groupBy1: "initiative",
                groupBy2: "none"
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    updateState(fieldsToChange) {
        let newState = Object.assign({}, this.state);
        for (let field in fieldsToChange) {
            newState[field] = fieldsToChange[field];
        }
        this.setState(newState);
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        if (!this.state.ideas) {
            this.loadIdeas();
        }
    }

    loadIdeas() {
        var apiToCall;
        if (this.state.filter.display === "idea") {
            apiToCall = "/api/idea";
        } else if (this.state.filter.display === "initiative") {
            apiToCall = "/api/initiative";
        } else {
            throw Error("Unknown issue type " + this.state.filter.display)
        }

        fetch(apiToCall)
            .then(response => response.json())
            .then(ideas => this.updateState({ideas: ideas}));
    }

    handleChange(newFilter) {
        let newState = {filter: newFilter}

        if (this.state.filter.display !== newFilter.display) {
            newState.ideas = null;
        }

        this.updateState(newState);
    }

    render() {
        return (
            <div>
                <FilterEditor
                    filter={this.state.filter}
                    onChange={this.handleChange}/>
                {
                    this.state.ideas ?
                        new Roadmap(this.state.ideas,
                                    this.state.filter.groupBy1,
                                    this.state.filter.groupBy2).swimlanes.map(
                            (swimlane) =>
                                <SwimlaneView
                                    swimlane={swimlane}
                                    firstDate={firstDate}
                                    lastDate={lastDate}/>
                        ) :
                    <div style={{textAlign: "center"}}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                             width={128}
                             alt="Loading"/>
                    </div>
                }
            </div>);
    }
}

export default Client;

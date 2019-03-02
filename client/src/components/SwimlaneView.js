import * as React from "react";
import SwimlaneRowView from "./SwimlaneRowView";

const swimlane = {
    display: "flex",
    margin: "3pt",
}

const header = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
    width: "200px",
}

const rowContainer = {
    backgroundColor: "gray",
    padding: "3pt",
    flexGrow: "1",
}

export default class SwimlaneView extends React.Component {

    render() {
        let rows = this.packItemsToRows(this.props.swimlane.items);
        return (
            <div style={swimlane}>
                <div style={header}>
                    {this.props.swimlane.name}
                </div>
                <div style={rowContainer}>
                    {
                        rows.map(
                            (row) =>
                                <SwimlaneRowView
                                    row={row}
                                    firstDate={this.props.firstDate}
                                    lastDate={this.props.lastDate}/>
                        )
                    }
                </div>
            </div>
        )
    }

    packItemsToRows(items) {
        return [items]
    }
}
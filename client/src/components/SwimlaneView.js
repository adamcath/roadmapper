import * as React from "react";
import SwimlaneRowView from "./SwimlaneRowView";

const swimlane = {
    display: "flex",
    margin: "3pt",
    border: "1px solid #dbdfe2"
}

const header = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    color: "#7a66ff",
    width: "200px",
    fontWeight: "bold",
    fontSize: "11pt",
    borderRight: "1px solid #dbdfe2"
}

const rowContainer = {
    padding: "3pt",
    flexGrow: "1",
}

export default class SwimlaneView extends React.Component {

    packItemsToRows(items) {
        let sorted = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        let rows = [];
        sorted.forEach((item) => {
            let candidate = rows.find(
                (candidateRow) =>
                    item.startDate.getTime() > candidateRow[candidateRow.length - 1].endDate.getTime());
            if (candidate) {
                candidate.push(item);
            } else {
                rows.push([item]);
            }
        });
        return rows;
    }

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
}
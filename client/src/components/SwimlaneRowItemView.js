import * as React from "react";

const firstX = 0;
const lastX = 1000;

export default class SwimlaneRowItemView extends React.Component {

    dateToX(date) {
        let firstMs = this.props.firstDate.getTime();
        let lastMs = this.props.lastDate.getTime();
        let ms = date.getTime();

        return (ms - firstMs) * ((lastX - firstX)/(lastMs - firstMs));
    }

    computePosition() {
        let result = {
            backgroundColor: "#edeff0",
            padding: "3pt",
            margin: "3pt",
            display: "inline-block",
            overflow: "hidden"
        };

        let startDate = this.props.item.startDate;
        let endDate = this.props.item.endDate;

        if (startDate) {
            result.position = "absolute";
            result.left = this.dateToX(startDate);
        }
        if (startDate && endDate) {
            result.width = this.dateToX(endDate) - this.dateToX(startDate);
        } else {

        }
        return result;
    }

    render() {
        return (
            <div style={this.computePosition()}>
                <a href={"https://jira.corp.appdynamics.com/browse/" + this.props.item.key} target="_blank">
                    {this.props.item.name}
                </a>
            </div>
        );
    }
}
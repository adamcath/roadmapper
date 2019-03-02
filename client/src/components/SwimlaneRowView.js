import * as React from "react";
import SwimlaneRowItemView from "./SwimlaneRowItemView";

const row = {
    margin: "3pt",
    position: "relative",
    height: "30px",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

export default class SwimlaneRowView extends React.Component {
    render() {
        return (
            <div style={row}>
                {
                    this.props.row.map(
                        (item) =>
                            <SwimlaneRowItemView
                                item={item}
                                firstDate={this.props.firstDate}
                                lastDate={this.props.lastDate}/>
                    )
                }
            </div>
        );
    }
}
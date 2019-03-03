import * as React from "react";

const editor = {
    margin: "3pt",
    padding: "6pt",
    backgroundColor: "#f1f3f5",
    border: "1px solid #dbdfe2"
}

const filterSection = {
    paddingRight: "12pt"
}

export default class FilterEditor extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    getNewFilter() {
        let result = {
            display: this.displaySelect.value,
            groupBy1: this.groupBy1Select.value,
            groupBy2: this.groupBy2Select.value
        }
        if (result.display == "initiative" && result.groupBy1 == "initiative") {
            result.groupBy1 = "theme";
        }
        if (result.display == "initiative" && result.groupBy2 == "initiative") {
            result.groupBy2 = "none";
        }
        return result;
    }

    handleChange() {
        this.props.onChange(this.getNewFilter());
    }

    render() {
        return (
            <div style={editor}>
                <span style={filterSection}>
                    <span>Display:</span>
                    <select ref={(elt)=> this.displaySelect = elt} onChange={this.handleChange} value={this.props.filter.display}>
                        <option value={"idea"}>{"Ideas"}</option>
                        <option value={"initiative"}>{"Product Initiatives"}</option>
                    </select>
                </span>
                <span style={filterSection}>
                    <span>Group by:</span>
                    <select ref={(elt)=> this.groupBy1Select = elt} onChange={this.handleChange} value={this.props.filter.groupBy1}>
                        <option value={"theme"}>{"Theme"}</option>
                        <option value={"productManager"}>{"Product Manager"}</option>
                        {this.props.filter.display !== "initiative" && <option value={"initiative"}>{"Product Initiative"}</option>}
                    </select>
                </span>
                <span style={filterSection}>
                    <span>Then by:</span>
                    <select ref={(elt)=> this.groupBy2Select = elt} onChange={this.handleChange} value={this.props.filter.groupBy2}>
                        <option value={"none"}>{"None"}</option>
                        <option value={"theme"}>{"Theme"}</option>
                        <option value={"productManager"}>{"Product Manager"}</option>
                        {this.props.filter.display !== "initiative" && <option value={"initiative"}>{"Product Initiative"}</option>}
                    </select>
                </span>
            </div>
        )
    }
}
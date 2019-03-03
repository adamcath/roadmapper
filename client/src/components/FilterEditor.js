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
        return {
            display: this.displaySelect.value,
            groupBy1: this.groupBy1Select.value,
            groupBy2: this.groupBy2Select.value
        }
    }

    handleChange() {
        this.props.onChange(this.getNewFilter());
    }

    render() {
        return (
            <div style={editor}>
                <span style={filterSection}>
                    <span>Display:</span>
                    <select ref={(elt)=> this.displaySelect = elt} onChange={this.handleChange}>
                        {this.renderOption("idea", "Ideas", this.props.filter.display)}
                        {this.renderOption("initiative", "Product Initiatives", this.props.filter.display)}
                    </select>
                </span>
                <span style={filterSection}>
                    <span>Group by:</span>
                    <select ref={(elt)=> this.groupBy1Select = elt} onChange={this.handleChange}>
                        {this.renderOption("theme", "Theme", this.props.filter.groupBy1)}
                        {this.renderOption("productManager", "Product Manager", this.props.filter.groupBy1)}
                        {/*{this.renderOption("initiative", "Product Initiative", this.props.filter.groupBy1)}*/}
                    </select>
                </span>
                <span style={filterSection}>
                    <span>Then by:</span>
                    <select ref={(elt)=> this.groupBy2Select = elt} onChange={this.handleChange}>
                        {this.renderOption("theme", "Theme", this.props.filter.groupBy2)}
                        {this.renderOption("productManager", "Product Manager", this.props.filter.groupBy2)}
                        {/*{this.renderOption("initiative", "Product Initiative", this.props.filter.groupBy2)}*/}
                    </select>
                </span>
            </div>
        )
    }

    renderOption(value, label, prop) {
        return <option value={value} selected={prop === value ? "selected" : ""}>{label}</option>
    }
}
export default class Roadmap {
    constructor(issues, groupBy1, groupBy2) {
        // debugger;
        this.swimlanes = [];
        issues.forEach((issue) => {
            this
                .getOrCreateSwimlane(this.getGroupingKey(issue, groupBy1))
                .getOrCreateSwimlane(this.getGroupingKey(issue, groupBy2))
                .addissue(issue);
        });
    }

    getOrCreateSwimlane(name) {
        let result = this.swimlanes.find((swimlane) => swimlane.name === name);
        if (!result) {
            result = new InternalSwimlane(name);
            this.swimlanes.push(result);
        }
        return result;
    }

    getGroupingKey(issue, fieldName) {
        if (fieldName === "theme") {
            return issue.themes[0];
        } else if (fieldName == "productManager") {
            return issue.assignee;
        } else {
            throw Error("Unknown group by field: " + fieldName);
        }
    }
}

export class InternalSwimlane {
    constructor(name) {
        this.name = name;
        this.subSwimlanes = [];
    }

    getOrCreateSwimlane(name) {
        let result = this.subSwimlanes.find((swimlane) => swimlane.name === name);
        if (!result) {
            result = new LeafSwimlane(name);
            this.subSwimlanes.push(result);
        }
        return result;
    }

    hasChildSwimlanes() {
        return true;
    }
}

export class LeafSwimlane {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addissue(issue) {
        let startMonth = Math.ceil(Math.random() * 8);
        let endMonth = startMonth + Math.ceil(Math.random() * 6)
        this.items.push(
            {
                key: issue.key,
                name: issue.summary,
                startDate: new Date("2019-" + startMonth + "-01"),
                endDate: new Date("2019-" + endMonth + "-01")
            });
    }

    hasChildSwimlanes() {
        return false;
    }
}
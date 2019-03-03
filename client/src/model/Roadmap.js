const swimlaneComparator = function(a, b) {
    if (a.name === "None") {
        return 1;
    }
    if (b.name === "None") {
        return -1;
    }
    return a.name < b.name ? -1 : a.name > b.name;
}

export default class Roadmap {
    constructor(issues, groupBy1, groupBy2) {
        // debugger;
        this.swimlanes = [];
        this.levels = groupBy2 === "none" ? 1 : 2;
        issues.forEach((issue) => {
            let swimlane = this.getOrCreateSwimlane(this.getGroupingKey(issue, groupBy1));
            if (this.levels > 1) {
                swimlane = swimlane.getOrCreateSwimlane(this.getGroupingKey(issue, groupBy2))
            }
            swimlane.addissue(issue);
        });
        this.swimlanes.sort(swimlaneComparator);
        this.swimlanes.forEach((s) => s.sort());
    }

    getOrCreateSwimlane(name) {
        let result = this.swimlanes.find((swimlane) => swimlane.name === name);
        if (!result) {
            result = this.levels > 1 ? new InternalSwimlane(name) : new LeafSwimlane(name);
            this.swimlanes.push(result);
        }
        return result;
    }

    getGroupingKey(issue, fieldName) {
        if (fieldName === "theme") {
            return issue.themes[0];
        } else if (fieldName === "productManager") {
            return issue.assignee;
        } else if (fieldName === "initiative") {
            return issue.linkedInitiative;
        } else if (fieldName === "primaryComponent") {
            return issue.primaryComponent;
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

    sort() {
        this.subSwimlanes.sort(swimlaneComparator);
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

    sort() {

    }
}
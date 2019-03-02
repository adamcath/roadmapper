export default class Roadmap {
    constructor(ideas) {
        this.swimlanes = [];
        ideas.forEach((idea) => {
            this.getOrCreateSwimlane(idea.themes[0]).addIdea(idea);
        });
    }

    getOrCreateSwimlane(name) {
        let result = this.swimlanes.find((swimlane) => swimlane.name === name);
        if (!result) {
            result = new Swimlane(name);
            this.swimlanes.push(result);
        }
        console.log(result);
        return result;
    }
}

export class Swimlane {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addIdea(idea) {
        let startMonth = Math.ceil(Math.random() * 8);
        let endMonth = startMonth + Math.ceil(Math.random() * 6)
        this.items.push(
            {
                key: idea.key,
                name: idea.summary,
                startDate: new Date("2019-" + startMonth + "-01"),
                endDate: new Date("2019-" + endMonth + "-01")
            });
    }
}
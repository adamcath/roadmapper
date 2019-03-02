export default class Roadmap {
    constructor(ideas) {
        this.swimlanes = [];
        ideas.forEach((idea) => {
            idea.themes.forEach((theme) => {
                this.getOrCreateSwimlane(theme).addIdea(idea);
            });
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
        this.items.push({name: idea.summary});
    }
}
let express = require('express');
let JiraClient = require('jira-connector');
let request = require('request')

let server = express();

let cookieJar = request.jar();
cookieJar.setCookie(request.cookie('ajs_user_id=null'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('ajs_group_id=null'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('ajs_anonymous_id=%228c1e2f39-e8b5-4286-b3ca-88bbee7d6615%22'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('ser_app=%7B%22original%22%3A%7B%22utm_campaign%22%3A%22website%22%2C%22utm_term%22%3A%22unknown%22%2C%22utm_content%22%3A%22unknown%22%2C%22utm_source%22%3A%22unknown%22%2C%22utm_medium%22%3A%22direct%22%2C%22utm_budget%22%3A%22none%22%2C%22landing_page%22%3A%22https%3A//www.appdynamics.com/careers/4058%22%7D%2C%22recent%22%3A%7B%22utm_campaign%22%3A%22website%22%2C%22utm_term%22%3A%22unknown%22%2C%22utm_content%22%3A%22unknown%22%2C%22utm_source%22%3A%22unknown%22%2C%22utm_medium%22%3A%22direct%22%2C%22utm_budget%22%3A%22none%22%2C%22landing_page%22%3A%22https%3A//www.appdynamics.com/careers/4058%22%7D%7D'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('_gcl_au=1.1.1236902052.1546796335'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('_mkto_trk=id:031-WIX-618&token:_mch-appdynamics.com-1546796335042-53948'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('_actvc=1'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('ei_client_id=5c323d2f247f1d0014f725f8'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('_ga=GA1.2.61013133.1546796336'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('_actmu=102226118.415872738.1546796335267.1546796335267'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('mp_73623d035cdabf11e9cfd7580c6d5a97_mixpanel=%7B%22distinct_id%22%3A%20%2200uleamowGFyrq3go2p6%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fidentity.appdynamics.com%2Fa%2Fapp%2Frequest%2Fcontext%3FfromLogin%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22identity.appdynamics.com%22%2C%22New%20User%22%3A%20%22%22%2C%22Application%22%3A%20%22%22%2C%22Edition%22%3A%20%22%22%2C%22SKU%22%3A%20%22%22%7D'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('JSESSIONID=C8AF4002301C3A2F4CDDADC9D5C14B5F'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('seraph.rememberme.cookie=116247%3A7f31a850876098c0142aad0ca7addfff5bb1b8af'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('AWSELB=1FA93F63083DA1820E8A96BEEF22B922EAEEC73D7ADA8EFAAAB4D8063B34010AE0620EE796AD7E06FC8A1C1E4FD0436AB66D3FD7A28953188D63DB85B7C99AD9C4A6306CD2D6184CA91608E3B0F7A930218D387130'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('atlassian.xsrf.token=AG87-S37R-QM8W-6VWE_ebb36b84dbf7703ab068fe0b16275a133f38d161_lin'), 'https://jira.corp.appdynamics.com');
cookieJar.setCookie(request.cookie('AJS.conglomerate.cookie="|hipchat.inapp.links.first.clicked.acath@appdynamics.com=false'), 'https://jira.corp.appdynamics.com');

const jiraClient = new JiraClient(
    {
        host: "jira.corp.appdynamics.com",
        cookie_jar: cookieJar
    });

function fetchIssues(jql, callback) {
    jiraClient.search.search(
        {
            jql: jql,
            maxResults: 1000,
            fields: ['summary', 'customfield_24512', 'customfield_24510', 'assignee', 'issuelinks', 'issuetype'],
            timeout: 60000
        }, (error, searchResult) => {
            if (error) {
                console.error(error);
                callback([]);
            }
            let result = [];
            searchResult.issues.forEach((issue) => {
                // console.log(JSON.stringify(Object.entries(issue.fields).filter((entry) => entry[1] != null), null, 2));
                // return;

                let assignee = issue.fields.assignee;
                let themesField = issue.fields.customfield_24512;
                let primaryComponentField = issue.fields.customfield_24510;
                let initiativeLink =
                    issue.fields.issuetype.name !== "Product Initiative" &&
                    issue.fields.issuelinks &&
                    issue.fields.issuelinks.find(
                        (link) => ((link.type.name === "Requirements" || link.type.name === "Hierarchy") &&
                                   (link.inwardIssue &&
                                    link.inwardIssue.fields.issuetype.name === "Product Initiative") ||
                                   (link.outwardIssue &&
                                    link.outwardIssue.fields.issuetype.name === "Product Initiative")));
                let initiativeLinkIssue = initiativeLink && (initiativeLink.inwardIssue || initiativeLink.outwardIssue);

                result.push(
                    {
                        key: issue.key,
                        summary: issue.fields.summary,
                        assignee: assignee ? assignee.displayName : "None",
                        themes: themesField ? themesField.map((theme) => theme.value) : ['None'],
                        primaryComponent: primaryComponentField ? primaryComponentField.value : "None",
                        linkedInitiative: initiativeLink ? initiativeLinkIssue.fields.summary : "None"
                    });
            });
            callback(result);
        }
    );
}

server.get('/api/idea', function (req, res) {
    fetchIssues(
        'project=idea and issuetype=idea and status=accepted',
        (issues) => res.send(JSON.stringify(issues)));
});

server.get('/api/epic', function (req, res) {
    fetchIssues(
        'issuetype=epic and resolution=unresolved',
        (issues) => res.send(JSON.stringify(issues)));
});

server.get('/api/initiative', function (req, res) {
    fetchIssues(
        'project=idea and issuetype="Product Initiative" and resolution=unresolved',
        (issues) => res.send(JSON.stringify(issues)));
});

server.listen(3001, function () {
    console.log('Server started on port 3001!');
});

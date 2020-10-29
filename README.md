# AWS Amplify Challenge

Link: http://awsamplifychallenge-20201029145449-hostingbucket-dev.s3-website-us-west-2.amazonaws.com/

## Stack

-   Creat-React-App
-   Apollo
-   AWS-Amplify
-   Prettier/ ESList
-   Material UI

### To run locally

1. `github clone https://github.com/justinsunho/aws-amplify-challenge`
2. `npm i`
3. `amplify init`
4. Use all default settings, react, graphql
5. When/if prompted use this schema:

```
type Employee @model {
    id: ID!
    firstname: String
    lastname: String
    skills: [Skill] @connection(keyName: "byEmployee", fields: ["id"])
}

type Skill @model @key(name: "byEmployee", fields: ["employeeID"]) {
    id: ID!
    employeeID: ID!
    employee: Employee @connection(fields: ["employeeID"])
    name: String
}
```

5. `amplify publish`
6. `npm run start`

### Project Notes

-   The menu links are dead, I used them to demonstrate the ability to use links, since this isn't a full app (yet) I didn't feel it necessary to create unecessary pages

### Features I would add in the future

-   Sorting of items by clicking on Table Headers
-   Testing
-   Loading animations

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmployee = /* GraphQL */ `
    query GetEmployee($id: ID!) {
        getEmployee(id: $id) {
            id
            firstname
            lastname
            skills {
                items {
                    id
                    employeeID
                    name
                    createdAt
                    updatedAt
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listEmployees = /* GraphQL */ `
    query ListEmployees(
        $filter: ModelEmployeeFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                firstname
                lastname
                skills {
                    nextToken
                    items {
                        name
                    }
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getSkill = /* GraphQL */ `
    query GetSkill($id: ID!) {
        getSkill(id: $id) {
            id
            employeeID
            employee {
                id
                firstname
                lastname
                skills {
                    nextToken
                }
                createdAt
                updatedAt
            }
            name
            createdAt
            updatedAt
        }
    }
`;
export const listSkills = /* GraphQL */ `
    query ListSkills(
        $filter: ModelSkillFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                employeeID
                employee {
                    id
                    firstname
                    lastname
                    createdAt
                    updatedAt
                }
                name
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;

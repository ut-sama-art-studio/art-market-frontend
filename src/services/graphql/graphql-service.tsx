import { apiUrl } from "@/lib/configs";
import { gql, GraphQLClient } from "graphql-request";
import { GraphQLError } from "graphql";
import { getAuthToken } from "../auth/auth-service";

const endpoint = apiUrl + "/graphql";
var graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: `Bearer ${getAuthToken()}`,
    },
});

export function graphqlUseToken(token: string) {
    graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}

export async function graphqlRequest(gqlRequest: string): Promise<any | undefined> {
    try {
        const data = await graphQLClient.request<User>(gqlRequest);
        console.log(data);
        return data
    } catch (error) {
        if (error instanceof GraphQLError) {
            console.error("GraphQL Error:", error.message);
            error.locations?.forEach((location) => {
                console.error(
                    `Location: Line ${location.line}, Column ${location.column}`
                );
            });
        } else if (error instanceof Error) {
            console.error("Server Error:", error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
        return undefined;
    }
}

interface User {
    id: string;
    name: string;
    email?: string;
    profilePicture?: string;
    bio?: string;
    role?: string;
}

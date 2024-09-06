import { apiUrl } from "@/lib/configs";
import { gql, GraphQLClient } from "graphql-request";
import { GraphQLError } from "graphql";
import { getAuthToken } from "../auth/auth-service";

const endpoint = apiUrl + "/graphql";
var graphQLClient = new GraphQLClient(endpoint, {
    headers: {},
});

export async function graphqlUseToken(token: string) {
    if (token) {
        graphQLClient.setHeader("Authorization", `Bearer ${token}`);
    }
}

export async function graphqlRequest(
    gqlRequest: string,
    variables?: Object
): Promise<any> {
    // const token = getAuthToken();
    // if (token) {
    //     graphQLClient.setHeader("Authorization", `Bearer ${token}`);
    // }

    try {
        const data = await graphQLClient.request(gqlRequest, variables);

        return data;
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

        return Promise.reject(error);
    }
}

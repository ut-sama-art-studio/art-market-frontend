import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    gql,
    DocumentNode,
} from "@apollo/client";
import { apiUrl } from "@/lib/configs";
import { getAuthToken } from "../auth/auth-service";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: apiUrl + "/graphql",
});

const uploadLink = createUploadLink({
    uri: apiUrl + "/graphql",
    headers: {
        "keep-alive": "true",
    },
});

// auth middleware
const authLink = setContext((_, { headers }) => {
    // get the authentication token if it exists
    const token = getAuthToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const uploadClient = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
});

const handleGraphQLErr = (err: any): Promise<never> => {
    if (err instanceof Error) {
        console.error("GraphQL Error:", err.message);
    } else {
        console.error("Unexpected Error:", err);
    }
    return Promise.reject(err);
};

export async function graphqlQuery(
    gqlRequest: DocumentNode,
    variables?: Record<string, any>
): Promise<any> {
    try {
        const { data } = await client.query({
            query: gqlRequest,
            variables,
        });
        return data;
    } catch (error: any) {
        return handleGraphQLErr(error);
    }
}

export async function graphqlMutate(
    gqlRequest: DocumentNode,
    variables?: Record<string, any>
): Promise<any> {
    try {
        const { data } = await client.mutate({
            mutation: gqlRequest,
            variables,
        });
        return data;
    } catch (error) {
        return handleGraphQLErr(error);
    }
}

// Use this mutation to upload files
export async function graphqlUploadMutate(
    gqlRequest: DocumentNode,
    variables?: Record<string, any>
): Promise<any> {
    try {
        const { data } = await uploadClient.mutate({
            mutation: gqlRequest,
            variables,
        });
        return data;
    } catch (error) {
        return handleGraphQLErr(error);
    }
}

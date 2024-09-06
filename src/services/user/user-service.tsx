import { gql } from "graphql-request";
import { graphqlRequest } from "../graphql/graphql-service";

export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    bio: string;
    role: string;
};

// needs to be authenticated
export const fetchAuthUser = async (): Promise<User> => {
    const res = await graphqlRequest(gql`
        query Me {
            me {
                id
                name
                username
                email
                profilePicture
                bio
                role
            }
        }
    `);
    if (res != undefined) {
        return res.me;
    } else {
        throw new Error("Failed to fetch user data");
    }
};

export const fetchUserById = async (id: string): Promise<User> => {
    const res = await graphqlRequest(
        gql`
            query getUserById($id: ID!) {
                user(id: $id) {
                    id
                    name
                    username
                    email
                    profilePicture
                    bio
                    role
                }
            }
        `,
        { id: id }
    );
    if (res != undefined) {
        return res.user;
    } else {
        throw new Error("Failed to fetch user data");
    }
};

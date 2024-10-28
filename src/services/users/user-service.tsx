import { gql } from "@apollo/client";
import { graphqlMutate, graphqlQuery, graphqlUploadMutate } from "../graphql/graphql-service";

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
    const res = await graphqlQuery(gql`
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
    if (res?.me) {
        return res.me;
    } else {
        return Promise.reject("Failed to fetch me");
    }
};

export const fetchUserById = async (id: string): Promise<User> => {
    const res = await graphqlQuery(
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
    if (res?.user) {
        return res.user;
    } else {
        return Promise.reject("Failed to fetch user data");
    }
};

export const updateUser = async (updatedUser: User): Promise<Partial<User>> => {
    const res = await graphqlMutate(
        gql`
            mutation updateUser($id: ID!, $input: UpdateUser!) {
                updateUser(id: $id, input: $input) {
                    id
                    name
                    bio
                    profilePicture
                }
            }
        `,
        {
            id: updatedUser.id,
            input: {
                name: updatedUser.name,
                bio: updatedUser.bio,
                profilePicture: updatedUser.profilePicture,
            },
        }
    );
    if (res?.updateUser) {
        return res.updateUser;
    } else {
        return Promise.reject("Failed to update user");
    }
};

// Returns a link to the new profile picture
export const changeProfilePicture = async (file: File): Promise<string> => {
    const res = await graphqlUploadMutate(
        gql`
            mutation updateProfilePicture($file: Upload!) {
                updateProfilePicture(file: $file) {
                    profilePicture
                }
            }
        `,
        { file }
    );
    console.log(res);
    if (res?.updateProfilePicture?.profilePicture) {
        return res.updateProfilePicture.profilePicture;
    } else {
        return Promise.reject("Failed up update profile picture");
    }
};

import { gql } from "@apollo/client";
import {
    graphqlMutate,
    graphqlQuery,
    graphqlUploadMutate,
} from "../graphql/graphql-service";
import { CreateMerchFormData } from "@/components/merch/create-merch-form";

export type MerchItem = {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    price: number;
    inventory?: number;
    type: string;
    width?: number;
    height?: number;
    unit?: string;
    images: string[];
};

// Function to create a new merch item
export const createMerch = async (
    newMerch: CreateMerchFormData
): Promise<MerchItem> => {
    const res = await graphqlUploadMutate(
        gql`
            mutation createMerch($input: NewMerch!) {
                createMerch(input: $input) {
                    name
                    description
                    price
                    inventory
                    type
                    width
                    height
                    unit
                    images
                }
            }
        `,
        {
            input: {
                name: newMerch.merchName,
                description: newMerch.description,
                price: newMerch.price,
                inventory: newMerch.inventory,
                type: newMerch.type,
                width: newMerch.width,
                height: newMerch.height,
                unit: newMerch.unit,
                images: newMerch.images,
            },
        }
    );

    if (res?.createMerch) {
        return res.createMerch;
    } else {
        return Promise.reject("Failed to create merch item");
    }
};

// Function to update an existing merch item
export const updateMerch = async (
    updatedMerch: MerchItem
): Promise<MerchItem> => {
    const res = await graphqlMutate(
        gql`
            mutation updateMerch($input: UpdateMerch!) {
                updateMerch(input: $input) {
                    ownerId
                    name
                    description
                    price
                    inventory
                    type
                    width
                    height
                    unit
                    images
                }
            }
        `,
        { input: updatedMerch }
    );

    if (res?.updateMerch) {
        return res.updateMerch;
    } else {
        return Promise.reject("Failed to update merch item");
    }
};

// Function to delete a merch item by ID
export const deleteMerch = async (id: string): Promise<boolean> => {
    const res = await graphqlMutate(
        gql`
            mutation deleteMerch($id: ID!) {
                deleteMerch(id: $id)
            }
        `,
        { id }
    );

    if (res !== undefined) {
        return res;
    } else {
        return Promise.reject("Failed to delete merch item");
    }
};

// Function to fetch all merch items owned by the authenticated user
export const fetchUserMerchItems = async (
    userId: string
): Promise<MerchItem[]> => {
    const res = await graphqlQuery(
        gql`
            query userMerchItems($userId: ID!) {
                userMerchItems(userId: $userId) {
                    id
                    ownerId
                    name
                    description
                    price
                    inventory
                    type
                    width
                    height
                    unit
                    images
                }
            }
        `,
        { userId }
    );

    if (res?.userMerchItems) {
        return res.userMerchItems;
    } else {
        return Promise.reject("Failed to fetch merch items");
    }
};

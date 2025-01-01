import { gql } from "@apollo/client";
import {
    graphqlMutate,
    graphqlQuery,
    graphqlUploadMutate,
} from "../graphql/graphql-service";
import { CreateMerchFormData } from "@/components/merch/create-merch-form";

export type Merch = {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    price: number;
    inventory?: number;
    type: MerchType;
    width?: number;
    height?: number;
    unit?: string;
    images: string[];
};

export type MerchType =
    | "poster"
    | "postcard"
    | "keychain"
    | "sticker"
    | "other";

// Function to create a new merch item
export const createMerch = async (
    newMerch: CreateMerchFormData
): Promise<Merch> => {
    const res = await graphqlUploadMutate(
        gql`
            mutation createMerch($input: NewMerch!) {
                createMerch(input: $input) {
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
export const updateMerch = async (updatedMerch: Merch): Promise<Merch> => {
    const res = await graphqlMutate(
        gql`
            mutation updateMerch($input: UpdateMerch!) {
                updateMerch(input: $input) {
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
export const fetchUserMerchItems = async (userId: string): Promise<Merch[]> => {
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

// have to follow sql names
export type QueryMerchPageArgs = {
    keyword?: string;
    type?: MerchType | "";
    page?: number; // page number
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type MerchPage = {
    items: Merch[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
};

const defaultQueryMerchPageArgs: QueryMerchPageArgs = {
    keyword: "",
    type: "",
    page: 1,
    pageSize: 24,
    sortBy: "timestamp",
    sortOrder: "desc",
};
export const queryMerchPage = async (
    filterArgs?: QueryMerchPageArgs
): Promise<MerchPage> => {
    filterArgs = { ...defaultQueryMerchPageArgs, ...filterArgs };

    const res = await graphqlQuery(
        gql`
            query SearchMerch(
                $keyword: String
                $type: String
                $minPrice: Float
                $maxPrice: Float
                $page: Int
                $pageSize: Int
                $sortBy: String
                $sortOrder: String
            ) {
                searchMerch(
                    keyword: $keyword
                    type: $type
                    minPrice: $minPrice
                    maxPrice: $maxPrice
                    page: $page
                    pageSize: $pageSize
                    sortBy: $sortBy
                    sortOrder: $sortOrder
                ) {
                    items {
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
                    totalItems
                    totalPages
                    currentPage
                    pageSize
                }
            }
        `,
        filterArgs
    );

    if (res?.searchMerch) {
        return res.searchMerch;
    } else {
        return Promise.reject("Failed to fetch merch page");
    }
};

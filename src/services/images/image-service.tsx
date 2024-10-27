import { gql } from "@apollo/client";
import { graphqlUploadMutate } from "../graphql/graphql-service";

// Returns the url of the image after uploading
export const uploadImage = async (file: File): Promise<string> => {
    const res = await graphqlUploadMutate(
        gql`
            mutation singleUpload($file: Upload!) {
                singleUpload(file: $file)
            }
        `,
        { file }
    );

    if (res != undefined) {
        return res.singleUpload;
    } else {
        throw new Error("Failed to upload file");
    }
};

// Returns the urls of the image after uploading
export const uploadMultipleImages = async (
    files: File[]
): Promise<string[]> => {
    const res = await graphqlUploadMutate(
        gql`
            mutation multipleUpload($req: [Upload!]!) {
                multipleUpload(req: $req)
            }
        `,
        { req: files }
    );

    if (res != undefined) {
        return res.multipleUpload;
    } else {
        throw new Error("Failed to upload files");
    }
};

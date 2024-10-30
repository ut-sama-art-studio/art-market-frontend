import React, { useState } from "react";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export interface CreateMerchFormData {
    merchName: string;
    description: string;
    price: number;
    inventory: number;
    type: string;
    height: number;
    width: number;
    unit: string;
    images: File[];
}

interface CreateMerchFormProps {
    handleAddMerch: (formData: CreateMerchFormData) => void;
}
export default function CreateMerchForm({
    handleAddMerch,
}: CreateMerchFormProps) {
    const form = useForm<CreateMerchFormData>({
        defaultValues: {
            merchName: "",
            description: "",
            price: 0,
            inventory: 0,
            type: "",
            height: 0,
            width: 0,
            unit: "cm",
            images: [],
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;


    const onSubmit = (data: CreateMerchFormData) => {
        handleAddMerch(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-2">
                    <FormItem className="col-span-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                {...register("merchName", {
                                    required: "Name is required",
                                })}
                            />
                        </FormControl>
                        {errors.merchName ? (
                            <FormMessage>
                                {errors.merchName.message}
                            </FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>

                    <FormItem>
                        <FormLabel>Price (CAD)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.01"
                                {...register("price", {
                                    required: "Price is required",
                                    min: {
                                        value: 0.01,
                                        message: "Price must > 0",
                                    },
                                })}
                            />
                        </FormControl>
                        {errors.price ? (
                            <FormMessage>{errors.price.message}</FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>
                </div>

                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea rows={4} />
                    </FormControl>
                    {errors.description ? (
                        <FormMessage>{errors.description.message}</FormMessage>
                    ) : (
                        <div className="mb-2" />
                    )}
                </FormItem>

                <div className="grid grid-cols-3 gap-2">
                    <FormItem className="col-span-2">
                        <FormLabel>Merch Type</FormLabel>
                        <FormControl>
                            <select
                                {...register("type", {
                                    required: "Please select a merch type",
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            >
                                <option value="">Select Type</option>
                                <option value="poster">Poster</option>
                                <option value="postcard">Postcard</option>
                                <option value="keychain">Keychain</option>
                                <option value="sticker">Sticker</option>
                                <option value="other">Other</option>
                            </select>
                        </FormControl>
                        {errors.type ? (
                            <FormMessage>{errors.type.message}</FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>

                    <FormItem>
                        <FormLabel>Inventory</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...register("inventory", {
                                    required: "Inventory is required",
                                    min: {
                                        value: 0,
                                        message: "Inventory must be positive",
                                    },
                                })}
                            />
                        </FormControl>
                        {errors.inventory ? (
                            <FormMessage>
                                {errors.inventory.message}
                            </FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <FormItem>
                        <FormLabel>Width</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.1"
                                {...register("width", {
                                    required: "Width is required",
                                    min: {
                                        value: 0,
                                        message: "Width must be positive",
                                    },
                                })}
                            />
                        </FormControl>
                        {errors.width ? (
                            <FormMessage>{errors.width.message}</FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>

                    <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.1"
                                {...register("height", {
                                    required: "Height is required",
                                    min: {
                                        value: 0,
                                        message: "Height must be positive",
                                    },
                                })}
                            />
                        </FormControl>
                        {errors.height ? (
                            <FormMessage>{errors.height.message}</FormMessage>
                        ) : (
                            <div className="mb-2" />
                        )}
                    </FormItem>

                    <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                            <select
                                {...register("unit", {
                                    required: "Unit is required",
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            >
                                <option value="cm">cm</option>
                                <option value="in">in</option>
                            </select>
                        </FormControl>
                    </FormItem>
                </div>

                <FormItem>
                    <FormLabel>Images (1 to 5)</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            {...register("images", {
                                required: "Please include at least one image",
                                validate: {
                                    maxCount: (files) =>
                                        files.length <= 5 ||
                                        "You can upload up to 5 images",
                                },
                            })}
                            multiple
                            accept="image/*"
                            className="cursor-pointer"
                        />
                    </FormControl>
                    {errors.images ? (
                        <FormMessage>{errors.images.message}</FormMessage>
                    ) : (
                        <div className="mb-2" />
                    )}
                </FormItem>

                <Button type="submit" className="mt-4">
                    Add
                </Button>
            </form>
        </Form>
    );
}
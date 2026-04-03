"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customerDataType } from "@/types/types";
import { editCustomerZodSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { set } from "zod";


export default function CustomerDetails({ data: initialData, carpenters }: { data: customerDataType; carpenters: { id: string; name: string }[] }) {
    const [data, setData] = useState<customerDataType>(initialData);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof editCustomerZodSchema>>({
        resolver: zodResolver(editCustomerZodSchema),
        defaultValues: {
            name: data.name,
            email: data.email,
            contact: data.contact || "",
            address: data.address || "",
            city: data.city || "",
            type: data.type || "retail",
            status: "active",
            balance: 0,
            creditLimit: data.creditLimit || 0,
            GSTN: data.GSTIN || "",
            assignedTo: data.assignedTo || "",
        }
    })

    const onSubmit = async (data: z.infer<typeof editCustomerZodSchema>) => {
        try {
            setLoading(true);

            // api call to update user

            // const val = await res.json();

            // if (!val.success) {
            //     toast(`${val.message}`);
            //     return;
            // }

            setData((prev) => ({
                ...prev,
                name: data.name,
                email: data.email,
                contact: data.contact,
                address: data.address,
                city: data.city,
                type: data.type,
                status: data.status,
                balance: data.balance,
                creditLimit: data.creditLimit,
                GSTN: data.GSTN,
                assignedTo: data.assignedTo
            }));

            toast("Customer updated successfully");

        } catch (err) {
            toast("Something went wrong");
        } finally {
            setEditMode(false);
            setLoading(false);
        }
    }

    return (
        <Card className="@container/card p-4 gap-2 space-y-2">

            <CardHeader className="p-0">
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        View and manage customer information
                    </span>
                    <span className="@[540px]/card:hidden">Customer overview</span>
                </CardDescription>

                <CardAction className="flex gap-2">


                    {editMode ? (
                        <>
                            <Button variant="outline" size="sm" onClick={() => {
                                setEditMode((prev) => !prev)
                                form.reset()
                            }}
                                disabled={loading}>
                                <X className="hidden md:flex" />
                                Cancel
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={form.handleSubmit(onSubmit)}
                                disabled={loading}
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => {
                            setEditMode((prev) => !prev)
                            form.reset()
                        }}
                            disabled={loading}>
                            <Pencil className="hidden md:flex" />
                            Edit
                        </Button>
                    )}

                </CardAction>
            </CardHeader>

            <CardContent className="px-1 gap-2 flex-1">
                <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="form-customer-update-name"
                                        className="text-muted-foreground"
                                    >
                                        Name*
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-name"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your full name"
                                                autoComplete="off"
                                                type="text"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="p-0 m-0">
                                            {data.name}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-email" className="text-muted-foreground">
                                        Email
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter email address"
                                                autoComplete="off"
                                                type="email"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.email || "No Email"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* contact */}
                        <Controller
                            name="contact"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-contact" className="text-muted-foreground">
                                        Contact
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-contact"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter contact number"
                                                autoComplete="off"
                                                type="tel"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.contact || "No Contact"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* address */}
                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-address" className="text-muted-foreground">
                                        Address
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-address"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter address"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.address || "No Address"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* city */}
                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-city" className="text-muted-foreground">
                                        City
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-city"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter city"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.city || "No City"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* type */}
                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-type" className="text-muted-foreground">
                                        Type
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="retail">Retail</SelectItem>
                                                        <SelectItem value="wholesale">Wholesale</SelectItem>
                                                        <SelectItem value="cash">Cash</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.type || "No Type"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />


                        {/* status */}
                        <Controller
                            name="status"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-status" className="text-muted-foreground">
                                        Status
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                        <SelectItem value="blocked">Blocked</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.status || "No Status"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* credit limit */}
                        <Controller
                            name="creditLimit"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-credit-limit" className="text-muted-foreground">
                                        Credit Limit
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-credit-limit"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter credit limit"
                                                autoComplete="off"
                                                type="number"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.creditLimit !== undefined ? `$${data.creditLimit}` : "No Credit Limit"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* GSTN */}
                        <Controller
                            name="GSTN"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-gstn" className="text-muted-foreground">
                                        GSTN
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Input
                                                {...field}
                                                id="form-customer-update-gstn"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter GSTN"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.GSTIN || "No GSTN"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* assigned to */}
                        <Controller
                            name="assignedTo"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <FieldLabel htmlFor="form-customer-update-assigned-to" className="text-muted-foreground">
                                        Assigned To
                                    </FieldLabel>
                                    {editMode ? (
                                        <>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a carpenter" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {carpenters.map((carpenter) => (
                                                            <SelectItem key={carpenter.id} value={carpenter.name}>
                                                                {carpenter.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </>
                                    ) : (
                                        <span className="">
                                            {data.assignedTo || "No Assigned Person"}
                                        </span>
                                    )}
                                </Field>
                            )}
                        />

                        {/* created at */}
                        <Field className="hidden md:flex">
                            <FieldLabel htmlFor="form-customer-update-created-at" className="text-muted-foreground">
                                Created At
                            </FieldLabel>
                            <span className="">
                                {data.createdAt || "No Creation Date"}
                            </span>
                        </Field>

                        {/* updated at */}
                        <Field className="hidden md:flex">
                            <FieldLabel htmlFor="form-customer-update-updated-at" className="text-muted-foreground">
                                Updated At
                            </FieldLabel>
                            <span className="">
                                {data.updatedAt || "No Update Date"}
                            </span>
                        </Field>
                    </FieldGroup>

                </form>
            </CardContent>
        </Card>
    )
}
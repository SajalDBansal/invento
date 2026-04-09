"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import z from "zod";
import { addContactZodSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";

export default function AddSupplierForm() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof addContactZodSchema>>({
        resolver: zodResolver(addContactZodSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            contact: "",
            type: "cash",
            company: "",
            GSTIN: "",
            email: "",
            creditLimit: 0,
        }
    })

    const onSubmit = async (data: z.infer<typeof addContactZodSchema>) => {
        try {

            // api call to create a new supplier
            setLoading(true);
            setTimeout(() => {
                console.log(data);
                setLoading(false);

            }, 5000);

            toast("New supplier has been created succefully");

        } catch (err) {
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='p-2 bg-white dark:bg-black rounded-xl'>
            <form className='mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
                {/* personal details */}
                <FieldGroup className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
                    {/* Vertical Tabs List */}
                    <div className='flex flex-col space-y-1'>
                        <h3 className='font-semibold'>Personal Information</h3>
                        <p className='text-muted-foreground text-sm'>Manage your personal information and role.</p>
                    </div>

                    {/* Content */}
                    <div className='space-y-6 lg:col-span-2'>

                        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>

                            {/* first name */}
                            <Controller
                                name="firstName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-first-name" className="gap-1">
                                            First Name <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-first-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="John"
                                            autoComplete="firstName"
                                            type="text"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* last name */}
                            <Controller
                                name="lastName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-last-name" className="gap-1">
                                            Last Name <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-last-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Doe"
                                            autoComplete="lastName"
                                            type="text"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* address */}
                            <Controller
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-address" className="gap-1">
                                            Address <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-address"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="123, street"
                                            autoComplete="address"
                                            type="text"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* city */}
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-city" className="gap-1">
                                            City
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-city"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="New Delhi, India"
                                            autoComplete="city"
                                            type="text"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* contact */}
                            <Controller
                                name="contact"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-contact" className="gap-1">
                                            Mobile <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-contact"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="+1 (555) 123-4567"
                                            autoComplete="contact"
                                            type="tel"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* type */}
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-type" className="gap-1">
                                            Type <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectTrigger id='supplier-from-type' className='w-full'>
                                                <SelectValue placeholder='Select a Type' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value='wholesale'>Wholesale</SelectItem>
                                                    <SelectItem value='retail'>Retail</SelectItem>
                                                    <SelectItem value='cash'>Cash</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </div>
                </FieldGroup>

                <Separator className='my-5 lg:my-10' />

                {/* firm details */}
                <FieldGroup className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
                    {/* Vertical Tabs List */}
                    <div className='flex flex-col space-y-1'>
                        <h3 className='font-semibold'>Business Details</h3>
                        <p className='text-muted-foreground text-sm'>If the supplier is a reatil or business owner.</p>
                    </div>

                    {/* Content */}
                    <div className='lg:col-span-2 space-y-6'>

                        {/* company */}
                        <Controller
                            name="company"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="supplier-from-company" className="gap-1">
                                        Company Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="supplier-from-company"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="XYZ Industries"
                                        autoComplete="company"
                                        type="text"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* GSTN */}
                        <Controller
                            name="GSTIN"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="supplier-from-gstin" className="gap-1">
                                        GSTIN
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="supplier-from-gstin"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="9UJA3KXW8PE1Z"
                                        autoComplete="GSTN"
                                        type="text"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="supplier-from-email" className="gap-1">
                                        Email <span className='text-destructive'>*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="supplier-from-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="user@company.com"
                                        autoComplete="email"
                                        type="email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </FieldGroup>

                <Separator className='my-5 lg:my-10' />

                {/* Financial details */}
                <FieldGroup className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
                    {/* Vertical Tabs List */}
                    <div className='flex flex-col space-y-1'>
                        <h3 className='font-semibold'>Financial Details</h3>
                        <p className='text-muted-foreground text-sm'>Manage your finances for the supplier.</p>
                    </div>

                    {/* Content */}
                    <div className='space-y-6 lg:col-span-2'>

                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                            {/* credit limit */}
                            <Controller
                                name="creditLimit"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-2">
                                        <FieldLabel htmlFor="supplier-from-creditLimit" className="gap-1">
                                            Credit Limit
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="supplier-from-creditLimit"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="50000"
                                            autoComplete="creditLimit"
                                            type="number"
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>


                    </div>
                </FieldGroup>

                <Separator className='my-5 lg:my-10' />

                <div className='flex justify-end'>
                    <Button type='submit' className='max-sm:w-full'>
                        {loading && <Spinner />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </section>
    )
}
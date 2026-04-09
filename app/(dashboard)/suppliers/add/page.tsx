import AddSupplierForm from "@/components/forms/add-supplier-form";
import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";

export default function CreateCustomer() {
    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold">
                        Create a New Supplier
                    </div>
                    <div className="text-sm md:text-lg  text-muted-foreground">
                        Build a New Supplier Profile
                    </div>
                </div>
                <div className="md:flex justify-end space-x-2">
                    <QuickActions />
                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-6'>
                <div className='w-full md:py-4'>
                    <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                        <AddSupplierForm />
                    </div>
                </div>
            </div>
        </div >
    )
}
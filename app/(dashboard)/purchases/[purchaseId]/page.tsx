export default async function PurchaseIDPage({ params }: { params: Promise<{ purchaseId: string }> }) {
    const { purchaseId } = await params;
    console.log(purchaseId);

    return (
        <div>
            Purchase Id Page
        </div>
    )
}


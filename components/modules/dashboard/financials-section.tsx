export default function FinancialSection() {
    return (
        <div className="col-span-full grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3">
            <div className='grid gap-4 lg:gap-6 col-span-full md:grid-cols-3'>

                <div className='justify-between ' >
                    <div className="bg-white/10 rounded">
                        financial 1
                    </div>
                </div>

                {/* Total Earning Card */}
                <div className='justify-between'>
                    <div className="bg-white/10 rounded">
                        financial 2
                    </div>
                </div>

                <div className='justify-between'>
                    <div className="bg-white/10 rounded">
                        financial 3
                    </div>
                </div>
            </div>

            <div className='col-span-full' >
                <div className="bg-white/10 rounded h-full">
                    financial 4
                </div>
            </div>
        </div>
    )
}
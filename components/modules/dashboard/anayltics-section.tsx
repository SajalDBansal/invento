export default function AnalyticsSection() {
    return (
        <div className="col-span-full grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className='grid gap-4 max-xl:col-span-full lg:max-xl:grid-cols-2'>

                <div className='justify-between gap-3 *:data-[slot=card-content]:space-y-5' >
                    <div className="bg-white/10 rounded">
                        graph 1
                    </div>
                </div>

                <div className='justify-between gap-5 sm:min-w-0 *:data-[slot=card-content]:space-y-7'>
                    <div className="bg-white/10 rounded">
                        graph 2
                    </div>
                </div>
            </div>

            <div className='col-span-full xl:col-span-2 *:data-[slot=card-content]:space-y-6' >
                <div className="bg-white/10 rounded h-full">
                    graph 3
                </div>
            </div>
        </div>
    )
}
const TailwindCard = (props) => {
    return (
        <div>
            <div className="flex flex-col items-center gap-6 p-7 rounded-2xl">
                <div>
                    <img className="size-48 shadow-xl rounded-md" alt="" src={props.imgUrl} />
                </div>
                <div className="flex items-center">
                    <span className="text-2xl font-medium">{props.title}</span>
                    <span className="font-medium text-sky-500">${props.price}</span>
                    <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                        {props.rating} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.39 3.36a1.125 1.125 0 01-1.63-1.18l1.22-7.11-5.17-5.04a1.125 1.125 0 01.62-1.92l7.15-1.04L9.45 2a1.125 1.125 0 012.1 0l2.03 4.29 7.15 1.04a1.125 1.125 0 01.62 1.92l-5.17 5.04 1.22 7.11a1.125 1.125 0 01-1.63 1.18L12 17.25z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TailwindCard
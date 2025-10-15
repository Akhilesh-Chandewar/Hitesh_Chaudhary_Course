import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "USD",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    const id = useId()

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex justify-between items-end ${className}`}>
            <div className='w-1/2 pr-2'>
                <label htmlFor={id} className='text-black/40 mb-2 inline-block'>
                    {label}
                </label>
                <input
                    id={id}
                    type='number'
                    className='outline-none w-full bg-transparent py-1.5 border-b border-gray-300 focus:border-blue-500 transition'
                    placeholder='Amount'
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>

            <div className='w-1/2 text-right'>
                <p className='text-black/40 mb-2'>Currency Type</p>
                <select
                    className='rounded-lg px-2 py-1 bg-gray-100 cursor-pointer outline-none w-full'
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default InputBox

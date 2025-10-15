import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import InputBox from './components/InputBox'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { rates, loading, error } = useCurrencyInfo(from)
  const options = Object.keys(rates || {})

  const swap = () => {
    const tempFrom = from
    setFrom(to)
    setTo(tempFrom)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    if (!rates[to]) return
    setConvertedAmount((amount * rates[to]).toFixed(2))
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          `url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-lg">
          {loading && <p className="text-center text-gray-700 mb-2">Loading exchange rates...</p>}
          {error && <p className="text-center text-red-600 mb-2">Failed to load rates.</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            <div className="w-full mb-3">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={setFrom}
                onAmountChange={setAmount}
                selectedCurrency={from}
              />
            </div>

            <div className="relative w-full h-0.5 my-4">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mb-3">
              <InputBox
                label="To"
                currencyOptions={options}
                amount={convertedAmount}
                onCurrencyChange={setTo}
                selectedCurrency={to}
                amountDisabled
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Convert {from.toUpperCase()} → {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App

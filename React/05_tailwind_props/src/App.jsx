import Card from "./components/Card"
import TailwindCard from "./components/TailwindCard"

function App() {
  return (
    <>
      <h1 className="text-3xl bg-green-600 p-3 rounded-md">Vite with tailwind</h1>
      {/* <Card imgUrl="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"/> */}
      <TailwindCard imgUrl="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        title="Tailwind Card" price="99" rating="5.0"/>
    </>
  )
}

export default App

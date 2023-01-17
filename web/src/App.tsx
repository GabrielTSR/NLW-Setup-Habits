import { Habit } from './components/Habit'

function App() {
    return (
        <>
            <Habit completed={3} />
            <Habit completed={10} />
            <Habit completed={12} />
            <Habit completed={30} />
            <Habit completed={20} />
        </>
    )
}

export default App

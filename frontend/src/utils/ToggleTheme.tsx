import { useEffect, useState } from 'react'
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export const ToggleTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.className = newTheme === 'light' ? 'light-mode' : ''
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <div>
            <button className='theme-button ' onClick={toggleTheme}>
                {theme === 'dark' ? (
                    <BsFillMoonFill />
                ) : (
                    <BsFillSunFill />
                )}
            </button>
        </div>
    )
}

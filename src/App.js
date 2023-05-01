import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, newTheme } from './theme';
import './App.css';

function App() {
    const [theme, setTheme] = useState('light');
    const currentTheme = theme === 'light' ? lightTheme : theme === 'dark' ? darkTheme : newTheme;

    const themeNames = ['light', 'dark', 'new'];

    const toggleTheme = () => {
        const currentThemeIndex = themeNames.indexOf(theme);
        const nextThemeIndex = (currentThemeIndex + 1) % themeNames.length;
        const nextTheme = themeNames[nextThemeIndex];
        setTheme(nextTheme);
    };

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = currentTheme.bodyBackground;
        localStorage.setItem('theme', theme);
    }, [theme, currentTheme]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeProvider theme={currentTheme}>
            <div className="App">
                <button onClick={toggleTheme}>Toggle theme</button>
                <Calculator />
            </div>
        </ThemeProvider>
    );
}

export default App;
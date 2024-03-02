import { useState } from 'react'

export default function Tab() {
    const [currentTab, setCurrentTab] = useState(0)

    const tabs = [
        { name: 'Tab 1', content: 'This is tab 1' },
        { name: 'Tab 2', content: 'This is tab 2' },
        { name: 'Tab 3', content: 'This is tab 3' },
    ];

    const handleClick = (index) => {
        setCurrentTab(index);
    }

    return (
        <>
            <ul>
                {tabs.map((tab, index) => (
                    <li key={index} onClick={() => handleClick(index)}>{tab.name}</li>
                ))}
            </ul>
            <div>
                <p>{tabs[currentTab].content}</p>
            </div>
        </>
    )
}
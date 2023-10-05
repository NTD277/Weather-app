import React, { useState } from 'react';

function TabSwitcher() {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = ({tabNumber}: { tabNumber: any }) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>
            <div className="flex flex-row gap-8">
                <button
                    className={activeTab === 1 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 1})}
                >
                    Day
                </button>
                <button
                    className={activeTab === 2 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 2})}
                >
                    Week
                </button>
                <button
                    className={activeTab === 3 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 3})}
                >
                    Hour
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 1 && <p>Content for Tab 1</p>}
                {activeTab === 2 && <p>Content for Tab 2</p>}
                {activeTab === 3 && <p>Content for Tab 3</p>}
            </div>
        </div>
    );
}

export default TabSwitcher;

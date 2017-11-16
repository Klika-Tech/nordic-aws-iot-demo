import React from 'react';
import { SidebarNav, SidebarNavItem } from '@sketchpixy/rubix';

const Menu = () => (
    <div className="sidebar-nav-container">
        <SidebarNav>
            <SidebarNavItem
                name="Dashboard" href="/dashboard"
                glyph="icon-fontello-th-large"
            />
            <SidebarNavItem
                name="Temperature" href="/temperature"
                glyph="icon-fontello-temperatire"
            />
            <SidebarNavItem
                name="Humidity" href="/humidity"
                glyph="icon-fontello-water"
            />
            <SidebarNavItem
                name="Barometer" href="/barometer"
                glyph="icon-fontello-gauge"
            />
        </SidebarNav>
    </div>
);

export default Menu;

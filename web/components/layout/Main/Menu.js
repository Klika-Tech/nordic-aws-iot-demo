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
            <SidebarNavItem
                name="CO2" href="/eco2"
                glyph="icon-fontello-pagelines"
            />
            <SidebarNavItem
                name="TVOC" href="/tvoc"
                glyph="icon-fontello-beaker"
            />
            <SidebarNavItem
                name="Accelerometer" href="/accelerometer"
                glyph="icon-fontello-chart-line"
            />
            <SidebarNavItem
                name="Gyroscope" href="/gyroscope"
                glyph="icon-fontello-globe-alt"
            />
            <SidebarNavItem
                name="Compass" href="/compass"
                glyph="icon-fontello-compass"
            />
            <SidebarNavItem
                name="Gravity" href="/gravity"
                glyph="icon-fontello-magnet-1"
            />
            <SidebarNavItem
                name="Heading" href="/heading"
                glyph="icon-fontello-direction"
            />
            <SidebarNavItem
                name="Battery" href="/battery"
                glyph="icon-fontello-battery"
            />
        </SidebarNav>
    </div>
);

export default Menu;


/**
 * Component that displays the Admin Dashboard
 *
 * @author Jovy Ann Nelson
 * @date 01-26-2026
 */

import {Box, Button, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Displays today's date based on user's computer clock timezone and language (global)
 * @returns {string} Today's date
 */
function getTodaysDate() {
    return new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

/**
 * Displays a reusable Stat card for the dashboard that displays a value, title, and subtitle
 * @param {string|number} value - The main statistic to display
 * @param {string} title - the label or title describing the statistic
 * @param {string|number} subtitle - additional info about the stat
 * @returns A material-UI card
 */
function StatCard({ value, title, subtitle }) {
    return(
        <Card sx={{ width:300, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography variant="h3" fontWeight="bold">
                    {value}
                </Typography>

                <Typography>
                    {title}
                </Typography>

                <Typography>
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
}

/**
 * Displays the content for a tab in the main panel
 * @param {object} props - component props
 * @returns {JSX.Element|null} the tab panel if active and null if not active.
 */
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    //return whatever content is passed inside the CustomTabPanel
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx= {{ p:3 }}>{children}</Box>}
        </div>
    );
}

/**
 * Function to implement accessible tabs following WAI-ARIA Authoring Practices.
 * @param {number} index the index of the tab
 * @returns ARIA props
 */
function a11yProps(index) {
    return{
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function AdminDashboard() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh"}}>            
            <Box sx={{ p: 3}}>                
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb:3 }}>
                    <Box>
                        <Typography variant="h3" fontWeight="bold">
                            Admin Dashboard
                        </Typography>
                        <Typography>
                            {getTodaysDate()}
                        </Typography>
                    </Box>
                    <Button variant="contained">
                        + Add User
                    </Button>
                </Box>

                {/* Stat cards */}
                <Grid container spacing = {2} sx={{ mb:2 }}>
                    <Grid item xs={12} md={3}>
                        <StatCard value="50" title="Total Users" subtitle="10 Clinician, 40 Developers"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="200" title="Total Tickets" subtitle="150 Active, 50 Completed"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="90%" title="Rate" subtitle="Last 30 days"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="90%" title="Rate" subtitle="Last 30 days"/>
                    </Grid>
                </Grid>


                {/* Main Panel */}
                <Box sx={{ bgcolor: "#ffffff", height: 600, p:3, borderRadius: 2, boxShadow: 1}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs for the dashboard">
                        <Tab label="Overview" {...a11yProps(0)} />
                        <Tab label="User Management" {...a11yProps(1)} />
                        <Tab label="System Management" {...a11yProps(2)} />
                        <Tab label="All Tickets" {...a11yProps(3)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        Overview information will go here
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        User Management information will go here
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        System Management information will go here
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        All Tickets information will go here
                    </CustomTabPanel>
                </Box>
                
            </Box>
        </Box>
    );
}
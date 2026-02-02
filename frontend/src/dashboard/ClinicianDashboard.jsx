
/**
 * Component that displays the Clinician Dashboard
 *
 * @author Jovy Ann Nelson
 * @date 01-26-2026
 */

import {Box, Button, Card, CardContent, Checkbox, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';
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
 * @returns A material-UI card
 */
function StatCard({ value, title }) {
    return(
        <Card sx={{ width:300, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography variant="h3" fontWeight="bold">
                    {value}
                </Typography>

                <Typography>
                    {title}
                </Typography>

            </CardContent>
        </Card>
    );
}

/**
 * Displays a Sample Ticket table information
 * @param {*} ticketID 
 * @param {*} description 
 * @param {*} date 
 * @param {*} status 
 * @param {*} comment 
 * @returns 
 */
function createData(ticketID, description, datecreated, status, comment) {
    return {ticketID, description, datecreated, status, comment}
}

const rows = [
    createData('Ticket #1', 'Description goes here', '2026-01-01', 'Submitted', <Button>Leave Comment</Button>),
    createData('Ticket #2', 'Description goes here', '2025-12-01', 'In Review', <Button>Leave Comment</Button>),
    createData('Ticket #3', 'Description goes here', '2025-11-01', 'In Review', <Button>Leave Comment</Button>),
    createData('Ticket #4', 'Description goes here', '2025-10-01', 'In Progress', <Button>Leave Comment</Button>),
    createData('Ticket #5', 'Description goes here', '2025-05-01', 'Completed', <Button>Leave Comment</Button>)
]


export default function ClinicianDashboard() {
    const notificationList = [
            {id: 1, message: "Ticket #1 Cat ipsum dolor sit amet", read: false },
            { id: 2, message: "Ticket #2 Cat ipsum dolor sit amet", read: false},
        ]
    
    
        const [notifications, setNotifcations] = useState(notificationList);
    
        const toggleRead = (id) => {
            const updatedNotifications = notifications.map((notif) => {
                if (notif.id === id) {
                    return { ...notif, read: !notif.read };
                }
                return notif;
            });
    
            setNotifcations(updatedNotifications);
        };

    return (
        <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh"}}>            
            <Box sx={{ p: 3}}>                
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb:3 }}>
                    <Box>
                        <Typography variant="h3" fontWeight="bold">
                            Clinician Dashboard
                        </Typography>
                        <Typography>
                            {getTodaysDate()}
                        </Typography>
                    </Box>
                    <Button variant="contained">
                        + Create Ticket
                    </Button>
                </Box>

                {/* Stat cards */}
                <Grid container spacing = {2} sx={{ mb:2 }}>
                    <Grid item xs={12} md={3}>
                        <StatCard value="5" title="Total Tickets"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="2" title="In Review"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="1" title="In Progress"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard value="1" title="Completed"/>
                    </Grid>
                </Grid>

                {/* Notification */}
                <Box sx={{ bgcolor: "#ffffff", height: 180, p:3, borderRadius: 2, boxShadow: 1, mb: 2 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Notifications
                    </Typography>
                    <Stack spacing= {1}>
                        {notifications.map((notif) => (
                            <Paper key={notif.id} sx={{ p: 1, display: "flex", alignItems: "left" }}>
                                <Checkbox
                                    checked={notif.read}
                                    onChange={() => toggleRead(notif.id)}
                                    inputProps={{ "aria-label": "Mark notification as read" }}
                                />
                                <Typography>
                                    {notif.message}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                </Box>


                {/* Main Panel */}
                <Box sx={{ bgcolor: "#ffffff", height: 460, p:3, borderRadius: 2, boxShadow: 1}}>
                    <Typography variant="h4" fontWeight="bold">
                        My Tickets
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-lable="My ticket table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Ticket ID</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>Description</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>Date Created</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': {border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.ticketID}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.datecreated}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{row.comment}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                    </TableContainer>
                </Box>
                
            </Box>
        </Box>
    );
}
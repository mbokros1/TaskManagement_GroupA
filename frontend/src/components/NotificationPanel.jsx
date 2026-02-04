import { Box, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

function NotificationPanel({inputNotifications}) {
    const [notifications, setNotifcations] = useState(inputNotifications);

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
        <Box sx={{ bgcolor: "background.default", p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                Notifications
            </Typography>
            <Stack spacing= {1}>
                {notifications.map((notif) => (
                    <Paper key={notif.id} sx={{ p: 2, display: "flex", alignItems: "left" }}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={notif.read}
                                onChange={() => toggleRead(notif.id)}
                            />
                        }
                        label={<Typography>{notif.message}</Typography>}
                        />
                    </Paper>
                ))}
            </Stack>
        </Box>

    );
}

export default NotificationPanel;
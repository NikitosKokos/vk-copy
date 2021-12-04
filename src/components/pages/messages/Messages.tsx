import React, { FC, MouseEvent, useEffect, useState } from 'react'
import { IMessage } from '../../../types'
import { useAuth } from '../../providers/useAuth'
import { onSnapshot, collection, addDoc } from 'firebase/firestore'
import {
	Alert,
	Divider,
	Fab,
	Grid,
	TextField,
	List,
	ListItem,
	ListItemText,
	Avatar,
} from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import Card from '../../ui/Card'
import moment from 'moment'

const Messages: FC = () => {
	const { user, db } = useAuth()

	const [error, setError] = useState('')
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<IMessage[]>([])

	useEffect(() => {
		const unsub = onSnapshot(collection(db, 'messages'), doc => {
			const array: IMessage[] = []
			doc.forEach((d: any) => {
				array.push(d.data())
			})
			setMessages(array)
		})

		return () => {
			unsub()
		}
	}, [])

	const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			await addDoc(collection(db, 'messages'), {
				user,
				message,
				createdAt: Date.now(),
			})
		} catch (e: any) {
			setError(e)
		}
		setMessage('')
	}

	const getCurrentDateText = (date:number) => {
		const now = Date.now();
		
		if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
            return moment(date).format('HH:mm DD.MM.YYYY');
        } else if (now - date < 86400000) {
            return moment(date).format('HH:mm');
        }

		return moment(date).format('DD.MM.YYYY');
    }

	return (
        <>
            {error && (
                <Alert severity="error" style={{ marginBottom: 20 }}>
                    {error}
                </Alert>
            )}
            <Card>
                <List style={{ height: '65vh', overflowY: 'auto' }}>
                    {messages.map((msg, idx) => (
                        <ListItem key={idx}>
                            <Grid
                                container
                                justifyContent={
                                    msg.user._id === user?._id ? 'flex-end' : 'flex-start'
                                }>
                                <Grid
                                    display="flex"
                                    item
                                    xs={8}
                                    sx={
                                        msg.user._id === user?._id
                                            ? {
                                                  flexDirection: 'row-reverse',
                                              }
                                            : {}
                                    }>
                                    <Grid
                                        display="flex"
                                        justifyContent={
                                            msg.user._id === user?._id ? 'flex-end' : 'flex-start'
                                        }
                                        sx={
                                            msg.user._id === user?._id
                                                ? { marginLeft: '5px' }
                                                : { marginRight: '5px' }
                                        }
                                        item>
                                        <Avatar src={msg.user.avatar} />
                                    </Grid>
                                    <Grid item >
                                        <Grid item xs={12}>
                                            <ListItemText secondary={`${msg.user.name} ${getCurrentDateText(Number(msg.createdAt))}`} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText
                                                style={
                                                    msg.user._id === user?._id
                                                        ? { color: '#1976d2' }
                                                        : {}
                                                }
                                                primary={msg.message}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Grid
                    container
                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={11}>
                        <TextField
                            id="outlined-basic-email"
                            label="Type Message"
                            fullWidth
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                    </Grid>
                    <Grid item alignItems="right">
                        <Fab color="primary" onClick={addMessageHandler}>
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default Messages

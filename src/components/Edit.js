import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ButtonBase, TextField, Select, MenuItem, IconButton, InputLabel, FormControl, Card, CardHeader, Avatar, CardContent, Tooltip, CardMedia, CardActions } from '@material-ui/core';
import AxiosService from './api/AxiosService';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Edit() {

    let location = useLocation();

    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(location.state.type);  //Going to live with this warning for now. Could probably be solved by using Redux or another option for state management.
    const [application, setApplication] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(location.state.application);
    
    useEffect(() => {
        retrieveType();
        retrieveApplication();
    }, []);

    const retrieveType = () => {
        AxiosService.getType()
            .then(response => {
                setType(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveApplication = () => {
        AxiosService.getApplication()
            .then(response => {
                setApplication(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleApplicationChange = (event) => {
        setSelectedApplication(event.target.value);
    };

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader title={location.state.name} subheader={location.state.fileName}
                    avatar={
                        <Avatar className={location.state.imageStatus === 'Active' ? classes.avatar : ''}>
                            <Tooltip title={location.state.imageStatus} placement="top">
                                <FavoriteIcon />
                            </Tooltip>
                        </Avatar>}
                />
                <CardMedia className={classes.media} image={location.state.image} title="Image" />
                <CardContent className={classes.cardContent}>
                    <Grid container>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.textField} label="Name" variant="outlined" defaultValue={location.state.name || ''} />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl} variant="outlined">
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select id="type-select" labelId="type-label" className={classes.select} label="Type"
                                    value={selectedType || ''} defaultValue={location.state.type || ''} onChange={handleTypeChange}>
                                    {type.map((item) => (
                                        <MenuItem key={item.id} value={item.name || ''}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl} variant="outlined">
                                <InputLabel id="application-label">Application</InputLabel>
                                <Select id="application-select" labelId="application-label" className={classes.select} label="Application"
                                    value={selectedApplication || ''} defaultValue={location.state.application || ''} onChange={handleApplicationChange}>
                                    {application.map((item) => (
                                        <MenuItem key={item.id} value={item.name || ''}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.multilineTextField} label="Legend Title" variant="outlined" defaultValue={location.state.legendTitle || ''} multiline />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.textField} label="Image Status" variant="outlined" defaultValue={location.state.imageStatus || ''} />
                            </FormControl>
                        </Grid>                        
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={location.state.image} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton component={Link} to="/">
                        <SaveIcon />
                    </IconButton>
                    <IconButton component={Link} to="/">
                        <ClearIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2)
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    formControl: {
        margin: theme.spacing(1)
    },
    select: {
        minWidth: 323
    },
    multilineTextField: {
        minWidth: 323
    },
    textField: {
        minWidth: 300
    },
    card: {
        maxWidth: 600,
        margin: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: 'green'
    }
}));

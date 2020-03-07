import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { 
    Card,
    Typography,
    Grid,
    Box,
    Button,
    IconButton
} from '@material-ui/core';
import { colors } from '../../theme/theme';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const styles = theme => ({
    root: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '16px',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    item: {
        flex: '1',
        height: '2.5vh',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: '4px',
        padding: '24px',
        margin: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s linear',
        [theme.breakpoints.up('sm')]: {
            height: '2.5vh',
            minWidth: '20%',
            minHeight: '2vh',
        },
    },
    prime: {
        backgroundColor: props => (props.isDragDisabled ? colors.palered : colors.white),
        '&:hover': {
            backgroundColor: colors.lightblue,
            '& .title': {
                color: colors.blue
            },
            '& .icon': {
                color: colors.blue
            },
        },
        '& .title': {
            color: colors.blue
        },
        '& .icon': {
            color: colors.blue
        }
    },
    disabled: {
        backgroundColor: colors.lightGrey,
        '&:hover': {
            backgroundColor: colors.lightGrey,
        },
    },
    activeButton: {
        color: colors.grey,
    },
    disabledButton: {
        color: colors.blue,
    },
    title: {
    },
    dragging: {
        opacity: 1,
        cursor: 'pointer',
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '16px',
        backgroundColor: colors.palered,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    icon: {
        display: 'flex',
        //paddingLeft: '10%',
    },
    onBoard: {
        backgroundColor: colors.green,
    },
});


class Expiration extends Component {
    constructor(props) {
        super(props);
        this.convertUnixTimestamp = this.convertUnixTimestamp.bind(this);
    }

    convertUnixTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const datetime = ((date.toDateString() + ' ' + date.toTimeString()).split('G'))[0];
        return datetime;
    };
    
    render() {
        const { classes, t, boardItems, item, index, handleUndo, column, handleDelete, isOnBoard } = this.props;
        let isDragDisabled;
        let counter = 0;
        // CONDITIONAL LOGIC FOR ASSET COMPONENTS
        if(boardItems) {
            let boardLimit = 1;
            for(var i = 0; i < boardItems.length; i++) {
                let _boardItem = (boardItems[i]).split('-')[0];
                // if the board item is an asset and the item id is not the board item,
                // then dont let the asset components be draggable.
                if(_boardItem === 'expiration') {
                    counter++;
                }

                if(counter >= boardLimit) {
                    isDragDisabled = true;
                } else {
                    isDragDisabled = false;
                }
            }
            
        } else {
            isDragDisabled = false;
        }

        return (
            <Draggable 
                draggableId={item.id} 
                index={index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                       <Card 
                            className={
                                (isOnBoard(item.id))
                                ? `${classes.item} ${classes.onBoard}`
                                    :
                                        (isDragDisabled) 
                                        ? `${classes.item} ${classes.disabled}` 
                                            :  `${classes.item} ${classes.prime}`
                            }
                        >
                            <Typography variant={'h2'} className={`${classes.title}`}>
                                {this.convertUnixTimestamp(this.props.item.content)}
                            </Typography>
                            <Typography variant={'h3'} className={`${classes.icon}`}>
                                {this.props.item.type == 'asset' ? 'true' : 'false'}
                            </Typography>
                            <IconButton
                                className={(isDragDisabled) ? `${classes.disabledButton}` : `${classes.activeButton}`}
                                onClick={() => handleUndo(item.id, column.id)}
                                disabled={(isDragDisabled) ? false : true}
                            >
                                <RestoreIcon />
                            </IconButton>
                            <IconButton
                                color='primary'
                                onClick={() => handleDelete(item.id, column.id)} 
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Card>
                    </Box>
                )}
            </Draggable>
        );
    }
}

export default (withRouter(withStyles(styles)(Expiration)));
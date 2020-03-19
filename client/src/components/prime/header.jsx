import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




function ellipseAddress(address) {
    let width = 6;
    let newAddress = `${address.slice(0, width)}...${address.slice(-width)}`;
    return newAddress;
}


function Header(props) {
    const classes = props.classes;
    let chain;
    let address = ellipseAddress(props.address);
    switch(props.chainId) {
        case 4: 
            chain = 'Ethereum Rinkeby'
            break;
        case 1:
            chain = 'Ethereum Mainnet'
            break;
        default:
            chain = '...'
            break;
    };

    return (
        <div className={classes.chainHeader}>
            <Typography className={classes.chainHeaderTypography}>
                Connected to {chain}
            </Typography>
            <Typography className={classes.chainHeaderTypography}>
                {(props.connected)
                    ?   
                        <Button 
                            className={classes.connectButton}
                            onClick={() => props.resetApp()}
                        >
                        
                                {(props.account) ? ellipseAddress(props.account) : 'Connect'}
                        </Button>
                        :   <Button 
                                className={classes.connectButton}
                                onClick={() => props.onConnect()}
                            >
                            
                                    {(props.account) ? ellipseAddress(props.account) : 'Connect'}
                            </Button>
                
                }
                
                
            </Typography>
            {/* <Typography className={classes.chainHeaderTypography}>
                {address}
            </Typography> */}
            
        </div>
    );
};

export default Header;
import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'

const App = () => {
    return (
        <Container maxidth='lg'>
            <AppBar position='static' color='inherit'>
                <Typography variant='h2' align='center'>Discuss</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <List Container justify='space-between'>
                        
                    </List>
                </Container>
            </Grow>
        </Container>
        
    );
}

export default App;
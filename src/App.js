import { EmployeeTable } from './components/organisms';
import Container from '@material-ui/core/Container';
import { Header, Footer } from './components/organisms';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    content: {
        paddingTop: '5rem',
        paddingBottom: '6rem',
    },
});

function App() {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <Container maxWidth="md" className={classes.content}>
                <EmployeeTable />
            </Container>
            <Footer />
        </div>
    );
}

export default App;

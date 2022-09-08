import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Encurtador from '../pages/Encurtador';
import Error from '../pages/error';
import LinkRedirect from '../pages/LinkRedirect'

export default function Routes() {

    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/Error" component={Error} isPrivate />
            <Route exact path="/Encurtar-Link" component={Encurtador} isPrivate />
            <Route exact path="/E/:id" component={LinkRedirect} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
        </Switch>
    )
}
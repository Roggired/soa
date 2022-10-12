import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../shared/lib/routing'

export const Routing = () => (
    <Switch>
        <Route exact path={routes.ROOT} component={MainPage} />
        <Redirect to={routes.ROOT} />
    </Switch>
)

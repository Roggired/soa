import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../shared/lib/routing'
import { CollectionScreen } from './collection'

export const Routing = () => (
    <Switch>
        <Route exact path={routes.ROOT} component={CollectionScreen} />
        <Redirect to={routes.ROOT} />
    </Switch>
)

import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../shared/lib/routing'
import { CollectionScreen } from './collection'
import { EditorScreen } from './editor'

export const Routing = () => (
    <Switch>
        <Route exact path={routes.ROOT} component={CollectionScreen} />
        <Route exact path={routes.EDITOR} component={EditorScreen} />
        <Redirect to={routes.ROOT} />
    </Switch>
)

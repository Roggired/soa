import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../shared/lib/routing'
import { CollectionScreen } from './collection'
import { EditorScreen } from './editor'
import { FilterSortingScreen } from './filter-and-sorting'
import { DemographyScreen } from './demography'
import { StatsScreen } from './stats'

export const Routing = (): JSX.Element => (
    <Switch>
        <Route exact path={routes.ROOT} component={CollectionScreen} />
        <Route path={routes.EDITOR} component={EditorScreen} />
        <Route path={routes.DEMOGRAPHY} component={DemographyScreen} />
        <Route path={routes.STATS} component={StatsScreen} />
        <Route
            path={routes.FILTERING_AND_SORTING}
            component={FilterSortingScreen}
        />
        <Redirect to={routes.ROOT} />
    </Switch>
)

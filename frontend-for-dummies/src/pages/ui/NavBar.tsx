import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
    DEMOGRAPHY,
    FILTERING_AND_SORTING,
    ROOT,
    STATS,
} from '../../shared/lib/routing/routes'

const l = [
    {
        name: 'Collection',
        route: ROOT,
    },
    {
        name: 'Filtering and sorting',
        route: FILTERING_AND_SORTING,
    },
    {
        name: 'Demography',
        route: DEMOGRAPHY,
    },
    {
        name: 'Statistics',
        route: STATS,
    },
]

type NavbarProps = {
    readonly links?: {
        name: string
        route: string
    }[]
}

export const Navbar: FC<NavbarProps> = ({ links = [] }) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a className="left brand-logo" style={{ marginLeft: '1rem' }}>
                    Dionysius
                </a>
                <ul className="right">
                    {[...links, ...l].map((link, index) => (
                        <li key={index.toString()}>
                            <Link to={link.route}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

import { FC } from 'react'
import { Link } from 'react-router-dom'

type NavbarProps = {
    readonly links: {
        name: string
        route: string
    }[]
}

export const Navbar: FC<NavbarProps> = ({ links }) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a className="left brand-logo" style={{ marginLeft: '1rem' }}>
                    Dionysius
                </a>
                <ul className="right">
                    {links.map((link, index) => (
                        <li key={index.toString()}>
                            <Link to={link.route}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

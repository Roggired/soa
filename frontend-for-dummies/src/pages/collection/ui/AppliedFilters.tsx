import React from 'react'
import { FilterClaim } from '../../../entities/person/model/store'
import { FlexRow } from '../../../shared/ui'

type AppliedFiltersProps = {
    readonly filters: FilterClaim[]
}

export const AppliedFilters = ({
    filters,
}: AppliedFiltersProps): JSX.Element => {
    return (
        <div style={{ width: '60%' }}>
            <i>Applied filters:</i>
            <table className="centered">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Filtered by</th>
                        <th>Sorting</th>
                    </tr>
                </thead>

                <tbody>
                    {filters.map((filter, index) => (
                        <tr>
                            <td>{filter.property}</td>
                            <td>{filter.filter ? filter.filter : 'none'}</td>
                            <td>{filter.sort}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

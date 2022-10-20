import React, { MouseEventHandler, useEffect } from 'react'
import { SortingType } from '../../../entities/person/lib'
import { FilterClaim } from '../../../entities/person/model/store'
import { Button, FlexRow, SizedBox } from '../../../shared/ui'
import { Navbar } from '../../ui/NavBar'
import { FilterClaimCreator } from './FilterClaimCreatorContainer'

type FilterSortingScreenViewProps = {
    readonly filterClaims: FilterClaim[]
    readonly onDeleteClaim: (
        prop: string,
        sort: SortingType,
        filter: string | number | null,
    ) => void
    readonly onApplyFilterClaims: MouseEventHandler<HTMLButtonElement>
}

export const FilterSortingScreenView = ({
    filterClaims,
    onDeleteClaim,
    onApplyFilterClaims,
}: FilterSortingScreenViewProps): JSX.Element => {
    return (
        <>
            <Navbar />
            <div className="container">
                <SizedBox height="2rem" />
                <FilterClaimCreator />

                <SizedBox height="2rem" />
                {filterClaims.length !== 0 && <p>Applied filters:</p>}
                {filterClaims.map((filterClaim) => (
                    <div className="row valign-wrapper">
                        <div className=" col s3">
                            Property: <i>{filterClaim.property}</i>
                        </div>

                        <div className="col s4">
                            Filtered by:{' '}
                            <i>
                                {filterClaim.filter
                                    ? filterClaim.filter
                                    : 'none'}
                            </i>
                        </div>

                        <div className=" col s3">
                            Applied sorting: <i>{filterClaim.sort}</i>
                        </div>

                        <div className="col s2">
                            <Button
                                onClick={() =>
                                    onDeleteClaim(
                                        filterClaim.property,
                                        filterClaim.sort,
                                        filterClaim.filter,
                                    )
                                }>
                                <i className="material-icons">delete</i>
                            </Button>
                        </div>
                    </div>
                ))}
                {filterClaims.length !== 0 && (
                    <FlexRow justifyContent="center">
                        <Button onClick={onApplyFilterClaims}>
                            Apply filter claims
                        </Button>
                    </FlexRow>
                )}
            </div>
        </>
    )
}

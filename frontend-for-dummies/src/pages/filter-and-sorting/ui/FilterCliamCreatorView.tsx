import React, { useEffect, useState } from 'react'
import { SortingType } from '../../../entities/person/lib'
import { Button, Input, Select } from '../../../shared/ui'

type FilterClaimCreatorViewProps = {
    readonly propList: string[]
    readonly sortList: string[]
    readonly onCreateClick: (
        prop: string,
        filter: string,
        sort: SortingType,
    ) => void
}

export const FilterClaimCreatorView = ({
    sortList,
    propList,
    onCreateClick,
}: FilterClaimCreatorViewProps): JSX.Element => {
    const [prop, setProp] = useState(propList[0])
    const [sort, setSort] = useState(sortList[0])
    const [filter, setFilter] = useState<string>('')

    return (
        <div className="row valign-wrapper">
            <Select
                label="Property name"
                value={prop}
                options={propList}
                optionLabels={[
                    'ID',
                    'Name',
                    'Coordinates x',
                    'Coordinates y',
                    'Height',
                    'Eye color',
                    'Hair color',
                    'Nationality',
                    'Location x',
                    'Location y',
                    'Location z',
                    'Location name',
                ]}
                onChange={(e) => setProp(e.target.value)}
                classNames="col s3"
            />

            <Input
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                label={'Filter by'}
                classNames="col s4"
            />

            <Select
                label="Sort by"
                value={sort}
                options={sortList}
                onChange={(e) => setSort(e.target.value)}
                classNames="col s3"
                optionLabels={['No', 'Ascending', 'Descending']}
            />

            <div className="col s2">
                <Button
                    onClick={() =>
                        onCreateClick(prop, filter, sort as SortingType)
                    }>
                    <i className="material-icons">add</i>
                </Button>
            </div>
        </div>
    )
}

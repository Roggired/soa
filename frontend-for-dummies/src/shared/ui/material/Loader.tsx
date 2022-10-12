import React, { FC } from 'react'

export const Loader: FC<{
    readonly type: 'button'
}> = ({ type }) => {
    const styles = {
        height: null,
        width: null,
    }

    if (type === 'button') {
        // @ts-ignore
        styles.height = '1.5rem'
        // @ts-ignore
        styles.width = '1.5rem'
    }

    return (
        // @ts-ignore
        <div className="preloader-wrapper active" style={styles}>
            <div
                className="spinner-layer"
                style={{
                    borderColor: 'white',
                }}>
                <div className="circle-clipper left">
                    <div className="circle" />
                </div>
                <div className="gap-patch">
                    <div className="circle" />
                </div>
                <div className="circle-clipper right">
                    <div className="circle" />
                </div>
            </div>
        </div>
    )
}

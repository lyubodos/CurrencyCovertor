import React from 'react';

export default function CurrentRow({ currOptions }) {

    return (
        <div>
            <input type="number" className="inout" />
            <select>
                {currOptions.map(option => {
                    return <option key={option} value={option}>
                        {option}
                    </option>
                })}

            </select>
        </div>
    )
}

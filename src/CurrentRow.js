import React from 'react';

export default function CurrentRow(
    {   
        amount,
        currOptions,
        selectedCurr,
        onChangeCurrency,
        onChangeAmount
    }
) {

    return (
        <div>
            <input type="number" className="inout" value={amount} onChange={onChangeAmount} />
            <select value={selectedCurr} onChange={onChangeCurrency}>
                {currOptions.map(option => {
                    return <option key={option} value={option}>
                        {option}
                    </option>
                })}

            </select>
        </div>
    )
}

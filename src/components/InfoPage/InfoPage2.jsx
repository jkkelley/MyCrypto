function InfoPage2({name, price}) {
    return (
        <>
            <div className="coin-container">
                <div className="coin">
                    <p>name: {name}, price: ${price.toFixed(2)}</p>
                    <p></p>
                </div>
            </div>
        </>
    )
}

export default InfoPage2
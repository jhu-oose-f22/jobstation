

export default function Banner({ pageName = '', imgName = pageName }) {
    return <header>
        <div className='bg-image'
            style={{
                backgroundImage: `url(/imgs/${imgName}.jpg)`,
                height: '10%',
                backgroundSize: '100%',
                backgroundPosition: '25% 10%',
                backgroundRepeat: "no-repeat",
            }}>
            <div className="mask h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}>
                <div className="d-flex flex-column justify-content-center align-items-center text-white h-100 p-5 ">
                    <h1 className="mb-3 text-center"
                        style={
                            {
                                WebkitTextStroke: '1px black'
                            }
                        }
                    >{pageName.replace(pageName[0], pageName[0].toUpperCase())}</h1>
                </div>
            </div>

        </div>
    </header>
}
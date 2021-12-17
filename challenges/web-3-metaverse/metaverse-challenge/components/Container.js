
const Container = ({children}) => {
    return (
        <div className='absolute h-full w-full bg-gradient-to-b from-black via-black to-yellow-500' >
            {children}
        </div>
    )
}

export default Container

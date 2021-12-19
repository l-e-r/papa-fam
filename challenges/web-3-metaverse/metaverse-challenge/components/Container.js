import Header from './Header';

const Container = ({children}) => {
    return (
        <div className='absolute h-full w-full bg-gradient-to-b from-black via-black to-yellow-500' >
            {/* <Header /> */}
            {children}
        </div>
    )
}

export default Container

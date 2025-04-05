import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return <div 
        className='bg-orange-400 flex text-center items-center px-standardPadding'
    >
    <Image
        // src={'/images/download.png'}
        src={'/images/logo.png'}
        alt='logo'
        width={40}
        height={40}
        className="m-0 py-2 object-contain"
    />
    {/* <p>Fahadic AI</p> */}
    </div>
}

export default Navbar;
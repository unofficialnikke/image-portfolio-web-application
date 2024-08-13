import React from 'react'

type FilterProps = {
    setIntroDialog: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
};

const IntroDialog = ({ isOpen, setIntroDialog }: FilterProps) => {
    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className="custom-modal">
                            <p>Introduction edit</p>
                            <div className='close-button'>
                                <button onClick={() => setIntroDialog(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default IntroDialog


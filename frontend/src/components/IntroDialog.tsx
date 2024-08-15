import React from 'react'

type IntroProps = {
    setIntroDialog: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
};

const IntroDialog = ({ isOpen, setIntroDialog }: IntroProps) => {
    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className="custom-modal">
                            <div className="intro-dialog">
                                <p>Introduction edit</p>
                                <textarea></textarea>
                                <div className='close-button'>
                                    <button onClick={() => setIntroDialog(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default IntroDialog


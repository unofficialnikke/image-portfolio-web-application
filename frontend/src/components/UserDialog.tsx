import React from 'react'

type FilterProps = {
    setUserDialog: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
};

const UserDialog = ({ isOpen, setUserDialog }: FilterProps) => {
    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className="custom-modal">
                            <p>User info edit</p>
                            <div className='close-button'>
                                <button onClick={() => setUserDialog(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default UserDialog


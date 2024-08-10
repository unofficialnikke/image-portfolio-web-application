import React from 'react'

type FilterProps = {
    onClose: () => void;
    isOpen: boolean;
};

const UserDialog = ({ isOpen, onClose }: FilterProps) => {
    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className="custom-modal">
                            <p>User info edit</p>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default UserDialog


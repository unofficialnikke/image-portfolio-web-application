import { ChangeEvent, MouseEventHandler, useState } from 'react'
import { uploadImage } from '../requests/Image';

type FilterProps = {
    setImageDialog: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean
    fetchUserData: (userId: string) => Promise<void>
    userId: string
};

const ImageDialog = ({ isOpen, setImageDialog, fetchUserData, userId }: FilterProps) => {
    const [file, setFile] = useState<File | null>(null)

    const handleUploadImage: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        if (!file) {
            return console.log('No File selected')
        }
        try {
            const data = await uploadImage(file, userId)
            if (data) {
                console.log('Image uploaded successfully:', data)
                await fetchUserData(userId)
                setFile(null)
            }
        } catch (err) {
            console.log('Error uplaoding image: ', err)
        }
    }

    const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files![0];
        setFile(selectedFile);
        console.log('Selected file:', selectedFile);
    }

    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className="custom-modal">
                            <h3>Upload new image</h3>
                            <div className='image-container'>
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Preview" />
                                ) : (
                                    <div className="grey-box">
                                        <label htmlFor='file'>Select image</label>
                                    </div>
                                )}
                            </div>
                            <div className='button-group'>
                                <input
                                    hidden={true}
                                    type='file'
                                    id='file'
                                    name='myImage'
                                    onChange={selectedFile}
                                >
                                </input>
                                {file && <> <a onClick={() => setFile(null)}>Delete</a>
                                    <button className='button' onClick={handleUploadImage}>Add image</button></>}
                            </div>
                            <div className='close-button'>
                                <button onClick={() => setImageDialog(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ImageDialog


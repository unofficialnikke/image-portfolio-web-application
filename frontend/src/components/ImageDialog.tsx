import { ChangeEvent, MouseEventHandler, useContext, useState } from 'react'
import { uploadImage } from '../requests/Image';
import { UserContext } from '../context/userContext';

type ImageProps = {
    setImageDialog: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean
    fetchUserData: (userId: number) => Promise<void>
    userId: string
};

const ImageDialog = ({ isOpen, setImageDialog, fetchUserData, userId }: ImageProps) => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { setUserFetch } = useContext(UserContext)

    const onClose = () => {
        setFile(null)
        setError(null)
        setImageDialog(false)
        setUserFetch(true)
    }

    const handleUploadImage: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        if (!file) {
            return console.log('No File selected')
        }
        try {
            const result = await uploadImage(file, userId)
            if (!result.success) {
                setError(result.data as string)

            } else {
                console.log('Image uploaded successfully:', result)
                await fetchUserData(Number(userId))
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
                            <div className='image-container'>
                                <h2>Upload new image</h2>
                                {error && <p>{error}</p>}
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Preview" />
                                ) : (
                                    <div className="grey-box">
                                        <label htmlFor='file'>Select image</label>
                                    </div>
                                )}
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
                                        <button onClick={handleUploadImage}>+ Add image</button></>}
                                </div>
                            </div>
                            <div className='close-button'>
                                <button onClick={onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ImageDialog


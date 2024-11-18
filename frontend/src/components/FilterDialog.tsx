import React, { useContext } from 'react'
import { CategoryContext } from '../context/categoryContext'

type FilterProps = {
    isOpen: boolean
    setFilterDialog: React.Dispatch<React.SetStateAction<boolean>>
    category: string | null
    setCategory: React.Dispatch<React.SetStateAction<string | null>>
}

export const FilterDialog = ({ isOpen, setFilterDialog, category, setCategory }: FilterProps) => {
    const { categories } = useContext(CategoryContext)

    const onClose = () => {
        setFilterDialog(false)
    }

    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className='custom-modal'>
                            <div className='filter-dialog'>
                                <form>
                                    <h2>Filter</h2>
                                    <div className='category-container'>
                                        <div className='custom-select'>
                                            <select value={category ?? ''} onChange={(e) => setCategory(e.target.value === '' ? null : e.target.value)} aria-placeholder='Select category'>
                                                {categories && categories.length > 0 ? (
                                                    <>
                                                        <option value=''>Select category</option>
                                                        {categories?.map((category) => (
                                                            <option value={category.name} key={category.id}>{category.name}</option>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <option value=''>No Categories</option>
                                                )}
                                            </select>
                                            <a onClick={() => setCategory(null)}>Reset</a>
                                        </div>
                                    </div>
                                </form>
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

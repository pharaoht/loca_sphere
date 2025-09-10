import { Step11State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import { useRef } from 'react';
import SelectGroup from '@/components/ui/input/select/select';
import Image from 'next/image';

//todo:
//fix is primary bug
//format existing images
//
const StepElevenComponent: React.FC<StepComponentProps<Step11State>> = ({ isPending, setFormState, stepState, dropDownData, formId }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const tags = dropDownData.amenityTypeOptions;
    const existingImages = stepState.existing;

    const removeFile = (index: number) => {

        const updatedState = stepState.images.filter((itm, idx) => idx !== index );

        return setFormState({ images: updatedState });

    }

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFiles = e.target.files;

        if (selectedFiles) {

            const current = stepState.images;
            
            const update = Array.from(selectedFiles).map((file, idx) => ({
                fileData: file,
                isPrimary: idx == 0 ? true : false,
                tag: "",
                listingId: formId
            }));

            setFormState({ images: [...current, ...update] })
    
        }
    }

    const handleFileClick = () => {
        fileInputRef?.current?.click();
    }

    const handleFileUpdate = (index: number, value: string) => {

        const current = stepState.images;

        const update = current.map((itm, idx) => {

            if(idx === index){

                return {
                    ...itm,
                    tag: value
                }
            }

            return itm
        });

        setFormState({ images: update });
    }

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Photos</h1>
            <h3 className={styles.subHeader}>Show your place.</h3>
            <div className={styles.formGrid}>
                <p>Great photos bring great tenants: Your photos are the first thing potential tenants will see when browsing for properties. By uploading great photos, you can make a great first impression and attract the right tenants for your property.</p>
                <section className={styles.imageContainer}>
                    {
                        existingImages.map((itm) => {
                            return (
                                <Image 
                                    key={itm.id}
                                    src={itm.url}
                                    height={40}
                                    width={60}
                                    alt='images'
                                />
                            )
                        })
                    }
                </section>
                <div className={styles.uploadContainer}>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={addFile}
                        style={{ display: 'none' }}
                    />

                    <button className={styles.addPhotoButton} type='button' onClick={handleFileClick}>
                        + Add Photo
                    </button>

                    {stepState.images.length > 0 && (
                        <div className={styles.previewGallery}>
                            
                            {stepState.images.map((file, index) => (
                                <div key={file.fileData.lastModified} className={styles.imageWrapper}>
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={() => removeFile(index)}
                                    >
                                        ×
                                    </button>
                                    <img
                                        src={URL.createObjectURL(file.fileData)}
                                        alt={`preview-${index}`}
                                        className={styles.previewImage}
                                    />
                                    <SelectGroup
                                        inputType='select'
                                        inputValue={file.tag}
                                        label=''
                                        dropDownOptions={tags}
                                        onChangeHandler={(e) => handleFileUpdate(index, e.currentTarget.value)}
                                        idnName='tag'
                                    />
                                    <label>
                                        <input type='radio' name='isPrimary' defaultChecked={file.isPrimary} value={+file.isPrimary}/>
                                        Is Primary
                                    </label>

                                </div>

                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
};

export default StepElevenComponent;

'use client'
import { ReactNode, useState } from "react";
import Image from "next/image";
import styles from './modalbutton.module.css';
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ModalButtonProps {
    imageSrc: string | StaticImport;
    imageAlt: string;
    buttonText: string;
    children: ReactNode;
}

const ModalButton: React.FC<ModalButtonProps> = ({ imageAlt, imageSrc, buttonText, children }) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return (
        <>
            <button className={styles.mapBtn} onClick={() => setIsOpen(true)}>
                <span className={styles.mapBtnIcon}>
                    <Image src={imageSrc} alt={imageAlt} height={25} width={25} />
                </span>
                {buttonText}
            </button>

            {isOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
};

export default ModalButton;
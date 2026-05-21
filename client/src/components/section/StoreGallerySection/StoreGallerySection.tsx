import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { City } from '../../../types';
import { storePhotos } from '../../../utils/storeData';
import { siteContent } from '../../../config/contentConfig';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { MapIframe } from '@/ui/MapIframe/MapIframe'; // карта магазина iframe

import styles from './StoreGallerySection.module.scss';

export default function StoreGallerySection({ currentCity }: { currentCity: City }) {
  const filteredPhotos = useMemo(
    () => storePhotos.filter((photo) => photo.city === currentCity),
    [currentCity],
  );
  // функционал переключения групп картинок по фото

  return (
    <section id="store-gallery" className={styles.storeGallery}>
      <div className={styles.storeGallery__container}>
        <SectionHeading
          eyebrow={siteContent.storeGallery.eyebrow}
          title={siteContent.storeGallery.title}
          description={siteContent.storeGallery.description}
          align="between"
        />
        

        <div className={styles.storeGallery__grid}>
          {filteredPhotos.map((photo, index) => (
            <motion.article
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={styles.storeGallery__card}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className={styles.storeGallery__image}
              />
              <div className={styles.storeGallery__overlay} />
              <div className={styles.storeGallery__content}>
                <span className={styles.storeGallery__eyebrow}>Location</span>
                <h3 className={styles.storeGallery__title}>{photo.title}</h3>
                <p className={styles.storeGallery__caption}>{photo.caption}</p>
              </div>
            </motion.article>
          ))}
          
        </div>

        <div className={styles.storeGallery__storeMap}>
          <MapIframe />
        </div>
        
      </div>
      
      {/* кнопка для перелистывания галереи */}
      

    </section>
  );
}

import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { City, Product } from '../../../types';
import { products } from '../../../utils/storeData';
import { siteContent } from '../../../config/contentConfig';
import CitySwitcher from '../../../ui/CitySwitcher/CitySwitcher';
import ProductCard from '../../../ui/ProductCard/ProductCard';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import styles from './ProductsSection.module.scss';


interface ProductsSectionProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  onProductClick: (product: Product) => void;
}

export default function ProductsSection({
  currentCity,
  onCityChange,
  onProductClick,
}: ProductsSectionProps) {

// --- STATE ---
const [hoveredId, setHoveredId] = useState<number | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const [pageInput, setPageInput] = useState('1');

// --- СБРОС ПРИ СМЕНЕ ГОРОДА + СИНХРОНИЗАЦИЯ ---
useEffect(() => {
  setCurrentPage(1);
  setPageInput('1');
}, [currentCity]);

useEffect(() => {
  setPageInput(String(currentPage));
}, [currentPage]);

// --- ФИЛЬТРАЦИЯ ---
const filteredProducts = useMemo(
  () => products.filter((product) => product.city === currentCity),
  [currentCity],
);

// --- ПАГИНАЦИЯ (derived state, вычисляем на лету!) ---
const ITEMS_PER_PAGE = 6;
const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

// --- КНОПКИ ---
const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage((p) => p + 1);
};
const handlePrev = () => {
  if (currentPage > 1) setCurrentPage((p) => p - 1);
};

// --- ВВОД НОМЕРА СТРАНИЦЫ ---
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Разрешаем только цифры
  setPageInput(e.target.value.replace(/[^0-9]/g, ''));
};

const commitPageInput = () => {
  const num = parseInt(pageInput, 10);
  if (isNaN(num) || num < 1) {
    setPageInput(String(currentPage));
    return;
  }
  if (num > totalPages) setCurrentPage(totalPages);
  else setCurrentPage(num);
};

  return (
    <section id="products" className={styles.productsSection}>
      <div className={styles.productsSection__container}>
        <div className={styles.productsSection__header}>
          <SectionHeading
            eyebrow={siteContent.productsSection.eyebrow}
            title={siteContent.productsSection.title}
            description={siteContent.productsSection.description}
            align="between"
          />
          <CitySwitcher currentCity={currentCity} onCityChange={onCityChange} />
        </div>

        

        {/* Пагинация: появляется только если товаров больше, чем лимит */}
        {totalPages > 1 && (
          <div className={styles.productsSection__pagination}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={styles.productsSection__paginationBtn}
            >
              ← Назад
            </button>

            <input
              type="text"
              inputMode="numeric"
              value={pageInput}
              onChange={handleInputChange}
              onBlur={commitPageInput}
              onKeyDown={(e) => e.key === 'Enter' && commitPageInput()}
              className={styles.productsSection__pageInput}
              aria-label="Номер страницы"
            />

            <span className={styles.productsSection__pageInfo}>
              / {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={styles.productsSection__paginationBtn}
            >
              Вперед →
            </button>
           </div>
          )}
     </div>
    </section>
  );
}
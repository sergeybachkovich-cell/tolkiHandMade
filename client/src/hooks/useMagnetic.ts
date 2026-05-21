/**
 * @description хук для "наводящегося курсора"
 */

import { useEffect, useRef, useState } from "react";

interface MagneticOpitons {
    strength?: number; // сила притяжения (меньше = сильнее)
}

export const useMagnetic = ({strength = 30}: MagneticOpitons = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Функция для расчета смещения
        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            const moveX = distanceX / strength;
            const moveY = distanceY / strength;


            setPosition({x: moveX, y: moveY });

            // Отправляем событие для глобального курсора (если он есть)
            window.dispatchEvent(
                new CustomEvent('magnetic-target', {detail: rect})
            );
        };

        const handleMouseLeave = () => {
            setPosition ({x: 0, y: 0}); // возвр на мeсто
            window.dispatchEvent (new CustomEvent('magnetic-leave'));
        };

        // обр движ мыши над элементом
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);
    
    return { ref, position };
};
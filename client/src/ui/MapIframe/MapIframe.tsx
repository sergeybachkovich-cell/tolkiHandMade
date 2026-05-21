import styles from './MapIframe.module.scss';

type Props = {
    title?: string;
};

const YANDEX_SCR = 
'https://yandex.ru/map-widget/v1/?um=constructor%3A3fe830c0bfd99da5f165ffdcaaab8e73c98b0c31eaaf9d12f9eb2bb7513bb09c&amp;source=constructor';

export const MapIframe: React.FC<Props> = ( {title = 'Наш магази на карте'}) => {

    return (
        <iframe 
        src={YANDEX_SCR}
        title={title}
        height={400}
        width="500" 
        frameBorder='0'></iframe>
    );
}
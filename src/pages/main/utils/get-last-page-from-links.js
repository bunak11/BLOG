export const getLastPageFromLinks = (links) => {
    if (!links || typeof links !== 'string') {
        return 1;
    }

    // Разделяем по запятой и ищем часть с rel="last"
    const lastLink = links.split(',').find(link => link.includes('rel="last"'));

    if (!lastLink) {
        return 1;
    }

    // Извлекаем номер страницы
    const match = lastLink.match(/_page=(\d{1,4})/);
    return match ? Number(match[1]) : 1;
};

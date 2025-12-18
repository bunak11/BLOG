// генератор случайных дат для использования в поле registered_at: при создании(регистрации) нового пользователя
export const generateDate = () => new Date(Math.random() * 1000000000000 + 1999999999999).toISOString().substring(0, 16).replace('T', ' ');

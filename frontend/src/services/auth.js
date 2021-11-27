const TOKEN_KEY = '@imobiliria-token';
const USER_KEY = '@imobiliria-user';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null;
export const getToken = () => localStorage.getItem(TOKEN_KEY) != null;
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY,token)
}
export const setUser = (token) => {
    localStorage.setItem(USER_KEY,JSON.stringify(token))
}
export const logout = (token) => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
}
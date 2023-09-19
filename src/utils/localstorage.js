export const setUserInfoInLocalStorage = (key, val) => {
    let user_info = localStorage.getItem('user_info');
    user_info = user_info ? JSON.parse(user_info) : {};
    user_info[key] = val;
    localStorage.setItem('user_info', JSON.stringify(user_info));
}

export const getUserInfoFromLocalStorage = (key) => {
    let user_info = localStorage.getItem('user_info');
    user_info = user_info ? JSON.parse(user_info) : {};
    return user_info ? user_info[key] : undefined;
}
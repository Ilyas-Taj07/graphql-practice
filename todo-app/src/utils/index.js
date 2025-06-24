export function get_cookie(key) {

    if (document?.cookie === '') {
        return null
    }

    let value;

    document?.cookie?.split(';')?.forEach((item) => {
        if (item.split('=')[0] === key) {
            value = JSON.parse(item.split('=')[1])
        }
    })

    return value
}


export function setCookie(cookiename, cookiedata) {

    let data = JSON.stringify(cookiedata)

    document.cookie = `${cookiename}=${data}`

}
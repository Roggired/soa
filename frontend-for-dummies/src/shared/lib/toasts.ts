const successToast = (message: string) => {
    M.toast({ html: `<span>${message}</span>` })
}

const failToast = (message: string) => {
    M.toast({ html: `<span>${message}</span>`, classes: 'red' })
}

export { successToast, failToast }

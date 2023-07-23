

export const getError = (error) => {
    return error.response && (error.response.data.message) ? (error.response.data.message) : (error.message)
}

export const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units: [{ amount: { value: data }}]
    }).then((order) => {
        return order
    })
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}
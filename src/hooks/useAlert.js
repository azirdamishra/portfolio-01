import React, { useState } from 'react'
//extract some of the project's logic

const useAlert = () => {
    const [alert, setAlert] = useState({show: false, text: '', type: 'danger'})

    //functions that are going to show or hide the alert
    const showAlert = ({text, type='danger'}) => setAlert({
        show: true,
        text,
        type
    })

    const hideAlert = () => setAlert({
        show: false,
        text: '',
        type: 'danger'
    })

    //hooks don't return jsx, they often return an object or array to which we can pass the values below
  return {alert, showAlert, hideAlert}
}

export default useAlert
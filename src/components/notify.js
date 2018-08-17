
import { Notification } from 'uiv'

export default {

    success(title, content) {
        Notification.notify({
            type: 'success',
            title: title,
            content: content,
        })
    },
    danger(title, content) {
        Notification.notify({
            type: 'danger',
            title: title,
            content: content,
        })
    },

}

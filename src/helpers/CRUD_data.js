import PubSub from 'pubsub-js'

export default async function deleteData(url, params) {
    try {
        const response = await fetch(url + params, {
            method: "Delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            PubSub.publish('SuccessAlert', 'success');
        } else {
            throw Error("Some Errors Occured")
        }

    } catch {
        PubSub.publish('SuccessAlert', 'error');
    }

}
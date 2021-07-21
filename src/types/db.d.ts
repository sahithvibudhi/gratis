interface APICollectionPayload {
    [key: string]: any
}

type APICollection = {
    name: String,
    path: String,
    payload: APICollectionPayload,
}

type KeyCollection = {
    title: String,
    apis: Array<String>,
    key: String,
}
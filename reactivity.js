const project = {
    id: 1,
    description: "test"
}

const proxy = new Proxy(project, {
    get(originalObject, key, target) {
        console.log(`Pediram a chave ${key} do Projeto`)
        return Reflect.get(originalObject, key, target)
    },
    set(originalObject, key, value) {
        console.log(`Alteração da chave ${key} para valor ${value}`)
        originalObject[key] = value
    }
})
export function mapped2Json(map, data) {
    var result = {}
    for (var key in map) {
        var value = map[key]

        if (typeof value === 'object') {
            result[key] = mapped2Json(value, data[key])
        } else {
            result[value] = data[key]
        }
    }
    return result
}
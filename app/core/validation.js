export function hasNullOrUndefined(obj){
    for(var value in obj){
        if (obj[value] === '' || obj[value] === undefined || obj[value] === null) {
            return true;
        }
    }
}
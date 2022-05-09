

export function removeArgumentsFromQuery(params: string): string{
    var regexp = new RegExp(/\?.*/);
    var charsToRemove = regexp.exec(params);
    if(!charsToRemove) return params;
    return params.replace(charsToRemove[0], "");
}

export function treatQueryToLeaveOnlyArguments(params: string): string{
    var regexp = new RegExp(/.*\?/);
    var charsToRemove = regexp.exec(params);
    if(!charsToRemove) return params;
    return params.replace(charsToRemove[0], "");
}

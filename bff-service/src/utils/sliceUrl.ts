const sliceUrl = (url: string, key: string): string => {
    return url.replace(`/${key}`, '');
}

export const createThirdApiUrl = (requestUrl: string, serviceName: string): string => {
    return `${process.env[serviceName]}${sliceUrl(requestUrl,serviceName)}`
}

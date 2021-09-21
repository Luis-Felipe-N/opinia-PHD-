export default function formatCreatedAt(data) {
    const dataAtual = new Date()
    const dataEmSegundos = Date.parse(dataAtual)
    const tempoPublicado = dataEmSegundos - data
    const tresHoras = 60 * 60 * 3 * 1000
    const dataDaPublicação = new Date(tempoPublicado + tresHoras)

    if ( dataDaPublicação.getDate() > 1 ) {
        return `Há ${dataDaPublicação.getDate() - 1} dias atrás`
    } else if ( dataDaPublicação.getHours() > 0 ) {
        return `Há ${dataDaPublicação.getHours()} horas atrás`
    } else if ( dataDaPublicação.getMinutes() > 0 ) {
        return `Há ${dataDaPublicação.getMinutes() } minutos atrás`
    } else {
        return `Há ${dataDaPublicação.getSeconds()} segundos atrás`
    }
}
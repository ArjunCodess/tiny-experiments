const video = document.querySelector('video')

const sync = () => {
    const source = video.querySelector('source')
    if (source) {
        source.src = config.src
        video.load()
    } else {
        const newSource = document.createElement('source')
        newSource.src = config.src
        newSource.type = 'video/mp4'
        video.appendChild(newSource)
    }

    video.play().catch(e => console.error("Error playing video:", e))
    document.documentElement.dataset.debug = config.debug
    document.documentElement.dataset.blend = config.blend
}

sync()
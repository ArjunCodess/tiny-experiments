import Splitting from 'https://cdn.skypack.dev/splitting'

const heading = document.querySelector('.encrypted')

const title = heading.dataset.title
const sub = heading.dataset.sub
const track = parseInt(heading.dataset.track, 10)
const start = parseFloat(heading.dataset.start)
const end = parseFloat(heading.dataset.end)

const randomString = (length) => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?~'
    return [...Array(length)]
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('')
}

const escapeHTML = (str) =>
    str.replace(
        /[&<>"']/g,
        (char) =>
        ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }[char])
    )

const getWords = (txt) => {
    const hold = Object.assign(document.createElement('div'), {
        innerHTML: Splitting.html({ content: txt, whitespace: true }),
    })

    const chars = hold.querySelectorAll('.char, .whitespace')
    hold.firstChild.setAttribute('aria-hidden', 'true')
    for (let c = 0; c < chars.length; c++) {
        const char = chars[c]
        char.dataset.char = char.innerHTML
        char.innerHTML = `<span>${char.innerHTML}${escapeHTML(
            randomString(track)
        )}</span>`
    }

    return hold.innerHTML
}

const update = () => {
    heading.innerHTML = `
    <h1>
      <span class="sr-only">${title}</span>
      ${getWords(title)}
    </h1>
    <p>
      <span class="sr-only">${sub}</span>
      ${getWords(sub)}
    </p>
  `
    document.documentElement.style.setProperty('--track', track)
    document.documentElement.style.setProperty('--start', start)
    document.documentElement.style.setProperty('--end', end)
}

update()
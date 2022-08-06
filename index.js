const list = document.querySelector('.timer__list')
const timeIndicator = document.querySelector('.timer__time')
const buttonStart = document.querySelector('.timer__start')
const buttonAdd = document.querySelector('.timer__checkpoint')
const buttonStop = document.querySelector('.timer__stop')

const timer = {
  isRunning: false,
  startTime: null,
  onTimeUpdate: null,
  onCheckpointAdd: null,
  start() {
    this.isRunning = true
    this.startTime = Date.now()

    const tick = () => {
      if(!this.isRunning) return

      const diff = this.getDifference()
      const formatted = this.formatTime(diff)

      this.onTimeUpdate(formatted)

      window.requestAnimationFrame(tick)
    }

    tick()
  },
  add() {
    const checkpoint = this.getDifference()

    this.onCheckpointAdd(this.formatTime(checkpoint))
  },
  stop() {
    this.isRunning = false
  },
  getDifference() {
    return Date.now() - this.startTime
  },
  formatTime(time) {
    const milliseconds = time % 1000
    const totalSeconds = Math.floor(time / 1000)
    const seconds = totalSeconds % 60
    const minutes = Math.floor(totalSeconds / 60) % 60
    const hours = Math.floor(totalSeconds / 3600) % 24

    const h = hours >= 10 ? hours : `0${hours}`
    const m = minutes >= 10 ? minutes : `0${minutes}`
    const s = seconds >= 10 ? seconds : `0${seconds}`
    const ms = milliseconds >= 100 ? milliseconds : milliseconds >= 10 ? `0${milliseconds}` : `00${milliseconds}`

    return `${h}:${m}:${s}.${ms}`
  }
}

timer.onTimeUpdate = (time) => {
  timeIndicator.textContent = time
}

timer.onCheckpointAdd = (checkpoint) => {
  const node = document.createElement('div')
  node.textContent = checkpoint

  list.appendChild(node)
}

buttonStart.addEventListener('click', () => {
  buttonStart.classList.add('disabled')
  buttonAdd.classList.remove('disabled')
  buttonStop.classList.remove('disabled')

  list.innerHTML = ''
  timer.start()
})

buttonAdd.addEventListener('click', () => {
  timer.add()
})

buttonStop.addEventListener('click', () => {
  timer.stop()
  
  buttonStart.classList.remove('disabled')
  buttonAdd.classList.add('disabled')
  buttonStop.classList.add('disabled')
})

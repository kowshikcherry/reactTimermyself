import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {count: 1500, initial: 1500, isTimerRunning: false}

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button onClick={this.onStartOrPauseTimer} type="button">
          <img alt={startOrPauseAltText} src={startOrPauseImageUrl} />
          <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button onClick={this.onResetTimer} type="button">
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  onResetTimer = () => {
    clearInterval(this.intervalId)
    this.setState(prevState => ({
      count: 1500,
      initial: 1500,
      isTimerRunning: false,
    }))
  }

  ondecrement = () => {
    const {isTimerRunning, initial} = this.state
    if ((isTimerRunning === false, initial > 60)) {
      this.setState(prevState => ({
        initial: prevState.initial - 60,
        count: prevState.initial - 60,
      }))
    }
  }

  onincrement = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        initial: prevState.initial + 60,
        count: prevState.initial + 60,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, count, initial} = this.state
    const isTimerCompleted = count === 0
    // console.log(count === (initial / 60) * 60)
    if (isTimerCompleted) {
      this.setState({count: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)

      // 8. if the timer is not running(isTimerRunning is false)//8.1 set the interval
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }
  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => {
      const {count} = this.state
      if (count == 0) {
        clearInterval(this.intervalId)
        return {
          isTimerRunning: false,
        }
      } else {
        return {
          count: prevState.count - 1,
        }
      }
    })
  }
  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }
  changeFormate = initial => {
    return initial / 60
  }
  changeminandsec = count => {
    const min = Math.floor(count / 60)
    const sec = Math.floor(count % 60)
    const stringmin = min > 9 ? min : `0${min}`
    const stringsec = sec > 9 ? sec : `0${sec}`
    return `${stringmin}:${stringsec}`
  }

  render() {
    const {count, isTimerRunning, initial} = this.state
    const f1 = this.changeFormate(initial)
    const f2 = this.changeminandsec(count)
    // console.log(isTimerRunning)
    return (
      <div className="bg1">
        <h1>Digital Timer</h1>
        <div>
          <div>
            <h1>{f2}</h1>
            {isTimerRunning ? <p>Running</p> : <p>Paused</p>}
          </div>
          <div>{this.renderTimerController()}</div>
        </div>
        <div>
          <p>Set Timer Limit</p>

          <button onClick={this.ondecrement}>-</button>
          <p>{f1}</p>
          <button onClick={this.onincrement}>+</button>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

import './app.css'
import Item from './components/Item'
import ProgressBar from './components/progress-bar/ProgressBar'

export function App() {
  return (
    <>
      <div>

      </div>
      <div>
        <h1>To do</h1>
        <ProgressBar />
        <div>
          <Item text='Gotta do this' />
        </div>
        <div>
          <h3>On hold</h3>
          <Item text='This is on hold' />
        </div>
        <div>
          <h3>Completed</h3>
          <Item text='Woo this is done' />
        </div>
      </div>
    </>
  )
}

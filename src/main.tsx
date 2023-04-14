import { render } from 'preact'
import './index.css'
import WrappedApp from './WrappedApp'

render(<WrappedApp />, document.getElementById('app') as HTMLElement)

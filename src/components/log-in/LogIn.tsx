import { useRef, useState } from 'react'
import EmailIcon from '../../icons/EmailIcon'
import LockIcon from '../../icons/LockIcon'
import EyeIcon from '../../icons/EyeIcon'
import './Login.css'

export default function LogIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const [signUpCode, setSignUpCode] = useState('')
  const [logInError, setLogInError] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const reEnterPasswordRef = useRef<HTMLInputElement>(null)

  async function logInHandler() {
    if (email?.length === 0 || password?.length === 0) {
      setLogInError(true)
      return
    }
  }

  async function signUpHandler() {
    if (signUpCode !== import.meta.env.VITE_SIGN_UP_CODE) {
      setLogInError(true)
      return
    }

    if (
      email?.length === 0 ||
      password?.length === 0 ||
      reEnterPassword?.length === 0
    ) {
      setLogInError(true)
    }

    if (password !== reEnterPassword) {
      setLogInError(true)
    }
  }

  function toggleShowPassword(isReEnter: boolean) {
    let ref = isReEnter ? reEnterPasswordRef : passwordRef
    if (!ref.current) {
      return
    }

    const currentState = ref.current.type
    if (currentState === 'password') {
      ref.current.type = 'text'
      return
    }

    ref.current.type = 'password'
  }

  return (
    <div className="log-in-form">
      <h1>{isLoggingIn ? 'Log In' : 'Register'}</h1>
      <div className="log-in-subtitle">
        {isLoggingIn ? (
          <>
            <p>Don't have an account? </p> &nbsp;
            <button type="button" onClick={() => setIsLoggingIn(false)}>
              Sign up!
            </button>
          </>
        ) : (
          <>
            <p>Already have an account? </p> &nbsp;
            <button type="button" onClick={() => setIsLoggingIn(true)}>
              Sign in!
            </button>
          </>
        )}
      </div>
      {logInError && (
        <div className="log-in-error">
          Please enter a valid email address and/or password
        </div>
      )}
      <form>
        {!isLoggingIn && (
          <>
            <label htmlFor="sign-up-code">Sign up code</label>
            <div className="input-wrapper">
              <input
                className="log-in-input"
                id="sign-up-code"
                value={signUpCode}
                onChange={(e) =>
                  setSignUpCode((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </>
        )}
        <label htmlFor="email">Email address</label>
        <br />
        <div className="input-wrapper input-wrapper-email">
          <EmailIcon />
          <input
            className="log-in-input"
            id="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </div>
        <label htmlFor="password">Password</label>
        <br />
        <div className="input-wrapper">
          <LockIcon />
          <input
            className="log-in-input"
            ref={passwordRef}
            id="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
          {password.length > 0 && (
            <button type="button" onClick={() => toggleShowPassword(false)}>
              <EyeIcon />
            </button>
          )}
        </div>
        {!isLoggingIn && (
          <>
            <label htmlFor="re-enter-password">Re-Enter Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input
                className="log-in-input"
                ref={reEnterPasswordRef}
                id="re-enter-password"
                value={reEnterPassword}
                onChange={(e) =>
                  setReEnterPassword((e.target as HTMLInputElement).value)
                }
                type="password"
              />
              {reEnterPassword.length > 0 && (
                <button
                  title="Click to reveal"
                  label="Click to reveal"
                  type="button"
                  onClick={() => toggleShowPassword(true)}
                >
                  <EyeIcon />
                </button>
              )}
            </div>
          </>
        )}

        {isLoggingIn ? (
          <button
            className="log-in-submit"
            type="button"
            onClick={logInHandler}
          >
            Log in
          </button>
        ) : (
          <button
            className="log-in-submit"
            type="button"
            onClick={signUpHandler}
          >
            Sign up
          </button>
        )}
      </form>
    </div>
  )
}

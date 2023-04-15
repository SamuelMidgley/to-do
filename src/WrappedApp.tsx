import { createClient } from '@supabase/supabase-js'
import App from './app'
import { useLayoutEffect, useState } from 'preact/hooks'
import LogIn from './components/log-in/LogIn'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export default function WrappedApp() {
  const [session, setSession] = useState<any>(null)

  useLayoutEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <LogIn supabaseClient={supabase} />
  } else {
    return <App supabaseClient={supabase} />
  }
}

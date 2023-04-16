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
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    // Should probably add loading state but its so rapid not sure it's needed
    return <div />
  }

  if (!session) {
    return <LogIn supabaseClient={supabase} />
  } else {
    return <App supabaseClient={supabase} />
  }
}

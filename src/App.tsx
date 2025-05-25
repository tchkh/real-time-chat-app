import { useEffect } from 'react'
import Auth from './components/Auth'
import { useChatStore } from './store/chatStore'
import supabase from './utils/supabase'
import Dashboard from './components/Dashboard'

function App() {
  const { user, setUser } = useChatStore()

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setUser({ id: session?.user.id || '', email: session?.user.email || '' })
  }

  useEffect(() => {
    getSession()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session?.user.id || '',
          email: session?.user.email || '',
        })
      } else {
        setUser(null)
      }
    })

    const subscription = data.subscription

    return () => subscription.unsubscribe()
  }, [])

  if (!user) {
    return <Auth />
  }

  return <Dashboard />
}

export default App

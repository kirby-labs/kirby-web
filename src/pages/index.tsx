import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/markets', { replace: true })
  }, [navigate])

  return <></>
}

export default Home

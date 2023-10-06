import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="content-container">
          <h1 className="heading"> Find The Job That Fits Your Life </h1>
          <p className="finding-desc">
            Millions of people are searching for jobs, salary information,
            company.Find the job that fits your abilities and potential
          </p>
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home

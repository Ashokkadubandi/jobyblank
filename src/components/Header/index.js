import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {HiArrowRight} from 'react-icons/hi'
import {IoIosBriefcase} from 'react-icons/io'

import './index.css'

const Header = props => {
  const renderLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="mobile-home-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="mobile-nav-logo"
        />
        <div className="font-container">
          <AiFillHome />
          <IoIosBriefcase />
          <HiArrowRight />
        </div>
      </div>
      <div className="responsive-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="responsive-nav-logo"
        />
        <ul>
          <Link to="/" className="text">
            <li className="list"> Home </li>
          </Link>
          <Link to="/jobs" className="text">
            <li className="list"> Jobs </li>
          </Link>
        </ul>
        <button type="button" className="logout" onClick={renderLogOut}>
          Logout
        </button>
      </div>
    </>
  )
}

export default withRouter(Header)

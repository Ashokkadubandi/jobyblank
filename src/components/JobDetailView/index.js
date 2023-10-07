import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {IoIosBriefcase} from 'react-icons/io'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobsView = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDesc,
    location,
    packageSalary,
    rating,
    title,
    id,
  } = eachJob
  return (
    <>
      <Link to={`/jobs/${id}`} className="text">
        <li className="jobs-container-list">
          <div className="job-detail-img-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="text-container">
              <h1 className="title">{title}</h1>
              <div className="rating-con">
                <AiFillStar className="font-color" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locate-package-container">
            <div className="add-container">
              <IoLocationSharp className="add-font" />
              <p className="address">{location}</p>

              <IoIosBriefcase className="add-font" />
              <p className="address">{employmentType}</p>
            </div>
            <p className="package">{packageSalary}</p>
          </div>
          <hr className="horizon" />
          <h1 className="desc-heading">Description</h1>
          <p className="description">{jobDesc}</p>
        </li>
      </Link>
    </>
  )
}
export default JobsView

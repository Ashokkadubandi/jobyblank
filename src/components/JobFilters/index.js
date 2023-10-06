import './index.css'

const Filter = props => {
  const renderFiltersGroup = () => {
    const {employmentList} = props

    return employmentList.map(each => {
      const {changeEmploymentId} = props
      const changeId = () => {
        changeEmploymentId(each.employmentTypeId)
      }

      return (
        <div className="ul-list">
          <li className="filters-list">
            <input
              id={each.employmentTypeId}
              type="checkbox"
              className="emp-inp"
              onClick={changeId}
            />
            <label htmlFor={each.employmentTypeId} className="label">
              {each.label}
            </label>
          </li>
        </div>
      )
    })
  }

  const renderSalaryGroup = () => {
    const {salaryList} = props

    return salaryList.map(each => {
      const {changeSalaryId, salaryId} = props
      const changeId = () => {
        changeSalaryId(each.salaryRangeId)
      }
      const isActive = salaryId === each.salaryRangeId

      return (
        <div className="ul-list">
          <li className="filters-list">
            <input
              id={each.salaryRangeId}
              type="radio"
              className="emp-inp"
              onClick={changeId}
              checked={isActive}
            />
            <label htmlFor={each.salaryRangeId} className="label">
              {each.label}
            </label>
          </li>
        </div>
      )
    })
  }

  return (
    <>
      <div className="filters-section">
        <hr />
        <h1 className="filter-type">Type of Employment</h1>
        {renderFiltersGroup()}
        <hr />
        <h1 className="filter-type">Salary Range</h1>
        {renderSalaryGroup()}
      </div>
    </>
  )
}
export default Filter

import './index.css'

const Skills = props => {
  const {eachItem} = props
  const {imageUrl, name} = eachItem
  console.log(name)
  console.log('getting...')

  return (
    <li className="skills-card">
      <img src={imageUrl} alt="none" className="skills-img" />
      <p className="skills-name">{name}</p>
    </li>
  )
}
export default Skills

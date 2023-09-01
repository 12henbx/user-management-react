import ContentLayout from '../components/Home/ContentLayout'
import classes from './Home.module.css'

const Home = () => {
	return <div>
		<h2 className={classes.heading}>👋 Hi! Welcome to</h2>
		<h2 className={classes.heading}>User Management Dashboard</h2>
		<ContentLayout />
	</div>
}

export default Home
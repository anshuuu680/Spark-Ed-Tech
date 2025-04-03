import CourseCard from "../../Pages/Home/CourseCard"

const obj = {
  imageSrc: 'https://ik.imagekit.io/anshuuuu680/Spark/empty%20posts_D-3aD6O0G.png?updatedAt=1706273611533',
  title: 'Web development',
  rating: '4',
  users: 115,
  priceOrg: 2799,
  priceDemo: 2999,
}


const AdminCourses = () => {
  return (
    <div className="w-full h-fit p-3 px-6 pt-4">
      <h1 className="font-bold text-xl  dark:text-gray-100 hover:text-gray-700">All Courses</h1>
      <div className="w-full h-fit  mt-6 grid grid-cols-3 gap-5 px-20">
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
        <CourseCard  {...obj} />
      </div>
    </div>
  )
}
export default AdminCourses
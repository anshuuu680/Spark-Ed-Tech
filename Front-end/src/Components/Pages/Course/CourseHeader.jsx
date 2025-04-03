import { NavLink } from "react-router-dom";




const CourseHeader = () => {
    return (<div className="w-full h-32 bg-gray-950 flex flex-col justify-end gap-4 pl-14">
        <h1 className="text-3xl font-bold">My Learning</h1>
        <div className="w-full h-10 flex items-center">
            <ul className="flex gap-4 text-md">
                <li><NavLink to='my-courses' activeClassName='active'>My Courses</NavLink></li>
                <li><NavLink to='My-wishlist' activeClassName='active'>My Wishlist</NavLink></li>
                <li><NavLink to='My-archived' activeClassName='active'>My Archived</NavLink></li>
            </ul>

        </div>
    </div>);
}


export default CourseHeader;
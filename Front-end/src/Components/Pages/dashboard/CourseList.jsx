const data = [
    {
        thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFJfGVufDB8fDB8fHww',
        name: 'Product management',
        tutor: 'John Doe',
        lecturesLeft: 5,
        completedPercentage: 60
    },

    {
        thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFJfGVufDB8fDB8fHww',
        name: 'Product management',
        tutor: 'Alice Williams',
        lecturesLeft: 2,
        completedPercentage: 95
    },
    {
        thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFJfGVufDB8fDB8fHww',
        name: 'Product management',
        tutor: 'John Doe',
        lecturesLeft: 5,
        completedPercentage: 60
    }
];

const CourseList = ({ myCourses }) => {
    return (
        <>
            {data.map((course, index) => (
                <div style={{ width: '30%' }} key={index} className="h-full rounded-2xl overflow-hidden border-t-4 border-orange-500">
                    <div className="h-3/6 bg-red-500">
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={course.thumbnail} alt="" />
                    </div>
                    <div className="details bg-slate-300 text-black h-3/6 p-3 flex flex-col justify-between">
                        <div className="top">
                            <h1 className="font-bold text-md">{course.name}</h1>
                            <h1 className="text-sm">{course.tutor}</h1>
                        </div>
                        <div className="bottom">
                            <div className="progress-bar w-full p-1 h-6  flex items-center gap-2 ">
                                <div className="progress h-2 w-full bg-white rounded-lg">
                                    <div className="bar h-2 w-2/3 bg-blue-600 rounded-lg"></div>
                                </div>

                            </div>
                            <div className="details text-sm pl-1 flex justify-between">
                                <h1>Lectures left: <span className="font-bold">{course.lecturesLeft}</span></h1>
                                <h1>Completed:<span className="font-bold"> {course.completedPercentage}</span>%</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
export default CourseList
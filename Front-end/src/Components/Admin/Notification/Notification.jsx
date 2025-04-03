const Notification = ({ details }) => {
    return (
        <div className="w-full h-16 bg-addTaskColor flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all shadow-md">
            <div className="flex items-center  gap-3">

                <div className="w-12 h-12 rounded-full bg-white">
                    <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1556683944-ba658344ba06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <h1 className=""><span className="font-bold">Lorem ipsum </span>dolor sit amet consectetur adipisicing elit.</h1>
            </div>

            <h1 className="text-gray-600 text-sm">2 hours ago</h1>


        </div>
    )
}
export default Notification
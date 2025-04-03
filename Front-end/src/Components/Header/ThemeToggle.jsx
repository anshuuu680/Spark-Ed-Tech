import { useGlobalContext } from '../../Context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToggle = () => {
    const { isDark, toggleDark } = useGlobalContext();

    return (
        <label className="inline-flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isDark}
                    onChange={toggleDark}
                />
                <div className="sm:w-12 sm:h-6 w-11 h-7 rounded-full bg-black transition duration-200 flex items-center p-1">
                    <div 
                        className={`sm:w-5 sm:h-5 w-5 h-5 bg-yellow-500 rounded-full transition-transform duration-200 ${isDark ? 'translate-x-0' : 'sm:translate-x-5 translate-x-4'}`}
                    />
                </div>
            </div>
            <span className="ml-2 sm:ml-1">
                {isDark ? (
                    <BsFillSunFill className="text-yellow-500 text-xl sm:text-lg" />
                ) : (
                    <BsFillMoonFill className="text-gray-800 text-xl sm:text-lg" />
                )}
            </span>
        </label>
    );
};

export default ThemeToggle;

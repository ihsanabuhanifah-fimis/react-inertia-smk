 export const styles = {
        classNameInput:
            "border py-2 w-full px-2 mb-3 bg-gray-200 focus:bg-blue-400",
        classNameLabel: "text-md text-gray-300 mb-2 font-semibold capitalize",
        classNameAlert: "text-sm text-red-600 font-bold",
        classNameButton : (newClass)=> {
            return `text-white text-lg capitalize font-semibold py-1 mt-2 w-full rounded-lg ${newClass}`
        }
    };
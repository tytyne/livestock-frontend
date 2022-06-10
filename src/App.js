import React from "react";
import { useSelector } from "react-redux";
import { AppRouter } from "./AppRouter";
const App = () => {
    const { user: currentUser } = useSelector((state) => state.user);
    // useEffect(() => {
    //     if (currentUser) {
    //         history.push
    //     }
    // })
    return (
        <>
            <AppRouter />
        </>
    );
};

export default App;

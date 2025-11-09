import { useAuth } from "../providers/AuthProvider";
import { useTheme } from "../providers/ThemeProvider";

const ChangeTheme = () => {
    const {theme, setTheme} = useTheme()
    return (
        <div className="container">
            <h2>ChangeTheme</h2>
            <button 
                className="mb-3 btn btn-success"
                onClick={() => {
                    setTheme("lightgreen")
            }}>Light Green</button>
            <br/>
            <button 
                className="mb-3 btn btn-info"
                onClick={() => {
                    setTheme("lightblue")
            }}>Light Blue</button>
        </div>
    );
};

export default ChangeTheme;


import campus from "../assets/campus.jpg";
import { LogoIcon } from "./icons";

export default function AuthLayout({ children }) {
    return (
        <div className="split">
            <aside className="split-visual">
                <img src={campus} alt="Students walking across a university campus" />
            </aside>
            <main className="split-form">
                <div className="form-inner">
                    <div className="logo-row">
                        <LogoIcon />
                        <span className="logo-name">StudentMarketPlace</span>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
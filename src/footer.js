import React from "react";
import "./footer.scss";

export function Footer({year, org}) {
    return <footer className="app-footer">&copy; {year} {org}</footer>
}
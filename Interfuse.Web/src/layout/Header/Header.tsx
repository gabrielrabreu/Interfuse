import React, { useState } from "react";
import {
  Header as SageHeader,
  Icon,
  IconButton,
  Typography,
  Button,
} from "@gabrielrabreu/sage-react";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  toggleAside: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleAside }) => {
  const { signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <SageHeader>
      <IconButton icon={<Icon name="Menu" />} onClick={toggleAside} />
      <Typography variant="subheading">INTERFUSE</Typography>
      <SageHeader.Nav>
        <SageHeader.NavItem>
          <IconButton icon={<Icon name="Bell" />} />
        </SageHeader.NavItem>
        <SageHeader.NavItem>
          <IconButton icon={<Icon name="Mail" />} />
        </SageHeader.NavItem>
        <SageHeader.NavItem>
          <IconButton icon={<Icon name="User" />} onClick={handleUserClick} />
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "8px",
              }}
            >
              <Button type="button" text="Sign out" onClick={handleLogout} />
            </div>
          )}
        </SageHeader.NavItem>
      </SageHeader.Nav>
    </SageHeader>
  );
};

export default Header;
